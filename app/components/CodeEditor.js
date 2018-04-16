import React, { Component  } from 'react'
import Draft, { EditorState, RichUtils } from 'draft-js'
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

export default class CodeEditor extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }
    componentDidMount = () => this.init()

    onChange = (editorState) => this.setState({editorState})
    
    init = async () => {
        const file = await fs.readFile(path.dirname(__filename) + '/../../app/main.js', 'utf-8')
        const blocks = file.split(/\r\n|\r|\n/).map(line => {
            return {
                type: 'code-block',
                text:line,
                data: {
                    language: 'javascript'
                }
            }
        })
        var contentState = Draft.convertFromRaw({
            entityMap: {},
            blocks
        })
        console.log(Draft.convertToRaw(contentState))
        const editorState = EditorState.createWithContent(contentState)
        this.setState({editorState})
    }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        plugins={[prismPlugin, codePlugin]}
      />
    );  
  }
}