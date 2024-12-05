import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartModel from "./cart/CartModel";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

function Navbar() {
  const { totalPrice } = useSelector((store) => store.cart);
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  //console.log(user)
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  //mobile Toggle
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  //dropdown menu
  const [isDropDownOpen, SetIsDropDownOpen] = useState(false);
  const handleDropDownToggle = () => {
    SetIsDropDownOpen(!isDropDownOpen);
  };

  // admin dropdown menus
  const adminDropDownMenus = [
    { path: "/dashboard/admin", label: "Dashboard" },
    { path: "/dashboard/profile", label: "My Profile" },
    { path: "/dashboard/orders", label: "My orders" },
    { path: "/dashboard/users", label: "Users" },
    { path: "/dashboard/manage-categories", label: "Categories" },
    { path: "/dashboard/manage-products", label: "Products" },
    { path: "/dashboard/manage-milks", label: "Milks" },
    { path: "/dashboard/manage-orders", label: "Orders" },
  ];

  // user dropdown menus
  const userDropDownMenus = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/dashboard/orders", label: "My orders" },
    { path: "/dashboard/profile", label: "Profile" },
    { path: "/order-summary", label: "Checkout" },
    { path: "/dashboard/reviews", label: "Reviews" },
  ];

  const dropDownMenus =
    user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];

  //logout
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-dark to-orange-400 h-8 w-full fixed top-0 z-50 overflow-hidden">
        <div className="marquee-wrapper flex items-center text-white font-medium text-sm py-1">
          <div className="marquee animate-marquee">
            <div className="marquee-content">
              <div>Get Extra 10% Off* on Your 1st Order 🤯</div>
              <div>FREE* SHIPPING🚚 for all orders - BUY NOW</div>
              <div>Enjoy Same Day Delivery* across Chennai! ❤️</div>
              <div>Get Extra 10% Off* on Your 1st Order 🤯</div>
              <div>FREE* SHIPPING🚚 for all orders - BUY NOW</div>
              <div>Enjoy Same Day Delivery* across Chennai! ❤️</div>
            </div>
            <div className="marquee-content">
              <div>Get Extra 10% Off* on Your 1st Order 🤯</div>
              <div>FREE* SHIPPING🚚 for all orders - BUY NOW</div>
              <div>Enjoy Same Day Delivery* across Chennai! ❤️</div>
              <div>Get Extra 10% Off* on Your 1st Order 🤯</div>
              <div>FREE* SHIPPING🚚 for all orders - BUY NOW</div>
              <div>Enjoy Same Day Delivery* across Chennai! ❤️</div>
            </div>
          </div>
        </div>
      </section>

      <header
        className={`fixed top-8 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md text-gray-700 "
            : "bg-transparent  text-gray-700  "
        }`}
      >
        <nav className="flex items-center justify-between px-10 py-3 max-w-full">
          {/* Left Section */}
          <div className="flex items-center">
            <Link to="/">
              <img src="/sambhaar.png" alt="Logo" className="h-8 md:h-12 " />
            </Link>
          </div>

          <div className="flex items-center justify-between space-x-6">
            {/* Center Links - Hidden on small screens */}
            <div className="hidden md:flex space-x-6">
              <Link
                to="/shop"
                className="hover:text-primary  hover:font-medium"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="hover:text-primary  hover:font-medium"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="hover:text-primary  hover:font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {/* Icons Section - Hidden on small screens */}
              <div className="hidden md:flex space-x-4 items-center">
                <span>
                  <Link className="hover:text-primary" to="/search">
                    <i className="ri-search-line ri-lg "></i>
                  </Link>
                </span>

                <span>
                  {user && user ? (
                    <>
                      {user.profileImage ? (
                        <img
                          onClick={handleDropDownToggle}
                          src={user.profileImage}
                          alt="User Avatar"
                          className="size-10 rounded-full cursor-pointer"
                        />
                      ) : (
                        <Link
                          onClick={handleDropDownToggle}
                          className="bg-gray-200 text-primary hover:text-primary-dark hover:bg-gray-300 p-2 rounded-full"
                        >
                          <i className="ri-user-line ri-lg"></i>
                        </Link>
                      )}

                      {isDropDownOpen && (
                        <div className="absolute right-10 mt-1 p-4 w-48 bg-white border border-gray-200 rounded-md shadow-2xl z-50">
                          <ul className="font-medium space-y-4 p-2">
                            {dropDownMenus.map((menu, index) => (
                              <li key={index}>
                                <Link
                                  onClick={() => SetIsDropDownOpen(false)}
                                  className="dropdown-items text-gray-700 hover:text-primary"
                                  to={menu.path}
                                >
                                  {menu.label}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                onClick={handleLogout}
                                className="dropdown-items text-gray-700 hover:text-primary"
                              >
                                Logout
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href="/login"
                      className="bg-primary hover:bg-primary-dark rounded-md px-4 py-2 text-primary-light hover:text-white font-normal"
                    >
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
                          <Link className="bg-gray-200 text-primary hover:text-primary-dark hover:bg-gray-300 p-2 rounded-full">
                            <i className="ri-user-line ri-lg"></i>
                          </Link>
                        )}
                      </>
                    ) : (
                      <a
                        href="/login"
                        className="bg-primary hover:bg-primary-dark rounded-md px-4 py-2 text-primary-light hover:text-white font-normal"
                      >
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

        {/* Add to card */}
        <div
          onClick={handleCartToggle}
          className="top-[40%] -right-1 z-50 fixed flex items-center justify-end cursor-pointer"
        >
          <span className=" bg-gradient-to-br from-orange-600 to-orange-400 px-3 py-4 rounded-md gap-2 flex flex-col">
            <div className="">
              <i className="ri-shopping-cart-fill ri-lg text-white"></i>
              <span className="inline-block text-sm pl-0.5 font-semibold text-white">
                {products.length} {products.length > 1 ? "Items" : "Item"}
              </span>
            </div>
            <p className="bg-white  text-sm font-medium px-1 py-2 flex justify-center rounded-sm  text-primary">
              ₹{totalPrice}
            </p>
          </span>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
