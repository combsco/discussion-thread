import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CommentItem from '../../components/commentItem'
import Composer from '../../components/composer'
import { addComment } from '../../redux/modules/threads.js'
import moment from 'moment'

export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    thread: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    addComment: PropTypes.func.isRequired
  }

  getFormattedDate (datetime) {
    let date = moment(datetime).fromNow()
    return (<small> {date} </small>)
  }

  addNewComment (comment) {
    let payload = { id: this.props.comments.length + 7 + 1,
                    author: 'Brady',
                    author_img: 'https://s3.amazonaws.com/uifaces/faces/twitter/chadengle/73.jpg',
                    author_id: 4,
                    datetime: Date.now(),
                    comment: comment,
                    comments: [],
                    public: true,
                    deleted: false}
    this.props.addComment(payload)
  }

  render () {
    return (
      <div className='container threadContainer'>
        <div className='threadTitle'>
          <h1 className='title' style={{color: '#E3472F'}}> {this.props.thread.title}</h1>
          <h2 className='subtitle'>{this.props.thread.discussion}</h2>
          Created by <strong style={{color: '#E3472F'}}>{this.props.thread.author}</strong> <small>{this.getFormattedDate(this.props.thread.datetime)}</small>
        </div>

        {this.props.comments.filter((c) => !c.deleted).map(function (comment) {
          return (
            <CommentItem
              key={comment.id}
              commentId={comment.id}
              author={comment.author}
              authorId={comment.author_id}
              authorImg={comment.author_img}
              datetime={comment.datetime}
              comment={comment.comment}
              comments={comment.comments} />)
        })}

        <Composer onPostComment={::this.addNewComment} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  thread: state.threads.entities.discussions[1],
  comments: state.threads.entities.discussions[1].comments.map((id) => state.threads.entities.comments[id])
})

export default connect((mapStateToProps), {
  addComment
})(HomeView)
