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
            <div key={Math.random()} className="tab" onClick={clickTab}>{title}</div>
          )
        })}
    </div>
  )
}
export default class Login extends Component {
  componentDidMount() {
    const toolbar = document.getElementById('toolbar')
    const opentabs = document.getElementById('opentabs')
    Sortable.create(toolbar)
    Sortable.create(opentabs)
    opentabs.addEventListener("mousewheel", mouseWheelEvt)
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

function mouseWheelEvt ({deltaY, target}) {
  target.parentElement.scrollLeft += deltaY
}
function clickTab ({target}) {
  const previous = document.getElementsByClassName('active')
  if (!!previous.length) previous[0].classList.remove('active')
  target.classList.add('active')
}