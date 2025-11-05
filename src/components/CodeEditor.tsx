import React, { Component  } from 'react'
import { EditorState } from 'draft-js'
import Editor from 'draft-js-plugins-editor'

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

    onChange = (editorState: EditorState): void => {
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
