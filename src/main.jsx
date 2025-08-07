import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// компонент для карты связан с Cart нужно оббернуть  все приложение чтобы везде работало 
import { CartProvider } from './components/Corzina/Corzina'

createRoot(document.getElementById('root')).render(

 // компонент для карты с
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
  // компонент для карты с
)
