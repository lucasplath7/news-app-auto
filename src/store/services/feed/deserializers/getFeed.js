/**
 * Deserializes a single news item from the feed API response.
 * Normalizes field names and ensures consistent types throughout the app.
 * @param {Object} rawNewsItem - Raw item from the API response array
 * @returns {Object} - Normalized news item for the Redux store
 */
function deserializeFeedItem(rawNewsItem) {
  return {
    id: rawNewsItem.id,
    topic: rawNewsItem.topic,
    title: rawNewsItem.title,
    summary: rawNewsItem.summary,
    sources: Array.isArray(rawNewsItem.sources) ? rawNewsItem.sources : [],
    createdAt: rawNewsItem.createdAt,
  }
}

/**
 * Deserializes the full API response for GET /api/news/feed.
 * @param {Object[]} rawItemsArray - Raw array of news items from the API
 * @returns {Object[]} - Array of normalized news items for the Redux store
 */
export function deserializeGetFeed(rawItemsArray) {
  if (!Array.isArray(rawItemsArray.stories)) {
    return []
  }
  return rawItemsArray.stories.map(deserializeFeedItem)
}

