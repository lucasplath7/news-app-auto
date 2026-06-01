import apiClient from '../apiClient.js'
import { deserializeGetPipelineFeed } from './deserializers/getPipelineFeed.js'

/**
 * Fetches a page of news items from the pipeline feed endpoint.
 * @param {Object} params
 * @param {string} params.topic - News topic (e.g. 'us-politics', 'entertainment', 'world-news')
 * @param {number} params.page  - Zero-based page index
 * @returns {Promise<Object[]>} - Array of normalized news items
 */
export async function fetchPipelineFeedPage({ topic, page }) {
  const { data } = await apiClient.get('/news/pipelinefeed', {
    params: { topic, page },
  })
  return deserializeGetPipelineFeed(data)
}

