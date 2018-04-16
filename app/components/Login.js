import React, { Component } from 'react'
import Toolbar from './Toolbar'
//import OpenTabs from './OpenTabs'
import Sortable from 'sortablejs'
import CodeEditor from './CodeEditor'

const open = [ 'Google', 'Apple', 'Facebook', 'ChromeStackoverflow', 'Flexbox', 'Stackoverflow', 'Google', 'Apple', 'Facebook', 'Chrome', 'Flexbox', 'Stackoverflow', 'Google', 'Apple', 'Facebook', 'Chrome', 'Flexbox', 'Stackoverflow']

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
  componentDidMount () {
    const toolbar = document.getElementById('toolbar')
    const opentabs = document.getElementById('opentabs')
   
    Sortable.create(toolbar)
    Sortable.create(opentabs)
    opentabs.addEventListener("mousewheel", mouseWheelEvt)
  }
  render () {
    return (
      <div className="flexgrid">
        <Toolbar/>
        <div id="right">
          <OpenTabs/>
          <CodeEditor/>
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