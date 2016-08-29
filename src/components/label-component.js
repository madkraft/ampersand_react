import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'Label',

  getInitialState () {
    const {name, color} = this.props.label

    return {name, color}
  },

  onEditClick (event) {
    event.preventDefault()
    this.props.label.editing = true
  },

  onSubmit (event) {
    event.preventDefault()
    const {label} = this.props

    if (label.saved) {
      label.update(this.state)
    } else {
      label.save(this.state, {
        success: () => {
          label.saved = true
        }
      })
    }

    label.editing = false
  },

  onCancelClick (event) {
    event.preventDefault()
    const {label} = this.props

    if (label.saved) {
      label.editing = false
      this.setState(this.getInitialState())
    } else {
      label.destroy()
    }
  },

  onDeleteClick (event) {
    event.preventDefault()
    this.props.label.destroy()
  },

  onNameChange (event) {
    this.setState({
      name: event.target.value
    })
  },

  onColorChange (event) {
    this.setState({
      color: event.target.value.slice(1)
    })
  },

  render () {
    const {label} = this.props
    const {color} = this.state
    const cssColor = '#' + color
    let content

    if (label.editing) {
      content = (
        <form onSubmit={this.onSubmit} className='label-view'>
          <span style={{backgroundColor: cssColor}} className='label-color avatar avatar-small avatar-rounded'>&nbsp;</span>
          <input name='name' onChange={this.onNameChange} value={this.state.name} />
          <input name='color' onChange={this.onColorChange} value={cssColor} />
          <button onClick={this.onSubmit} type='submit' className='button button-small'>Save</button>
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
          <a href='' onClick={this.onDeleteClick}>
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
