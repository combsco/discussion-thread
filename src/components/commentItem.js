import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { deleteComment, editComment } from '../redux/modules/threads.js'
import ReactDOM from 'react-dom'

class CommentItem extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    authorId: PropTypes.number.isRequired,
    commentId: PropTypes.number.isRequired,
    comments: PropTypes.array,
    allcomments: PropTypes.object
  }

  constructor () {
    super()
    this.state = {editing: false}
  }

  getFormattedDate (datetime) {
    let date = moment(datetime).fromNow()
    return (<small> {date} </small>)
  }

  handleDelete (e) {
    e.preventDefault()
    this.props.dispatch(deleteComment(this.props.commentId))
  }

  handleSubmitEdit (e) {
    e.preventDefault()
    let comment = ReactDOM.findDOMNode(this.refs.comment).value
    this.props.dispatch(editComment(this.props.commentId, comment))
    this.setState({editing: false})
  }

  handleEdit (e) {
    e.preventDefault()
    if (this.state.editing) {
      this.setState({editing: false})
    } else {
      this.setState({editing: true})
    }
  }

  getEditDeleteReply () {
    if (this.props.authorId === 4) { // Assuming we are permanntly Brady
      if (this.state.editing) {
        return (<div className='navbar-left'><a className='navbar-item button is-success' onClick={::this.handleSubmitEdit}>Submit Edit</a>
          <a className='navbar-item' onClick={::this.handleEdit}>Cancel</a>
        </div>)
      } else {
        return (<div className='navbar-left'><a className='navbar-item' onClick={::this.handleEdit}>Edit</a>
          <a className='navbar-item' onClick={::this.handleDelete}>Delete</a>
        </div>)
      }
    } else {
      return (<div className='navbar-left'></div>)
    }
  }

  getEditOrComment (comment) {
    return this.state.editing ? (<textarea ref='comment' className='textarea' defaultValue={comment} />) : (<span dangerouslySetInnerHTML={{__html: comment}}></span>)
  }

  render () {
    let {author, datetime, comment, authorImg, comments} = this.props || {}
    if (comments) {
      let nestedComment = this.props.comments.map((id) => this.props.allcomments[id])
      var Comments = nestedComment.filter((c) => !c.deleted).map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            commentId={comment.id}
            author={comment.author}
            authorId={comment.author_id}
            authorImg={comment.author_img}
            datetime={comment.datetime}
            comment={comment.comment}
            comments={comment.comments}
            dispatch={this.props.dispatch} />)
      }, this)
    }
    return (
      <article className='media'>
        <figure className='media-left'>
          <p className='image is-64x64'>
            <img src={authorImg}
              style={{borderRadius: '64px'}} />
          </p>
        </figure>
        <div className='media-content'>
          <div className='content'>
            <p>
              <strong style={{color: '#E3472F'}}>{author}</strong> <small>{this.getFormattedDate(datetime)}</small>
              <br />
              {::this.getEditOrComment(comment)}
            </p>
            <nav className='navbar'>
                {::this.getEditDeleteReply()}
            </nav>
            {Comments}
          </div>
        </div>
      </article>
    )
  }
}

const mapStateToProps = (state) => ({
  allcomments: state.threads.entities.comments
})

export default connect(mapStateToProps)(CommentItem) // Inject dispatch but don't listen to the store.
