import Header from '../Header'
import CartListView from '../CartListView'
import EmptyCartView from '../EmptyCartView'
import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllItems} = value
      const showEmptyView = cartList.length === 0

      const getTotalAmount = () => {
        const sumAmount = cartList.map(
          product => product.price * product.quantity,
        )
        const totalAmount = sumAmount.reduce(
          (accumulator, price) => accumulator + price,
        )
        return totalAmount
      }

      const onClickClearCartList = () => {
        removeAllItems()
      }

      return (
        <>
          <Header />
          {showEmptyView ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <div className="head-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    className="remove-all-button"
                    type="button"
                    onClick={onClickClearCartList}
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                <div className="cart-summary-container">
                  <div className="total-card">
                    <p className="total-text">order Total:</p>
                    <p className="total-amount">Rs {getTotalAmount()}/-</p>
                  </div>
                  <div className="button-container">
                    <p className="items-text">
                      {cartList.length}
                      {cartList.length > 1 ? ' items' : ' item'} in cart
                    </p>
                    <button className="checkout-btn" type="button">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
