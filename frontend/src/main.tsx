import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Punto de entrada de la aplicación React
 * Renderiza el componente App en el elemento root del DOM
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
