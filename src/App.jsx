import { useState } from 'react'
import NewsFeedContainer from './containers/NewsFeed/NewsFeedContainer.jsx'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from './components/mui/index.js'
import './App.css'

function App() {
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false)

  function handleOpenAboutDialog() {
    setIsAboutDialogOpen(true)
  }

  function handleCloseAboutDialog() {
    setIsAboutDialogOpen(false)
  }

  return (
    <Box sx={{ minHeight: '100svh', position: 'relative' }}>
      <Button
        variant="outlined"
        onClick={handleOpenAboutDialog}
        aria-label="Open about dialog"
        sx={{
          position: 'fixed',
          top: { xs: 12, sm: 16 },
          right: { xs: 12, sm: 16 },
          zIndex: 1400,
          minHeight: '44px',
          px: 2.25,
          py: 1,
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.01em',
          color: 'text.primary',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(22, 23, 29, 0.72)',
          borderColor: 'rgba(129, 140, 248, 0.35)',
          boxShadow: '0 0 0 0 rgba(129, 140, 248, 0.1)',
          overflow: 'hidden',
          transition: 'transform 180ms ease, border-color 180ms ease, background-color 180ms ease',
          '@keyframes aboutButtonBreath': {
            '0%, 100%': {
              transform: 'translateY(0) scale(1)',
              borderColor: 'rgba(129, 140, 248, 0.28)',
              boxShadow: '0 0 0 0 rgba(129, 140, 248, 0.10)',
            },
            '50%': {
              transform: 'translateY(-1px) scale(1.02)',
              borderColor: 'rgba(129, 140, 248, 0.55)',
              boxShadow: '0 0 0 6px rgba(129, 140, 248, 0.05)',
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: -2,
            borderRadius: 'inherit',
            background:
              'linear-gradient(120deg, rgba(129, 140, 248, 0.0), rgba(129, 140, 248, 0.18), rgba(300, 140, 248, 200))',
            transform: 'translateX(-120%)',
            animation: 'aboutButtonSweep 5.2s ease-in-out infinite',
            pointerEvents: 'none',
          },
          '@keyframes aboutButtonSweep': {
            '0%': { transform: 'translateX(-120%)' },
            '45%': { transform: 'translateX(120%)' },
            '100%': { transform: 'translateX(120%)' },
          },
          animation: 'aboutButtonBreath 4.8s ease-in-out infinite',
          '&:hover': {
            backgroundColor: 'rgba(22, 23, 29, 0.9)',
            borderColor: 'rgba(129, 140, 248, 0.8)',
          },
          '&:focus-visible': {
            outline: '2px solid rgba(129, 140, 248, 0.9)',
            outlineOffset: 2,
          },
        }}
      >
        About
      </Button>

      <Dialog
        open={isAboutDialogOpen}
        onClose={handleCloseAboutDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundImage: 'none',
            backgroundColor: 'background.paper',
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>About this app</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            This app is organized around a simple news architecture.
          </Typography>
          <Box
            component="img"
            src="/assets/news_arch.png"
            alt="News app architecture diagram"
            sx={{
              display: 'block',
              width: '100%',
              maxHeight: '70svh',
              objectFit: 'contain',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.default',
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseAboutDialog} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <NewsFeedContainer />
    </Box>
  )
}

export default App
