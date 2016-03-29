import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import threads from './modules/threads'

export default combineReducers({
  threads,
  router
})
