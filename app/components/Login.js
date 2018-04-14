import React, { Component } from 'react'
import Sortable from 'sortablejs';
import PropTypes from 'prop-types'


const files = [ 'home.js', 'news.js', 'contact.js', 'about.js' ]

export default class Login extends Component {
  componentDidMount() {
    var el = document.getElementById('toolbar');
    var sortable = Sortable.create(el);
  }
  render() {
    return (
      <div className="flexgrid">
        <div className="spacetool">
         <ul id="toolbar">
         {files.map(file => {
           return (
           <li key={Math.random()}><a >{file}</a></li>
          )
         })}
          </ul> 
        </div>
        <div className="rest">
          <h2>Login</h2>
        </div>
      </div>
    )
  }
}
