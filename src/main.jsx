import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes.jsx'
import './index.css'
import AuthProvider from './providers/AuthProvider'
import { LoadingProvider } from './contexts/LoadingContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <LoadingProvider>
        <RouterProvider router={router} />
      </LoadingProvider>
    </AuthProvider>
  </React.StrictMode>
)
