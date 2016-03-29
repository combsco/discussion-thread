import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

class Composer extends Component {

  static propTypes = {
    onPostComment: PropTypes.func.isRequired
  }

  _handleChange (e) {
    if (e.key === 'Enter') {
      if (this.refs.enterforsubmit.checked) {
        e.preventDefault()
        this.handleSubmit()
      }
    }
  }

  handleSubmit () {
    let comment = ReactDOM.findDOMNode(this.refs.comment).value
    this.props.onPostComment(comment)
    ReactDOM.findDOMNode(this.refs.comment).value = null
  }

  render () {
    return (
      <article className='media'>
        <figure className='media-left'>
          <p className='image is-64x64'>
            <img src='https://s3.amazonaws.com/uifaces/faces/twitter/chadengle/73.jpg'
              style={{borderRadius: '64px'}} />
          </p>
        </figure>
        <div className='media-content'>
          <p className='control'>
            <textarea ref='comment' className='textarea' placeholder='Add a comment...' onKeyPress={::this._handleChange}></textarea>
          </p>
          <nav className='navbar'>
            <div className='navbar-left'>
              <div className='navbar-item'>
                <button className='button is-info' onClick={::this.handleSubmit}>Post comment</button>
              </div>
            </div>
            <div className='navbar-right'>
              <div className='navbar-item'>
                <label className='checkbox'>
                  <input ref='enterforsubmit' type='checkbox' /> Press enter to submit
                </label>
              </div>
            </div>
          </nav>
        </div>
      </article>
    )
  }
}

export default Composer
