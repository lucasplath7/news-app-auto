import apiClient from '../apiClient.js'
import { deserializeGetFeed } from './deserializers/getFeed.js'

/**
 * Fetches a page of news items from the standard feed endpoint.
 * @param {Object} params
 * @param {string} params.topic - News topic (e.g. 'us-politics', 'entertainment', 'world-news')
 * @param {number} params.page  - Zero-based page index
 * @returns {Promise<Object[]>} - Array of normalized news items
 */
export async function fetchFeedPage({ topic, page }) {
  const { data } = await apiClient.get('/news/feed', {
    params: { topic, page },
  })
  return deserializeGetFeed(data)
}

