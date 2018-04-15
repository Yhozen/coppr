import React, { Component } from 'react'

const files = [ 'home.js', 'news.js', 'contact.js', 'about.js' ]

export default class Toolbar extends Component {
    render () {
        return (
            <ul id="toolbar">
                {files.map(file => {
                  return (
                  <li key={Math.random()}><a>{file}</a></li>
                  )
                })}
            </ul> 
          )
    }
}
  
