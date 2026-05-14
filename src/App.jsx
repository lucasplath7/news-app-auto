import { useState } from 'react'
import { API_BASE_URL } from './config.js'

import './App.css'

function App() {
  const [resp, setResp] = useState(null)
  const [error, setError] = useState(null)

  async function handleClick() {
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/health`)

      if (!response.statusCode === 200) {
        setResp(null)
        setError(`Request failed with status ${response.status}`)
        return
      }

      const data = await response.json()
      setResp(data)
    } catch (err) {
      setResp(null)
      setError(err instanceof Error ? err.message : 'Request failed')
    }
  }

  return (
    <>
      <button onClick={handleClick}>Click Me</button>
      {resp && <p>{resp.message}</p>}
      {error && <p>{error}</p>}
    </>
  )
}

export default App
