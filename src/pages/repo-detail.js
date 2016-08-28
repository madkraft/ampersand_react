import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import Label from '../components/label-component'

export default React.createClass({
  mixins: [ampersandMixin],

  displayName: 'RepoDetail',

  render () {
    const {repo, labels} = this.props

    return (
      <div className='container'>
        <h1>{repo.full_name}</h1>
        <ul>
          {labels.map(label => <Label key={label.name} label={label} />)}
        </ul>
      </div>
    )
  }
})
