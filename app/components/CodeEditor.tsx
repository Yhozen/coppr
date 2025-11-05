import React, { Component  } from 'react'
import Draft, { EditorState, RichUtils, RawDraftContentState, ContentBlock } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import fs from 'fs-extra'
import path from 'path'

import createCodeEditorPlugin from 'draft-js-code-editor-plugin'
import createPrismPlugin from 'draft-js-prism-plugin'

import Prism from 'prismjs'

const codePlugin = createCodeEditorPlugin()
const prismPlugin = createPrismPlugin({
    // It's required to provide your own instance of Prism
    prism: Prism,
    defaultSyntax: 'javascript'
  });

interface CodeEditorState {
    editorState: EditorState;
}

export default class CodeEditor extends Component<{}, CodeEditorState> {
    state: CodeEditorState = {
        editorState: EditorState.createEmpty(),
    }

    componentDidMount = (): void => {
        this.init()
    }

    onChange = (editorState: EditorState): void => {
        this.setState({editorState})
    }

    init = async (): Promise<void> => {
        const file = await fs.readFile(path.dirname(__filename) + '/../../app/main.js', 'utf-8')
        const blocks = file.split(/\r\n|\r|\n/).map(line => {
            return {
                type: 'code-block',
                text: line,
                data: {
                    language: 'javascript'
                }
            }
        })
        const contentState = Draft.convertFromRaw({
            entityMap: {},
            blocks
        } as RawDraftContentState)
        console.log(Draft.convertToRaw(contentState))
        const editorState = EditorState.createWithContent(contentState)
        this.setState({editorState})
    }

  render(): JSX.Element {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        plugins={[prismPlugin, codePlugin]}
      />
    );
  }
}
