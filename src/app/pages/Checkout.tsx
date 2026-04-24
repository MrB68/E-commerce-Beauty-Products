import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    alert("Order placed successfully!");

    localStorage.removeItem("cartItems");
    setCartItems([]);

    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4">
        <p>Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-white text-black rounded-lg"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 flex justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl mb-6 text-center">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8 bg-neutral-900 p-6 rounded-xl shadow-lg">
          {/* LEFT: FORM */}
          <div>
            <h2 className="text-xl mb-4">Shipping Details</h2>

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full mb-3 p-3 bg-black border border-neutral-600 rounded-lg focus:outline-none focus:border-white"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full mb-3 p-3 bg-black border border-neutral-600 rounded-lg focus:outline-none focus:border-white"
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="w-full mb-3 p-3 bg-black border border-neutral-600 rounded-lg focus:outline-none focus:border-white"
            />

            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full mb-3 p-3 bg-black border border-neutral-600 rounded-lg focus:outline-none focus:border-white"
            />
          </div>

          {/* RIGHT: SUMMARY */}
          <div>
            <h2 className="text-xl mb-4">Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>Rs {item.price * item.quantity}</span>
              </div>
            ))}

            <div className="border-t border-neutral-700 mt-4 pt-4 flex justify-between text-lg">
              <span>Total</span>
              <span>Rs {total}</span>
            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}