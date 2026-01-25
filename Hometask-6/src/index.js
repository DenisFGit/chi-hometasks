import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import ThemeProvider from './components/ThemeProvider.jsx';
import './style.scss';

const root = createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
);

if (import.meta.hot) {
    import.meta.hot.accept();
}