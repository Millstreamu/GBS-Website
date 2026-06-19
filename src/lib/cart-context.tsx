'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface CartItem {
  slug: string
  collectionSlug: string
  categorySlug: string
  name: string
  price: number
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (slug: string) => void
  updateQuantity: (slug: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'good-boy-supply-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Load cart from localStorage once, on mount.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {
      // ignore malformed storage
    }
    setHydrated(true)
  }, [])

  // Persist cart whenever it changes (after initial hydration).
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore storage write failures (e.g. private browsing quota)
    }
  }, [items, hydrated])

  function addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
    setItems(prev => {
      const existing = prev.find(i => i.slug === item.slug)
      if (existing) {
        return prev.map(i =>
          i.slug === item.slug ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { ...item, quantity }]
    })
  }

  function removeItem(slug: string) {
    setItems(prev => prev.filter(i => i.slug !== slug))
  }

  function updateQuantity(slug: string, quantity: number) {
    if (quantity < 1) {
      removeItem(slug)
      return
    }
    setItems(prev => prev.map(i => (i.slug === slug ? { ...i, quantity } : i)))
  }

  function clearCart() {
    setItems([])
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
