import React, { Component } from 'react'
import Sortable from 'sortablejs'
import PropTypes from 'prop-types'
import fs from 'fs-extra'

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
  constructor() {
    super()
    this.state = {
      read: ''
    }
  }
  componentDidMount () {
    const toolbar = document.getElementById('toolbar')
    const opentabs = document.getElementById('opentabs')
    Sortable.create(toolbar)
    Sortable.create(opentabs)
    opentabs.addEventListener("mousewheel", mouseWheelEvt)
    this.read()
  }
  async read () {
    const file = await fs.readFile('/home/garox/Documentos/coppr/app/main.styl', 'utf-8')
    this.setState({read:file})
    console.log(file)
  }
  render () {
    return (
      <div className="flexgrid">
      <Toolbar/>
      <div id="right">
      <OpenTabs/>
      <div className='writeSection'>
        <pre> {this.state.read} </pre>
      </div>
      </div>

      </div>
    )
  }
}

function mouseWheelEvt (event) {
  let { target, deltaY, preventDefault } = event
  target.parentElement.scrollLeft += deltaY
  event.preventDefault()
}
function clickTab ({target}) {
  const previous = document.getElementsByClassName('active')
  if (!!previous.length) previous[0].classList.remove('active')
  target.classList.add('active')
}