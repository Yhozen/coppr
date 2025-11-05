import React, { Component } from 'react'

const open: string[] = [ 'Google', 'Apple', 'Facebook', 'ChromeStackoverflow', 'Flexbox', 'Stackoverflow', 'Google', 'Apple', 'Facebook', 'Chrome', 'Flexbox', 'Stackoverflow', 'Google', 'Apple', 'Facebook', 'Chrome', 'Flexbox', 'Stackoverflow' ]

export default class OpenTabs extends Component {
  render (): JSX.Element {
    return (
      <div id='opentabs'>
        { open.map(title => {
          return (
            <div key={Math.random()} className='tab'>{title}</div>
          )
        }) }
      </div>
    )
  }
}
