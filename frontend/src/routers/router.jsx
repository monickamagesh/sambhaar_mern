import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Category from "../pages/category/Category";
import Search from "../pages/search/Search";
import Shop from "../pages/shop/Shop";
import OrderSummary from "../pages/order/OrderSummary";
import Login from "../components/Login";
import Register from "../components/Register";
import OrderSuccess from "../pages/order/OrderSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserOrders from "../pages/dashboard/user/UserOrders";
import UserReviews from "../pages/dashboard/user/userReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminDMain from "../pages/dashboard/admin/dashboard/AdminDMain";
import AddProduct from "../pages/dashboard/admin/addProduct/AddProduct";
import ManageProduct from "../pages/dashboard/admin/manageProduct/ManageProduct";
import UpdateProduct from "../pages/dashboard/admin/manageProduct/UpdateProduct";
import ManageUser from "../pages/dashboard/admin/users/ManageUser";
import ManageOrders from "../pages/dashboard/admin/manageOrder/ManageOrders";
import AboutContent from "../pages/about/about";
import Privacypolicy from "../components/Informations/privacypolicy";
import TermsandConditions from "../components/Informations/termsandconditions";
import ReturnandRefund from "../components/Informations/returnrefund";
import FAQ from "../components/Informations/faq";
import Contactpage from "../components/Contact";
import ManageCategories from "../pages/dashboard/admin/categories/ManageCategories";
import ManageMilk from "../pages/dashboard/admin/manageMilk/ManageMilk";
import AddMilk from "../pages/dashboard/admin/manageMilk/addMilk";
import UpdateMilk from "../pages/dashboard/admin/manageMilk/UpdateMilk";
import Subscription from "../pages/subscription/Subscription";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/category/:categoryName", element: <Category /> },
      { path: "/about", element: <AboutContent /> },
      { path: "/search", element: <Search /> },
      { path: "/shop", element: <Shop /> },
      { path: "/privacy", element: <Privacypolicy /> },
      { path: "/termsandconditions", element: <TermsandConditions /> },
      { path: "/returnandrefund", element: <ReturnandRefund /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/contact", element: <Contactpage /> },
      { path: "/order-summary", element: <OrderSummary /> },
      { path: "/order-success", element: <OrderSuccess /> },
      { path: "/subscription", element: <Subscription />},
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          // user routes
          { path: "", element: <UserDMain /> },
          { path: "orders", element: <UserOrders /> },
          { path: "profile", element: <UserProfile /> },
          { path: "reviews", element: <UserReviews /> },

          //admin routes (only for admins)
          {
            path: "admin",
            element: (
              <PrivateRoute role="admin">
                <AdminDMain />
              </PrivateRoute>
            ),
          },
          {
            path: "add-product",

            element: (
              <PrivateRoute role="admin">
                <AddProduct />
              </PrivateRoute>
            ),
          },
          {
            path: "manage-products",
            element: (
              <PrivateRoute role="admin">
                <ManageProduct />
              </PrivateRoute>
            ),
          },
          {
            path: "manage-categories",
            element: (
              <PrivateRoute role="admin">
                <ManageCategories />
              </PrivateRoute>
            ),
          },
          {
            path: "update-product/:id",
            element: (
              <PrivateRoute role="admin">
                <UpdateProduct/>
              </PrivateRoute>
            ),
          },
          {
            path: "users",
            element: (
              <PrivateRoute role="admin">
                <ManageUser />
              </PrivateRoute>
            ),
          },
          {
            path: "manage-orders",
            element: (
              <PrivateRoute role="admin">
                <ManageOrders />
              </PrivateRoute>
            ),
          },
          {
            path: "manage-milks",
            element: (
              <PrivateRoute role="admin">
                <ManageMilk />
              </PrivateRoute>
            ),
          },
          {
            path: "add-milk",
            element: (
              <PrivateRoute role="admin">
                <AddMilk />
              </PrivateRoute>
            ),
          },
          {
            path: "update-milk/:id",
            element: (
              <PrivateRoute role="admin">
                <UpdateMilk />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  //dashboard routes start here
]);

export default router;