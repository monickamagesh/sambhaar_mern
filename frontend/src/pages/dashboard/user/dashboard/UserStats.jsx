import React from "react";

const UserStats = ({ stats }) => {
  return (
    <div className="my-2 space-y-2">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        <div className="bg-white shadow-md rounded-lg p-6 border-b-4 border-[#ffa200] hover:scale-105 transition-all duration-200 cursor-pointer">
          <h2 className="text-lg font-semibold mb-2">Total Payments</h2>
          <p className="text-xl font-bold">₹ {stats?.totalPayments}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border-b-4   border-[#d9ff00] hover:scale-105 transition-all duration-200 cursor-pointer">
          <h2 className="text-lg font-semibold mb-2">Total Reviews</h2>
          <p className="text-xl font-bold ">{stats?.totalReviews}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border-b-4 border-[#ff1a1a] hover:scale-105 transition-all duration-200 cursor-pointer">
          <h2 className="text-lg font-semibold mb-2">
            Total Purchased Products
          </h2>
          <p className="text-xl font-bold">{stats?.totalPurchasedProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
