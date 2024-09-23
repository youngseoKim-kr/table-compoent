import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles'
import { StoreProvider } from '@stores/index'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
)
