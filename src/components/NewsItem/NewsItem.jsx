import { Card, CardContent, Typography, Box } from '../mui/index.js'

/**
 * Formats an ISO datetime string into a readable locale date string.
 * @param {string} isoDateString
 * @returns {string}
 */
function formatPublishedDate(isoDateString) {
  const parsedDate = new Date(isoDateString)
  if (isNaN(parsedDate.getTime())) {
    return 'Unknown date'
  }
  return parsedDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Presentational component that renders a single news item card.
 * Accepts only plain props — no Redux or direct API usage.
 *
 * @param {Object}   props
 * @param {string}   props.title     - Headline of the news item
 * @param {string}   props.summary   - Short text summary of the article
 * @param {string}   props.createdAt - ISO datetime string of when the item was created
 */
function NewsItem({ title, summary, createdAt }) {
  const formattedDate = formatPublishedDate(createdAt)

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: 'background.paper',
        borderColor: 'divider',
        borderRadius: 2,
        transition: 'border-color 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            lineHeight: 1.4,
            mb: 1,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.65,
            mb: 2,
            fontSize: { xs: '0.875rem', sm: '0.9rem' },
          }}
        >
          {summary}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography
            variant="caption"
            sx={{ color: 'text.disabled', fontSize: '0.75rem' }}
          >
            {formattedDate}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default NewsItem

