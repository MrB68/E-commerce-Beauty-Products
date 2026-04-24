import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./app/context/CartContext"; // 👈 IMPORTANT

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CartProvider> {/* 👈 THIS FIXES YOUR CART */}
      <App />
    </CartProvider>
  </BrowserRouter>
);