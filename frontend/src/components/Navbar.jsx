import React, { useEffect, useRef, useState } from "react";
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

  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // Mobile menu
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  // Dropdown
  const [isDropDownOpen, SetIsDropDownOpen] = useState(false);

  const handleDropDownToggle = () => {
    SetIsDropDownOpen((prev) => !prev); // Toggles the dropdown
  };

  const handleProfileClick = () => {
    SetIsDropDownOpen(false); // Ensures dropdown closes when the profile image is clicked
  };

  // Dropdown Menus
  const adminDropDownMenus = [
    { path: "/dashboard/admin", label: "Dashboard" },
    { path: "/dashboard/profile", label: "My Profile" },
    { path: "/dashboard/orders", label: "My orders" },
    { path: "/dashboard/users", label: "Users" },
    { path: "/dashboard/manage-categories", label: "Categories" },
    { path: "/dashboard/manage-products", label: "Products" },
    { path: "/dashboard/manage-orders", label: "Orders" },
  ];

  const userDropDownMenus = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/dashboard/orders", label: "My orders" },
    { path: "/dashboard/profile", label: "Profile" },
    { path: "/order-summary", label: "Checkout" },
    { path: "/dashboard/reviews", label: "Reviews" },
  ];

  const dropDownMenus =
    user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];

  // Logout
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Handle clicks outside dropdown
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        SetIsDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md text-gray-700 "
          : "bg-blend-saturation text-gray-700 "
      }`}
    >
      <nav className="flex items-center justify-between px-10 py-4 max-w-full">
        <div className="flex items-center">
          <Link to="/">
            <img src="/sambhaar.png" alt="Logo" className="h-8 md:h-12 " />
          </Link>
        </div>

        <div className="flex items-center justify-between space-x-6">
          <div className="hidden md:flex space-x-6">
            <Link to="/shop" className="hover:text-primary hover:font-medium">
              Products
            </Link>
            <Link to="/about" className="hover:text-primary hover:font-medium">
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-primary hover:font-medium"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-4 items-center">
              <span>
                <Link className="hover:text-primary" to="/search">
                  <i className="ri-search-line ri-lg "></i>
                </Link>
              </span>

              <span>
                {user ? (
                  <>
                    <img
                      onClick={
                        isDropDownOpen
                          ? handleProfileClick
                          : handleDropDownToggle
                      }
                      src={user.profileImage}
                      alt="User Avatar"
                      className="size-10 rounded-full cursor-pointer"
                    />
                    {isDropDownOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-10 mt-1 p-4 w-48 bg-white border border-gray-200 rounded-md shadow-2xl z-50"
                      >
                        <ul className="font-medium space-y-4 p-2">
                          {dropDownMenus.map((menu, index) => (
                            <li key={index}>
                              <Link
                                onClick={handleProfileClick}
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
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
