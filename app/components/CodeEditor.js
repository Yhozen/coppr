import Editor from 'draft-js-plugins-editor'
import { EditorState, ContentState} from 'draft-js'
import createUndoPlugin from 'draft-js-undo-plugin'
import React, { Component, PureComponent } from 'react'

const undoPlugin = createUndoPlugin()
const { UndoButton, RedoButton } = undoPlugin


export default class CodeEditor extends Component {
    constructor(props) {
      super(props)
      this.state = { editorState: EditorState.createEmpty() }
      this.onChange = (editorState) => this.setState({editorState})
    }
    componentDidUpdate () {
        this.init(this.props.file)
    }
    shouldComponentUpdate (nextProps, nextState) {
        return this.props.file !== nextProps.file
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
            <UndoButton />
            <RedoButton />
        </div>
      )
    }
}
  


