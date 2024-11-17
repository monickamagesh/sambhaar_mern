import React from "react";
import { useSelector } from "react-redux";
import { useGetAdminStatsQuery } from "../../../../redux/features/stats/statsApi";
import AdminStats from "./AdminStats";
import AdminStatsChart from "./AdminStatsChart";
import UserDMain from "../../user/dashboard/UserDMain";

const AdminDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetAdminStatsQuery();
  if (isLoading) return <div>Loading...</div>;
  if (!stats) return <div>No stats found</div>;
  if (error) return <div>Failed to load stats!</div>;
  return (
    <div className="">
      <div>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-500">
          Hi, {user?.username}! Welcome to the admin dashboard.
        </p>

        <div className="p-6 mt-6 bg-white w-full  shadow-xl rounded-md">
        <AdminStats stats={stats} />
        <AdminStatsChart stats={stats} className="" />
        
        </div>

        
        

        <div className="p-6 mt-6 bg-white w-full  shadow-xl rounded-md">
          <h2 className="text-xl font-bold mb-4 mt-4">Order Summary</h2>
          <div className="my-5 space-y-4">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
              <div className="bg-white shadow-md rounded-lg p-6 border-b-4 border-[#ff1a1a] hover:scale-105 transition-all duration-200 cursor-pointer">
                <h2 className="text-lg font-semibold mb-2">Total Ordered</h2>
                <p className="text-xl font-bold ">{stats?.totalOrdered}</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 border-b-4  border-[#d9ff00] hover:scale-105 transition-all duration-200 cursor-pointer">
                <h2 className="text-lg font-semibold mb-2">Total Processing</h2>
                <p className="text-xl font-bold">{stats?.totalProcessing}</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 border-b-4 border-[#ffa200] hover:scale-105 transition-all duration-200 cursor-pointer">
                <h2 className="text-lg font-semibold mb-2">Total Shipped</h2>
                <p className="text-xl font-bold">{stats?.totalShipped}</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6 border-b-4 border-[#ffd000]  hover:scale-105 transition-all duration-200 cursor-pointer">
                <h2 className="text-lg font-semibold mb-2">Total Completed</h2>
                <p className="text-xl font-bold">{stats?.totalCompleted}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <UserDMain />
        </div>
      </div>
    </div>
  );
};

export default AdminDMain;
