import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetOrdersByEmailQuery } from "../../../redux/features/orders/orderApi";


const UserOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    data: orderdata,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user?.email);
  const orders = orderdata?.orders;
  console.log(orders);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>No order found!</div>;
  return (
    <section className="py-1 bg-blueGray-50">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-md rounded">
        <div className=" mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h2 className="text-2xl font-bold mb-2">Your Orders</h2>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-primary text-white active:bg-primary-dark text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border border-gray-200 ">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  ID
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Date
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Payment
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Payment mode
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900 flex justify-center items-center"
                >
                  View order
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {orders &&
                [...orders]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort orders by date descending
                  .map((order, index) => (
                    <tr className="hover:bg-gray-50" key={index}>
                      <th className="px-6 py-4 font-normal ">
                        #ID:{index + 1}
                      </th>
                      <td className="px-6 py-4">{order?.orderId}</td>
                      <td className="px-6 py-4">
                        {new Date(order?.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-lg ${
                            order?.orderStatus === "Completed"
                              ? "bg-green-50 text-green-600"
                              : order?.orderStatus === "Ordered"
                              ? "bg-red-50 text-red-600"
                              : order?.orderStatus === "Processing"
                              ? "bg-yellow-50 text-yellow-600"
                              : order?.orderStatus === "Shipped"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-indigo-50 text-indigo-600"
                          } px-2 py-1 text-xs font-semibold`}
                        >
                          {order?.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-lg ${
                            order?.paymentStatus === "Success"
                              ? "bg-green-50 text-green-600"
                              : order?.paymentStatus === "Pending"
                              ? "bg-indigo-50 text-indigo-600"
                              : "bg-red-50 text-red-600"
                          } px-2 py-1 text-xs font-semibold`}
                        >
                          {order?.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">{order?.paymentMethod}</td>
                      <td className="px-6 py-4">₹ {order?.amount}</td>
                      <td className="px-6 py-4">
                        <div className=" gap-4 flex justify-center items-center">
                          <Link
                            to={`/order-success?id=${order?.orderId}`}
                            className=" hover:text-primary-dark text-primary"
                          >
                            <i className="ri-eye-line ri-lg"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </section>
  );
};

export default UserOrders;
