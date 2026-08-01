import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "fabliss_cart";

const readStoredCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const normaliseItem = (item) => ({
  id: item.id,
  name: item.name,
  price: Number(item.price) || 0,
  image: item.image || "",
  qty: Math.max(1, Number(item.qty) || 1),
  meta: item.meta || "",
});

// A cart line looks like:
// { id, name, price, image, qty, meta } — meta is used to describe
// a custom hamper's chosen items, or an occasion hamper's slug.

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState(() => readStoredCart());

  useEffect(() => {
    setItems(readStoredCart());
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item) => {
    const normalised = normaliseItem(item);
    setItems((prev) => {
      const existing = prev.find((i) => i.id === normalised.id);
      if (existing) {
        return prev.map((i) => (i.id === normalised.id ? { ...i, qty: i.qty + normalised.qty } : i));
      }
      return [...prev, normalised];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, subtotal, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
