// Mocking discussion thread api
import { normalize, Schema, arrayOf } from 'normalizr'
import _discussion from './discussion.json'

const discussionSchema = new Schema('discussions', { idAttribute: 'id' })
const commentSchema = new Schema('comments', { idAttribute: 'id' })

discussionSchema.define({
  comments: arrayOf(commentSchema)
})

commentSchema.define({
  comments: arrayOf(commentSchema)
})

export default {
  getThread (cb) {
    return cb(normalize(_discussion.discussion, discussionSchema))
  }
}
