import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'

window.onerror = function (message, source, lineno) {
  const div = document.createElement('div');
  div.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; background: red; color: white; z-index: 9999; padding: 20px;';
  div.innerText = 'Global Error: ' + message + ' at ' + source + ':' + lineno;
  document.body.appendChild(div);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
