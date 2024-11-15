import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />;
      case "user":
        return <UserDashboard />;

      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <div className=" container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start">
      <header className="fixed top-0 z-50 lg:w-1/5 sm:w-2/5 w-full border ">
        {renderDashboard()}
      </header>
      <section className="lg:w-1/5 sm:w-2/5 w-full"></section>
      <main className="p-8 bg-white w-3/4 border mt-5">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
