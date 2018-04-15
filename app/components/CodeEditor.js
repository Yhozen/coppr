import Editor from 'draft-js-plugins-editor'
import { EditorState, ContentState} from 'draft-js'
import createUndoPlugin from 'draft-js-undo-plugin'
import React, { Component } from 'react'
import fs from 'fs-extra'
import path from 'path'

const undoPlugin = createUndoPlugin()
const { UndoButton, RedoButton } = undoPlugin


export default class CodeEditor extends Component {
    constructor() {
      super()
      this.state = { editorState: EditorState.createEmpty() }
      this.onChange = (editorState) => this.setState({editorState})
    }
    componentDidMount () {
        this.read()
    }
    async read () {
        const file = await fs.readFile(path.dirname(__filename)+'/../../app/main.styl', 'utf-8')
        this.init(file)
    }
    init (file) {
        if (file) { 
            const content = ContentState.createFromText(file)
            const editorState = EditorState.createWithContent(content)
            this.setState({editorState})
        }
    }
    render () {
      return (
        <div>
            <Editor 
                editorState={this.state.editorState}
                onChange={this.onChange}
                plugins={[undoPlugin]}
                />
        </div>
      )
    }
}
  


