import { createBrowserRouter } from "react-router";
import { StoreFront } from "./pages/StoreFront";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminProducts } from "./pages/admin/AdminProducts";
import { AdminAnalytics } from "./pages/admin/AdminAnalytics";
import { AdminInventory } from "./pages/admin/AdminInventory";
import { AdminOrders } from "./pages/admin/AdminOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: StoreFront,
  },
  {
    path: "/product/:id",
    Component: ProductDetail,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
    children: [
      { index: true, Component: AdminAnalytics },
      { path: "products", Component: AdminProducts },
      { path: "inventory", Component: AdminInventory },
      { path: "orders", Component: AdminOrders },
    ],
  },
]);
