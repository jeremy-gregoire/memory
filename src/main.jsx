import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import registryCards from './cards.json';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App registryCards={registryCards} />
  </React.StrictMode>
);
