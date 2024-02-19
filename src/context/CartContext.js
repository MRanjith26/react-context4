import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  removeAllItems: () => {},
  increaseCartItem: () => {},
  decreaseCartItem: () => {},
})

export default CartContext
