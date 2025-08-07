import { useState } from 'react'
import './App.css'
// список всех товаров
import ListApi from './components/ListApi/ListApi'
// список всех категорий 
import CategoryApi from './components/CategoriApi/CategoryApi'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Category from './components/Category/Category';
import LoginRegistration from './components/LoginRegistration/LoginRegistration';
import Register from './components/Register/Register';
// import CommentForm from './components/CommentForm/CommentForm';
import ProductDetail from './components/ProductDetail/ProductDetail';
// сама карта 
import Cart from './components/Cart/Cart';
// компонент для отслеживания ошибок;
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={
        <>
          {/* ErrorBoundary компонент для проверки компонентов */}
          <ErrorBoundary>
            <ListApi />
          </ErrorBoundary>
           {/* ErrorBoundary компонент для проверки компонентов */}
          
            
         
          
          <CategoryApi />
          <Register />
          <LoginRegistration />
          {/* <CommentForm productId={1} /> */}
          
        </>} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    </>
  
  )
}

export default App
