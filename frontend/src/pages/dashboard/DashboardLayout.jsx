import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage the hamburger menu toggle

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard toggleSidebar={toggleSidebar} />; // Pass toggleSidebar as prop
      case "user":
        return <UserDashboard />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  // Function to toggle the sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="mx-auto pt-20">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Hamburger Menu for Mobile */}
        <header className="fixed top-20 left-0 p-4 z-50 w-full">
          <button onClick={toggleSidebar} className="text-black">
            <span className="block w-3 h-1 bg-black mb-1"></span>
            <span className="block w-4 h-1 bg-black mb-1"></span>
            <span className="block w-5 h-1 bg-black"></span>
          </button>
        </header>

        {/* Sidebar for Mobile */}
        <aside
          className={`fixed top-20 left-0 z-40 w-4/5 sm:w-1/4 h-screen bg-white p-4 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {renderDashboard()}
        </aside>

        {/* Main Content for Mobile */}
        <main className="p-8 bg-white w-full mt-20 md:ml-0" style={{paddingTop: '50px'}}>
          <Outlet />
        </main>
      </div>

      {/* Default Layout for Tablet, Desktop, and Larger Screens */}
      <div className="hidden md:flex flex-row gap-4 items-start justify-start">
        {/* Sidebar for Desktop */}
        <header className="fixed top-20 p-8 z-40 w-[20%] h-screen">
          {renderDashboard()}
        </header>

        <section className="lg:w-1/5 sm:w-2/5 h-screen w-full"></section>

        {/* Main Content */}
        <main className="p-8 bg-white w-3/4 border mt-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
