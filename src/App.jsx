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

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={
        <>
          <ListApi />
          <CategoryApi />
          <Register />
          <LoginRegistration />
          {/* <CommentForm productId={1} /> */}
          
        </>} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
    </>
  
  )
}

export default App
