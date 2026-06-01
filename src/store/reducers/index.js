import { combineReducers } from 'redux'
import { feedReducer } from './feedReducer.js'
import { pipelineFeedReducer } from './pipelineFeedReducer.js'

export const rootReducer = combineReducers({
  feed: feedReducer,
  pipelineFeed: pipelineFeedReducer,
})

