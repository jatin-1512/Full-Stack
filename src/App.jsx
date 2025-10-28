import React from 'react'
import ProductList from './ProductList'
import Cart from './Cart'

export default function App() {
  return (
    <div className="container">
      <h1>Shopping Cart (7.2) — Redux Toolkit</h1>
      <div className="layout">
        <ProductList />
        <Cart />
      </div>
    </div>
  )
}
