import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [] // {id, name, price, quantity}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, name, price } = action.payload
      const existing = state.items.find((i) => i.id === id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ id, name, price, quantity: 1 })
      }
    },
    removeItem(state, action) {
      const id = action.payload
      state.items = state.items.filter((i) => i.id !== id)
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const existing = state.items.find((i) => i.id === id)
      if (existing) {
        existing.quantity = quantity
      }
    },
    clearCart(state) {
      state.items = []
    }
  }
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
