import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import Category from "../pages/category/Category";
import Search from "../pages/search/Search";
import Shop from "../pages/shop/Shop";
import OrderSummary from "../pages/order/OrderSummary";
import Login from "../components/Login";
import Register from "../components/Register";
import OrderSuccess from "../pages/order/OrderSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {path: '/', element: <Home />},
        {path: '/category/:categoryName', element: <Category />},
        {path: '/search', element: <Search />},
        {path: '/shop', element: <Shop />},
        {path: "/order-summary", element: <OrderSummary /> },
        {path: "/order-success", element: <OrderSuccess />}

    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

export default router;
