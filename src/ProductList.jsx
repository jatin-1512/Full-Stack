import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from './features/cartSlice'

const products = [
  { id: 1, name: 'Apple iPhone 14', price: 799 },
  { id: 2, name: 'Samsung Galaxy S23', price: 699 },
  { id: 3, name: 'Google Pixel 7', price: 599 }
]

export default function ProductList() {
  const dispatch = useDispatch()

  function handleAdd(p) {
    dispatch(addItem({ id: p.id, name: p.name, price: p.price }))
  }

  return (
    <div className="card">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((p) => (
          <li key={p.id} className="product">
            <div>
              <strong>{p.name}</strong>
              <div className="price">${p.price}</div>
            </div>
            <button onClick={() => handleAdd(p)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
