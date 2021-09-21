import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// Update file .env.development or .env.production to use a different backend server URL
// axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER_URL
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
