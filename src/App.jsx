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
          
        </>} />
        <Route path="/category/:slug" element={<Category />} />
      </Routes>
    </Router>
    </>
  
  )
}

export default App
