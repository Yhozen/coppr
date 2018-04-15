import React, { Component } from 'react'
import Sortable from 'sortablejs'
import PropTypes from 'prop-types'

const files = [ 'home.js', 'news.js', 'contact.js', 'about.js' ]
const open = [ 'Google', 'Apple', 'Facebook', 'ChromeStackoverflow', 'Flexbox', 'Stackoverflow', 'Google', 'Apple', 'Facebook', 'Chrome', 'Flexbox', 'Stackoverflow', 'Google', 'Apple', 'Facebook', 'Chrome', 'Flexbox', 'Stackoverflow']

const Toolbar = props => {
  return (
    <ul id="toolbar">
        {files.map(file => {
          return (
          <li key={Math.random()}><a >{file}</a></li>
          )
        })}
    </ul> 
  )
}

const OpenTabs = props => {
  return (
    <div id="opentabs">
      {open.map(title => {
          return (
            <div key={Math.random()} className="tab">{title}</div>
          )
        })}
    </div>
  )
}
export default class Login extends Component {
  componentDidMount() {
    var toolbar = document.getElementById('toolbar')
    var sortable = Sortable.create(toolbar)
    var opentabs = document.getElementById('opentabs')
    var sortable = Sortable.create(opentabs)
  }
  render() {
    return (
      <div className="flexgrid">
      <Toolbar/>
      <div id="right">
      <OpenTabs/>
      <div className='writeSection'>
         <h2>Login</h2>
      </div>
      </div>

      </div>
    )
  }
}
