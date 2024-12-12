import React from "react";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";

const navItems = [
  { path: "/dashboard/admin", label: "Dashboard" },
  { path: "/dashboard/profile", label: "My Profile" },
  { path: "/dashboard/orders", label: "My orders" },
  { path: "/dashboard/users", label: "Users" },
  { path: "/dashboard/manage-categories", label: "Categories" },
  { path: "/dashboard/manage-products", label: "Products" },
  { path: "/dashboard/manage-milks", label: "Milks" },
  { path: "/dashboard/manage-orders", label: "Orders" },
];

const AdminDashboard = ({ toggleSidebar }) => {  // Accepting the toggleSidebar function as a prop
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleLinkClick = () => {
    if (toggleSidebar) {
      toggleSidebar(); // Close the sidebar on mobile when a link is clicked
    }
  };

  return (
    <div className="space-y-5 bg-white p-8 flex flex-col justify-between h-[88%]">
      <div>
        <ul className="space-y-5 pt-5">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary font-bold" : "text-black hover:text-primary"
                }
                end
                to={item.path}
                onClick={handleLinkClick}  // Close the sidebar when a link is clicked
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <hr className="mb-3" />
        <button onClick={handleLogout} className="text-black hover:text-primary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
