import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartModel from "./cart/CartModel";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

function Navbar() {
  //cart
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  //show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  //console.log(user)
  const [logoutUser] = useLogoutUserMutation()
  const navigate = useNavigate();

  //mobile Toggle
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  //dropdown menu
  const [isDropDownOpen, SetIsDropDownOpen] = useState(false);
  const handleDropDownToggle = ()=>{
    SetIsDropDownOpen(!isDropDownOpen)
  };

  //admin dropdown menus
  const adminDropDownMenus = [
    {label: "Dashboard", path: "/dashboard/admin"},
    {label: "Manage Items", path: "/dashboard/manage-products"},
    {label: "All Orders", path: "/dashboard/manage-orders"},
    {label: "Add New Update", path: "/dashboard/add-new-update"},
  ]
   
  //user dropdown menus
  const userDropDownMenus = [
    {label: "Dashboard", path: "/dashboard"},
    {label: "Profile", path: "/dashboard/profile"},
    {label: "Payments", path: "/dashboard/payments"},
    {label: "Orders", path: "/order-success"},
  ]

  const dropDownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus]

  
  //logout
  const hnadleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout())
      navigate('/')
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  return (
    <header className="fixed-nav-bar bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className=" fixed top-0 z-50 w-full items-center justify-between px-10 py-4 bg-white shadow-md max-w-full">
        {/* Left Section */}
        <div className="flex items-center">
          <Link to="/">
            <img src="/sambhaar.png" alt="Logo" className="h-8 md:h-12" />
          </Link>
        </div>

        <div className="flex items-center justify-between space-x-6">
          {/* Center Links - Hidden on small screens */}
          <div className="hidden md:flex space-x-6 text-gray-700">
            <Link
              to="/shop"
              className="hover:text-[#C74227] transition duration-200 hover:font-medium"
            >
              Products
            </Link>
            <Link
              to="/offers"
              className="hover:text-[#C74227] transition duration-200 hover:font-medium"
            >
              Offers
            </Link>
            <Link
              to="/Pages"
              className="hover:text-[#C74227] transition duration-200 hover:font-medium"
            >
              Pages
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#C74227] transition duration-200 hover:font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Icons Section - Hidden on small screens */}
            <div className="hidden md:flex space-x-4 items-center">
              <span>
                <Link to="/search" className="hover:text-primary">
                  <i className="ri-search-line ri-lg text-gray-700"></i>
                </Link>
              </span>
              <span>
                <button
                  onClick={handleCartToggle}
                  className="hover:text-primary"
                >
                  <i className="ri-shopping-cart-line ri-lg text-gray-700 hover:text-[#C74227]"></i>
                  <sup className="inline-block text-xs px-1.5 text-white bg-primary rounded-full">
                    {products.length}
                  </sup>
                </button>
              </span>
              <span>
                {user && user ? (
                  <>
                    {user.profileImage ? (
                      <img
                      onClick={handleDropDownToggle}
                        src={user.profileImage}
                        alt="User Avatar"
                        className="size-7 rounded-full cursor-pointer"
                      />
                    ) : (
                      <Link
                      onClick={handleDropDownToggle}
                        className="bg-gray-200 text-primary hover:text-primary-dark hover:bg-gray-300 p-2 rounded-full"
                      >
                        <i className="ri-user-line ri-lg"></i>
                      </Link>
                    )}

                    {
                      isDropDownOpen && (
                        <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                          <ul className="font-medium space-y-4 p-2">
                            {
                              dropDownMenus.map((menu, index) => (
                                <li key={index}>
                                  <Link onClick={() => SetIsDropDownOpen(false)}
                                  className="dropdown-items text-gray-700 hover:text-primary"
                                  to={menu.path}>{menu.label}</Link>
                                </li>
                              ))
                            }
                            <li>
                              <Link onClick={hnadleLogout}
                              className="dropdown-items text-gray-700 hover:text-primary">Logout</Link>
                            </li>
                          </ul>
                        </div>
                      )
                    }
                  </>
                ) : (
                  <a href="/login" className="bg-primary hover:bg-primary-dark rounded-md px-4 py-2 text-primary-light hover:text-white font-normal">
                    Join
                  </a>
                )}
              </span>
            </div>

            {/* Mobile Menu Toggle - Visible on small screens */}
            <button
              className="md:hidden flex items-center text-gray-700 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6 transition-transform transform-gpu duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                ></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu - Visible when toggled */}
          {isMobileMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden transition-all duration-300 ease-in-out z-50 transform scale-95 opacity-0 animate-fadeIn">
              <Link
                to="/shop"
                className="text-gray-700 hover:text-[#C74227] transition duration-200 hover:font-medium"
              >
                Products
              </Link>
              <Link
                to="/offers"
                className="text-gray-700 hover:text-[#C74227] transition duration-200 hover:font-medium"
              >
                Offers
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-[#C74227] transition duration-200 hover:font-medium"
              >
                Contact
              </Link>
              <div className="flex items-center space-x-4 mt-2">
                <span>
                  <Link
                    to="/search"
                    className="text-gray-700 hover:text-[#C74227] transition-all duration-200"
                  >
                    <i className="ri-search-line ri-lg"></i>
                  </Link>
                </span>
                <span>
                  <button
                    onClick={handleCartToggle}
                    className="relative text-gray-700 hover:text-[#C74227] transition-all duration-200"
                  >
                    <i className="ri-shopping-cart-line ri-lg"></i>
                    <sup className="absolute -top-2 -right-2 text-xs px-1.5 text-white bg-primary rounded-full">
                      {products.length}
                    </sup>
                  </button>
                </span>
                <span>
                {user && user ? (
                  <>
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="User Avatar"
                        className="size-7 rounded-full cursor-pointer"
                      />
                    ) : (
                      <Link
                        className="bg-gray-200 text-primary hover:text-primary-dark hover:bg-gray-300 p-2 rounded-full"
                      >
                        <i className="ri-user-line ri-lg"></i>
                      </Link>
                    )}
                  </>
                ) : (
                  <a href="/login" className="bg-primary hover:bg-primary-dark rounded-md px-4 py-2 text-primary-light hover:text-white font-normal">
                    Join
                  </a>
                )}
                </span>
              </div>
            </div>
          )}
        </div>
      </nav>

      {isCartOpen && (
        <CartModel
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
}

export default Navbar;
