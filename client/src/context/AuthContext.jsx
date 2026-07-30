import React, { createContext, useContext, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("fabliss_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login"); // "login" | "signup"
  const [pendingAction, setPendingAction] = useState(null); // fn to run after successful login

  const persistSession = (token, userObj) => {
    localStorage.setItem("fabliss_token", token);
    localStorage.setItem("fabliss_user", JSON.stringify(userObj));
    setUser(userObj);
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    persistSession(data.token, data.user);
    return data.user;
  };

  const signup = async (form) => {
    const { data } = await api.post("/auth/signup", form);
    persistSession(data.token, data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("fabliss_token");
    localStorage.removeItem("fabliss_user");
    setUser(null);
  };

  // Opens the login/signup modal. If an action is passed, it runs automatically
  // right after a successful login/signup (used by "Add to cart" gating).
  const requireAuth = (action) => {
    if (user) {
      action?.();
      return true;
    }
    setPendingAction(() => action || null);
    setAuthModalTab("login");
    setAuthModalOpen(true);
    return false;
  };

  const onAuthSuccess = () => {
    setAuthModalOpen(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
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
