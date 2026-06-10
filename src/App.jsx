import NewsFeedContainer from './containers/NewsFeed/NewsFeedContainer.jsx'
import AboutDialog from './components/AboutDialog/AboutDialog.jsx'
import { Box } from './components/mui/index.js'
import './App.css'

function App() {
  return (
    <Box sx={{ minHeight: '100svh', position: 'relative' }}>
      <AboutDialog />

      <NewsFeedContainer />
    </Box>
  )
}

export default App
