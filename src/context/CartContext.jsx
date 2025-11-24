import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (course) => {
    const isInCart = cart.some(item => item.id === course.id)
    if (!isInCart) {
      setCart(prev => [...prev, course])
      return true
    }
    return false
  }

  const removeFromCart = (courseId) => {
    setCart(prev => prev.filter(item => item.id !== courseId))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartCount = () => {
    return cart.length
  }

  const isInCart = (courseId) => {
    return cart.some(item => item.id === courseId)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    getCartCount,
    isInCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

