import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, updateQuantity } from './features/cartSlice'

export default function Cart() {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  const total = items.reduce((s, it) => s + it.price * it.quantity, 0)

  function changeQty(id, qty) {
    if (qty <= 0) {
      dispatch(removeItem(id))
    } else {
      dispatch(updateQuantity({ id, quantity: qty }))
    }
  }

  return (
    <div className="card">
      <h2>Cart</h2>
      {items.length === 0 ? (
        <div className="empty">Cart is empty</div>
      ) : (
        <ul className="cart-list">
          {items.map((it) => (
            <li key={it.id} className="cart-item">
              <div className="cart-item-info">
                <strong>{it.name}</strong>
                <div>${it.price} each</div>
              </div>
              <div className="cart-item-controls">
                <button onClick={() => changeQty(it.id, it.quantity - 1)}>-</button>
                <input
                  type="number"
                  min="1"
                  value={it.quantity}
                  onChange={(e) => changeQty(it.id, Number(e.target.value))}
                />
                <button onClick={() => changeQty(it.id, it.quantity + 1)}>+</button>
                <button className="remove" onClick={() => dispatch(removeItem(it.id))}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-total">Total: ${total.toFixed(2)}</div>
    </div>
  )
}
