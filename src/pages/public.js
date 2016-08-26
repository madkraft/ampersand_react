import React from 'react'
import NavHelper from '../components/nav-helper'

export default React.createClass({
  render () {
    return (
      <NavHelper className='container'>
        <header role='banner'>
          <h1>HubTags</h1>
        </header>
        <div>
          <p>Open source app</p>
          <a href='/login' className='button button-large'>
            <span className='mega-octicon octicon-mark-github' />
            Login with GitHub
          </a>
        </div>
      </NavHelper>
    )
  }
})
