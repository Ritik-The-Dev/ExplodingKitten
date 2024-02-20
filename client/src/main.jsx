import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import reducer, { initialState } from './context/StateReducers.js';
import { StateProvider } from './context/StateContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>
)
