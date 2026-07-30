import React from "react";
import AuthModal from "../components/AuthModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";

const Login = () => {
  const { setAuthModalTab } = useAuth();
  useEffect(() => setAuthModalTab("login"), [setAuthModalTab]);
  return (
    <div className="page-content auth-wrap">
      <AuthModal inline />
    </div>
  );
};

export default Login;
