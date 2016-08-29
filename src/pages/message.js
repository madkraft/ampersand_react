import React from 'react'

export default React.createClass({
  displayName: 'MessagePage',

  render () {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <p>{this.props.body}</p>
      </div>
    )
  }
})
