import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import TopBanner from "./components/TopBanner.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import AuthModal from "./components/AuthModal.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import HamperPage from "./pages/HamperPage.jsx";
import CustomHamper from "./pages/CustomHamper.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import BulkOrder from "./pages/BulkOrder.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>

      <TopBanner />
      <Navbar />
      <AuthModal />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hampers/:slug" element={<HamperPage />} />
        <Route path="/customise" element={<CustomHamper />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bulk-orders" element={<BulkOrder />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default App;
