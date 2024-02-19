import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const productId = product.id
    const productQuantity = product.quantity

    const {cartList} = this.state

    const checkIfExist = cartList.filter(
      productItem => productItem.id === productId,
    )

    if (checkIfExist.length > 0) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === productId) {
            return {
              ...eachItem,
              quantity: eachItem.quantity + productQuantity,
            }
          }
          return eachItem
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const filteredDeleteList = cartList.filter(
      eachProduct => eachProduct.id !== id,
    )
    this.setState({cartList: filteredDeleteList})
  }

  removeAllItems = () => {
    this.setState({cartList: []})
  }

  increaseCartItem = (id, quantity) => {
    if (quantity > 0) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1}
          }
          return item
        }),
      }))
    }
  }

  decreaseCartItem = (id, quantity) => {
    const {cartList} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
          }
          return item
        }),
      }))
    } else {
      const deleteItemList = cartList.filter(item => item.id !== id)
      this.setState({cartList: deleteItemList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            removeAllItems: this.removeAllItems,
            increaseCartItem: this.increaseCartItem,
            decreaseCartItem: this.decreaseCartItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
