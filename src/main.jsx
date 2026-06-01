import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { store } from './store/index.js'
import App from './App.jsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f1017',
      paper: '#16171d',
    },
    primary: {
      main: '#818cf8',
    },
    divider: '#2e303a',
    text: {
      primary: '#f3f4f6',
      secondary: '#9ca3af',
      disabled: '#6b7280',
    },
  },
  typography: {
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          minHeight: '100svh',
        },
        '#root': {
          minHeight: '100svh',
        },
      },
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
