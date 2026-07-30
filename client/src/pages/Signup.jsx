import React, { useEffect } from "react";
import AuthModal from "../components/AuthModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Signup = () => {
  const { setAuthModalTab } = useAuth();
  useEffect(() => setAuthModalTab("signup"), [setAuthModalTab]);
  return (
    <div className="page-content auth-wrap">
      <AuthModal inline />
    </div>
  );
};

export default Signup;
