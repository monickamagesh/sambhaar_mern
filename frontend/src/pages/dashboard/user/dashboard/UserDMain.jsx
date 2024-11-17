import React from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetUserStatsQuery } from "../../../../redux/features/stats/statsApi";
import UserStats from "./UserStats";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);
  console.log(stats);
  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (!stats) {
    return <div className="text-center text-gray-500">No data available.</div>;
  }

  const data = {
    labels: ["Total Payments", "Total Reviews", "Total Purchased Products"],
    datasets: [
      {
        label: "User Stats",
        data: [
          stats.totalPayments,
          stats.totalReviews * 100,
          stats.totalPurchasedProducts * 100,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="  ">
      <div>
        <h1 className="text-2xl font-bold mb-2">User Dashboard</h1>
        <p className="text-gray-500">
          Hi, {user?.username}! Welcome to your user dashboard
        </p>
      </div>
      <div className="p-6 mt-6 bg-white w-full  shadow-xl rounded-md">
        <UserStats stats={stats} />
        <div className="mb-6">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default UserDMain;
