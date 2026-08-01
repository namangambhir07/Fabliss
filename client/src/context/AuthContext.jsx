import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const AuthContext = createContext(null);
const CART_STORAGE_KEY = "fabliss_cart";

const readLocalCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("fabliss_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login");
  const [pendingAuth, setPendingAuth] = useState(null);

  const persistSession = (token, userObj) => {
    localStorage.setItem("fabliss_token", token);
    localStorage.setItem("fabliss_user", JSON.stringify(userObj));
    setUser(userObj);
  };

  const login = async (email, password) => {
    const cart = readLocalCart();
    const { data } = await api.post("/auth/login", { email, password, cart });
    persistSession(data.token, data.user);

    if (data.cart) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data.cart));
    }

    return data.user;
  };

  const signup = async (form) => {
    const cart = readLocalCart();
    const { data } = await api.post("/auth/signup", { ...form, cart });
    persistSession(data.token, data.user);

    if (data.cart) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data.cart));
    }

    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("fabliss_token");
    localStorage.removeItem("fabliss_user");
    setPendingAuth(null);
    setUser(null);
  };

  const requireAuth = (options = {}) => {
    if (user) {
      if (options.action) options.action();
      if (options.redirectTo) navigate(options.redirectTo);
      return true;
    }

    setPendingAuth({ action: options.action || null, redirectTo: options.redirectTo || null });
    setAuthModalTab("login");
    setAuthModalOpen(true);
    return false;
  };

  const onAuthSuccess = () => {
    setAuthModalOpen(false);
    const nextAuth = pendingAuth;
    setPendingAuth(null);

    if (nextAuth?.action) {
      nextAuth.action();
    }

    return nextAuth?.redirectTo || "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        requireAuth,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        onAuthSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
