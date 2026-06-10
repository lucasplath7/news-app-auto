import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Button,
  CircularProgress,
  Alert,
} from '../mui/index.js'
import NewsItem from '../NewsItem/NewsItem.jsx'

const FEED_TYPE_LABELS = {
  feed: 'Standard Feed',
  pipelineFeed: 'Pipeline Feed',
}

const TOPIC_OPTIONS = [
  { value: 'us-politics', label: 'US Politics' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'world-news', label: 'World News' },
]

/**
 * Presentational component for the full news feed UI.
 * Renders the feed-type toggle, topic selector, news item list, and load-more control.
 * All data and callbacks are received via props — no Redux usage here.
 *
 * @param {Object}     props
 * @param {string}     props.activeFeedType          - Currently selected feed type ('feed' | 'pipelineFeed')
 * @param {string}     props.activeTopic             - Currently selected topic key
 * @param {Object[]}   props.newsItems               - Array of news items to display
 * @param {boolean}    props.loading                 - Whether a fetch is in progress
 * @param {string|null} props.error                  - Error message or null
 * @param {boolean}    props.hasMore                 - Whether more pages are available
 * @param {Function}   props.onFeedTypeChange        - Called with the new feed type string
 * @param {Function}   props.onTopicChange           - Called with the new topic string
 * @param {Function}   props.onLoadMoreClick         - Called when the load-more button is clicked
 */
function NewsFeed({
  activeFeedType,
  activeTopic,
  newsItems,
  loading,
  error,
  hasMore,
  onFeedTypeChange,
  onTopicChange,
  onLoadMoreClick,
}) {
  const isInitialLoad = loading && newsItems.length === 0

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '780px',
        mx: 'auto',
        px: { xs: 2, sm: 3 },
        pb: 6,
      }}
    >
      {/* App header */}
      <Box sx={{ pt: { xs: 3, sm: 4 }, pb: 3, textAlign: 'center' }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.6rem', sm: '2rem' },
            letterSpacing: '-0.5px',
            color: 'text.primary',
            mb: 0.5,
          }}
        >
          News Feed
        </Typography>

        {/* Active source indicator */}
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
          Source: {FEED_TYPE_LABELS[activeFeedType]}
        </Typography>
      </Box>

      {/* Feed type toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ToggleButtonGroup
          value={activeFeedType}
          exclusive
          onChange={(_event, newFeedType) => {
            if (newFeedType !== null) {
              onFeedTypeChange(newFeedType)
            }
          }}
          size="small"
        >
          <ToggleButton value="feed">Standard</ToggleButton>
          <ToggleButton value="pipelineFeed">Pipeline</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Topic selector */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'center',
          flexWrap: 'wrap',
          mb: 4,
        }}
      >
        {TOPIC_OPTIONS.map(({ value, label }) => (
          <Chip
            key={value}
            label={label}
            clickable
            onClick={() => onTopicChange(value)}
            color={activeTopic === value ? 'primary' : 'default'}
            variant={activeTopic === value ? 'filled' : 'outlined'}
            sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
          />
        ))}
      </Box>

      {/* Error banner */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Initial loading spinner */}
      {isInitialLoad && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={36} />
        </Box>
      )}

      {/* News items list */}
      {!isInitialLoad && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {newsItems.map((newsItem) => (
            <NewsItem
              key={newsItem.id}
              title={newsItem.title}
              summary={newsItem.summary}
              createdAt={newsItem.createdAt}
            />
          ))}
        </Box>
      )}

      {/* Empty state */}
      {!isInitialLoad && !loading && newsItems.length === 0 && !error && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="body1" sx={{ color: 'text.disabled' }}>
            No articles found for this topic.
          </Typography>
        </Box>
      )}

      {/* Load more / pagination */}
      {!isInitialLoad && newsItems.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          {loading ? (
            <CircularProgress size={28} />
          ) : hasMore ? (
            <Button
              variant="outlined"
              onClick={onLoadMoreClick}
              sx={{ px: 4, py: 1, fontSize: '0.875rem', borderRadius: 2 }}
            >
              Load more
            </Button>
          ) : (
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              All articles loaded
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

export default NewsFeed

