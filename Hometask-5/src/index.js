import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import './style.scss';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

if (module.hot) {
    module.hot.accept();
}