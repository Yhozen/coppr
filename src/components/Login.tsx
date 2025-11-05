import React, { Component } from 'react'
import Toolbar from './Toolbar'
//import OpenTabs from './OpenTabs'
import Sortable from 'sortablejs'
import CodeEditor from './CodeEditor'

const open: string[] = [ 'Google', 'Apple', 'Facebook', 'ChromeStackoverflow', 'Flexbox', 'Stackoverflow', 'Google', 'Apple', 'Facebook', 'Chrome', 'Flexbox', 'Stackoverflow', 'Google', 'Apple', 'Facebook', 'Chrome', 'Flexbox', 'Stackoverflow']

const OpenTabs: React.FC = () => {
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
  componentDidMount (): void {
    const toolbar = document.getElementById('toolbar')
    const opentabs = document.getElementById('opentabs')

    if (toolbar) {
      Sortable.create(toolbar)
    }
    if (opentabs) {
      Sortable.create(opentabs)
      opentabs.addEventListener("mousewheel", mouseWheelEvt)
    }
  }
  render (): JSX.Element {
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

function mouseWheelEvt (event: WheelEvent): void {
  const { target, deltaY } = event
  if (target instanceof HTMLElement && target.parentElement) {
    target.parentElement.scrollLeft += deltaY
  }
  event.preventDefault()
}

function clickTab (event: React.MouseEvent<HTMLDivElement>): void {
  const target = event.target as HTMLElement
  const previous = document.getElementsByClassName('active')
  if (!!previous.length) previous[0].classList.remove('active')
  target.classList.add('active')
}
