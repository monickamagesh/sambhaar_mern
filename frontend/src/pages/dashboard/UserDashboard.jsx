import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/dashboard/orders", label: "My orders" },
  { path: "/dashboard/profile", label: "Profile" },
  { path: "/dashboard/reviews", label: "Reviews" },
];

const UserDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.error("Failed to log out", error)
        }
        
    }

  return (
    <div className=" space-y-5  bg-white p-8 flex flex-col justify-between h-[88%]">
      <div>
        
        <ul className="space-y-5 pt-5 ">
          {navItems.map((item) => (
            <li key={item.path} >
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-primary font-bold" : "text-black hover:text-primary"
                }
                end
                to={item.path}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="text-black hover:text-primary"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
