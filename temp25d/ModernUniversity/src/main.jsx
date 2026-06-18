import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { UIProvider } from './context/UIContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <UIProvider>
        <App />
      </UIProvider>
    </HashRouter>
  </StrictMode>,
)
