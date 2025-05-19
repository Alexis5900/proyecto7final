"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Producto = {
  _id: string
  nombre: string
  precio: number
}

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (producto: Producto) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, cantidad: number) => void
  clearCart: () => void
  totalPrice: number
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (producto: Producto) => {
    const existente = cart.find(item => item.id === producto._id)
    if (existente) {
      setCart(prev =>
        prev.map(item =>
          item.id === producto._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart(prev => [
        ...prev,
        {
          id: producto._id,
          name: producto.nombre,
          price: producto.precio,
          image: (producto as any).imagen || '/pizza.png',
          quantity: 1
        }
      ])
    }
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, cantidad: number) => {
    if (cantidad < 1) {
      removeFromCart(id)
      return
    }

    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: cantidad } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
