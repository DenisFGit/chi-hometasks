import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.tsx'
import ThemeProvider from './context/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>

  // </StrictMode>,
)
