import { useState } from 'react'
import './App.css'
// список всех товаров
import ListApi from './components/ListApi/ListApi'
// список всех категорий 
import CategoryApi from './components/CategoriApi/CategoryApi'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Category from './components/Category/Category';
function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={
        <>
          <ListApi />
          <CategoryApi />
        </>} />
        <Route path="/category/:slug" element={<Category />} />
      </Routes>
    </Router>
    </>
  
  )
}

export default App
