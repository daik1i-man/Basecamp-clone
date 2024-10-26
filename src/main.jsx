import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import ContextsProvider from './provider/contextsProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <ContextsProvider>
          <App />
        </ContextsProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
)
