import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'Label',

  onEditClick (event) {
    event.preventDefault()
    this.props.label.editing = true
  },

  onCancelClick (event) {
    event.preventDefault()
    this.props.label.editing = false
  },

  render () {
    const {label} = this.props
    const cssColor = '#' + label.color
    let content

    if (label.editing) {
      content = (
        <form className='label-view'>
          <span className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
          <input name='name' />
          <input name='color' />
          <button type='submit' className='button button-small'>Save</button>
          <button onClick={this.onCancelClick} type='button' className='button button-small button-unstyled'>cancel</button>
        </form>
      )
    } else {
      content = (
        <div className='label-view'>
          <span className='label-color' style={{backgroundColor: cssColor}}>&nbsp;</span>
          <span>{label.name} </span>
          <a href='' onClick={this.onEditClick}>
            <span className='octicon octicon-pencil' />
          </a>
          <a href=''>
            <span className='octicon octicon-x' />
          </a>
        </div>
      )
    }

    return (
      <div>
        {content}
      </div>
    )
  }
})
