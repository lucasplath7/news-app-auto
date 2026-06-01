import { PIPELINE_FEED_REQUEST, PIPELINE_FEED_SUCCESS, PIPELINE_FEED_FAILURE } from '../actionTypes.js'
import { fetchPipelineFeedPage } from '../services/pipelineFeed/pipelineFeedService.js'

/**
 * Fetches a page of news items from the pipeline feed endpoint and dispatches
 * the appropriate request / success / failure actions.
 *
 * When page === 0 the reducer will clear any existing items before inserting
 * the new batch, effectively resetting the feed (e.g. on topic change).
 * When page > 0 the reducer appends the new batch to the existing list.
 *
 * @param {Object} params
 * @param {string} params.topic - News topic key ('us-politics' | 'entertainment' | 'world-news')
 * @param {number} params.page  - Zero-based page index
 */
export const fetchPipelineFeed = ({ topic, page }) => async (dispatch) => {
  dispatch({ type: PIPELINE_FEED_REQUEST, payload: { page } })

  try {
    const newsItems = await fetchPipelineFeedPage({ topic, page })
    dispatch({ type: PIPELINE_FEED_SUCCESS, payload: { newsItems, page } })
  } catch (error) {
    dispatch({
      type: PIPELINE_FEED_FAILURE,
      payload: error instanceof Error ? error.message : 'Failed to load pipeline news feed',
    })
  }
}

