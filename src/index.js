import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WeatherProvider } from './context/weather';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <WeatherProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WeatherProvider>,
  document.getElementById('root')
);
