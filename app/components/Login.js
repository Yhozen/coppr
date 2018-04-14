import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Login extends Component {
  render() {
    return (
      <div className="flexgrid">
        <div className="spacetool">
         <ul id="toolbar">
          <li><a href="default.asp">Home</a></li>
          <li><a href="news.asp">News</a></li>
          <li><a href="contact.asp">Contact</a></li>
          <li><a href="about.asp">About</a></li>
          </ul> 
        </div>
        <div className="rest">
          <h2>Login</h2>
        </div>
      </div>
    )
  }
}
