import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFeed, fetchPipelineFeed } from '../../store/actions/index.js'
import NewsFeed from '../../components/NewsFeed/NewsFeed.jsx'

const DEFAULT_TOPIC = 'us-politics'
const INITIAL_PAGE = 0

/**
 * Smart container for the news feed.
 * Owns feed-type selection and topic selection as local UI state.
 * Reads paginated news items, loading flag, error, and hasMore from Redux.
 * Dispatches fetch actions and passes plain props down to NewsFeed.
 */
function NewsFeedContainer() {
  const dispatch = useDispatch()

  const [activeFeedType, setActiveFeedType] = useState('feed')
  const [activeTopic, setActiveTopic] = useState(DEFAULT_TOPIC)

  const feedState = useSelector((state) => state.feed)
  const pipelineFeedState = useSelector((state) => state.pipelineFeed)

  const activeState = activeFeedType === 'feed' ? feedState : pipelineFeedState

  const dispatchFetch = activeFeedType === 'feed' ? fetchFeed : fetchPipelineFeed

  // Fetch page 0 whenever the topic or feed type changes
  useEffect(() => {
    dispatch(dispatchFetch({ topic: activeTopic, page: INITIAL_PAGE }))
  }, [activeFeedType, activeTopic, dispatch, dispatchFetch])

  function handleFeedTypeChange(newFeedType) {
    setActiveFeedType(newFeedType)
    // Scroll back to top so the user sees fresh content
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleTopicChange(newTopic) {
    if (newTopic === activeTopic) return
    setActiveTopic(newTopic)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleLoadMoreClick() {
    const nextPage = activeState.page + 1
    dispatch(dispatchFetch({ topic: activeTopic, page: nextPage }))
  }

  return (
    <NewsFeed
      activeFeedType={activeFeedType}
      activeTopic={activeTopic}
      newsItems={activeState.items}
      loading={activeState.loading}
      error={activeState.error}
      hasMore={activeState.hasMore}
      onFeedTypeChange={handleFeedTypeChange}
      onTopicChange={handleTopicChange}
      onLoadMoreClick={handleLoadMoreClick}
    />
  )
}

export default NewsFeedContainer


