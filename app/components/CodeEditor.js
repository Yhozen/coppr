// import Draft, { Editor, EditorState, ContentState, RichUtils } from 'draft-js'
// import CodeUtils from 'draft-js-code'
// // import createUndoPlugin from 'draft-js-undo-plugin'

// import React, { Component } from 'react'
// import fs from 'fs-extra'
// import path from 'path'

// const undoPlugin = createUndoPlugin()


// export default class CodeEditor extends Component {
//     constructor() {
//       super()
//       this.state = { editorState: EditorState.createEmpty() }
//       this.onChange = (editorState) => this.setState({editorState})
//     }
//     componentDidMount () {
//         this.read()
//     }
//     async read () {
//         const file = await fs.readFile(path.dirname(__filename) + '/../../app/main.js', 'utf-8')
//         this.init(file)
//     }
//     init (file) {
//         const content = ContentState.createFromText(file)
//         const editorState = EditorState.createWithContent(content)
//         this.setState({editorState})
//     }    
//       keyBindingFn = (evt) => {
//         const { editorState } = this.state;
//         if (!CodeUtils.hasSelectionInBlock(editorState)) return Draft.getDefaultKeyBinding(evt);
    
//         const command = CodeUtils.getKeyBinding(evt);
    
//         return command || Draft.getDefaultKeyBinding(evt);
//       }
    
//       handleReturn = (evt) => {
//         const { editorState } = this.state;
//         if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';
    
//         this.onChange(CodeUtils.handleReturn(evt, editorState));
//         return 'handled';
//       }
    
//       onTab = (evt) => {
//         const { editorState } = this.state;
//         if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';
    
//         this.onChange(CodeUtils.onTab(evt, editorState));
//         return 'handled';
//       }

//     render () {
//       return (
//         <div>
//             <Editor 
//                 editorState={this.state.editorState}
//                 onChange={this.onChange}
//                 keyBindingFn={this.keyBindingFn}
//                 handleKeyCommand={this.handleKeyCommand}
//                 handleReturn={this.handleReturn}
//                 onTab={this.onTab}
//                 />
//         </div>
//       )
//     }
// }
  


import React, { Component  } from 'react'
import Draft, { EditorState, RichUtils } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import fs from 'fs-extra'
import path from 'path'


import createCodeEditorPlugin from 'draft-js-code-editor-plugin'
import createPrismPlugin from 'draft-js-prism-plugin'
//import PrismDecorator from 'draft-js-prism'

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
  componentDidMount = () => {
      this.init()
  }

  onChange = (editorState) => {
    this.setState({
      editorState,          
    })
  }
  
  init = async () => {
    const file = await fs.readFile(path.dirname(__filename) + '/../../app/main.js', 'utf-8')
    var contentState = Draft.convertFromRaw({
        entityMap: {},
        blocks: [{
          type: 'code-block',
          text: file,
          data: {
            language: 'javascript'
          }
        }]
      })
      const editorState = EditorState.createWithContent(contentState)
      this.setState({editorState})
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        plugins={[codePlugin,prismPlugin]}
      />
    );  
  }
}