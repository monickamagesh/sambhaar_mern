import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../../redux/features/orders/orderApi";
import { formatDate } from "../../../../util/formatDate";
import UpdateOrderModal from "./UpdateOrderModel";

const ManageOrders = () => {
  const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  console.log(orders);
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteOder = async (orderId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this order?"
      );
      if (confirmDelete) {
        await deleteOrder(orderId).unwrap();
        alert("Order deleted successfully");
        await refetch();
      }
    } catch (error) {
      console.error("Failed to delete order:", err);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength) + "...";
    return truncated;
  };

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>Something went wrong!</div>;

  return (
    <>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h2 className="text-2xl font-bold mb-4 px-4">
                    Manage Orders
                  </h2>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Order Id
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Customer
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Payment
                    </th>

                    <th className="px-6 py-4 font-medium text-gray-900">
                      Mode
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {orders &&
                    orders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-normal">
                          {order?.orderId}
                        </td>
                        <td className="px-6 py-4 font-normal">
                          {truncateText(order?.email, 15)}
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
                          <button
                            className="text-gray-500 hover:text-gray-900"
                            onClick={() => handleEditOrder(order)}
                          >
                            <i className="ri-edit-box-line "></i>
                          </button>
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
                        <td className="px-6 py-4 font-normal">
                          {order?.paymentMethod}
                        </td>
                        <td className="px-6 py-4 font-normal">
                          {formatDate(order?.updatedAt)}
                        </td>
                        <td className="px-6 py-4 space-x-2 cursor-pointer hover:text-primary">
                          <Link
                            to={`/order-success?id=${order?.orderId}`}
                            className="text-gray-700 hover:text-gray-900"
                          >
                            <i className="ri-eye-line ri-lg"></i>
                          </Link>

                          <button
                            className="hover:text-primary-dark text-primary"
                            onClick={() => handleDeleteOder(order?._id)}
                          >
                            <i className="ri-delete-bin-line ri-lg"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* update order modal */}
      {selectedOrder && (
        <UpdateOrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ManageOrders;
