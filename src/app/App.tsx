import { Routes, Route } from "react-router-dom";
import { StoreFront } from "./pages/StoreFront";
import { Cart } from "./pages/Cart";
import { ProductDetail } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StoreFront />} />
      <Route path="/cart" element={<Cart />} /> {/* 👈 MUST EXIST */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}