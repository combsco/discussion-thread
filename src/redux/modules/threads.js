/* @flow */
import thread from '../../api/thread.js'

// ------------------------------------
// Constants
// ------------------------------------
export const RECEIVE_THREAD = 'RECEIVE_THREAD'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

// ------------------------------------
// Actions
// ------------------------------------
export function getThreads () {
  return (dispatch) => {
    thread.getThread((discussion) => {
      dispatch(receiveThread(discussion))
    })
  }
}

export function addComment (comment: object = {}): Action {
  return {
    type: ADD_COMMENT,
    payload: comment
  }
}

export function deleteComment (id: number): Action {
  return {
    type: DELETE_COMMENT,
    payload: id
  }
}

export function editComment (id: number, comment: string): Action {
  return {
    type: EDIT_COMMENT,
    id: id,
    comment: comment
  }
}

export function receiveThread (thread: object = {}): Action {
  return {
    type: RECEIVE_THREAD,
    payload: thread
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const initialState = {}

export default function threadReducer (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_THREAD':
      return Object.assign({}, state, action.payload)
    case 'ADD_COMMENT':
      return {
        ...state,
        entities: {
          ...state.entities,
          discussions: {
            ...state.entities.discussions,
            [1]: {
              ...state.entities.discussions[1],
              comments: [...state.entities.discussions[1].comments, action.payload.id]
            }
          },
          comments: {
            ...state.entities.comments,
            [action.payload.id]: action.payload
          }
        }
      }
    case 'DELETE_COMMENT':
      return {
        ...state,
        entities: {
          ...state.entities,
          comments: {
            ...state.entities.comments,
            [action.payload]: {
              ...state.entities.comments[action.payload],
              deleted: true
            }
          }
        }
      }
    case 'EDIT_COMMENT':
      return {
        ...state,
        entities: {
          ...state.entities,
          comments: {
            ...state.entities.comments,
            [action.id]: {
              ...state.entities.comments[action.id],
              comment: action.comment
            }
          }
        }
      }
    // case 'DELETE_COMMENT':
    //   console.log(state.entities.comments[3])
    //   return Object.assign({}, state, state.entities.comments[3].deleted = true)
    default:
      return state
  }
}
