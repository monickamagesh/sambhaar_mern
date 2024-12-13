import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBaseUrl } from "../../util/baseURL";
import TimelineStep from "../../components/orders/TimelineSteps";
import Footer from "../../components/Footer";
import Products from "../../components/shop/Products";

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const query = new URLSearchParams(window.location.search);
  const orderId = query.get("id");

  useEffect(() => {
    if (user && orderId) {
      fetch(`${getBaseUrl()}/api/orders/order-success/${orderId}`)
        .then((res) => res.json())
        .then((data) => setOrder(data.order))
        .catch((err) => console.error("Error fetching order details", err));
    }
  }, [user, orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const isCompleted = (status) => {
    const statuses = ["Ordered", "Processing", "Shipped", "Completed"];
    return statuses.indexOf(status) <= statuses.indexOf(order.orderStatus);
  };

  const isCurrent = (status) => order.orderStatus === status;

  const steps = [
    {
      status: "Ordered",
      label: "Ordered",
      description: "Your order has been created and is awaiting processing.",
      icon: {
        iconName: "time-line",
        bgColor: "primary",
        textColor: "gray-800",
      },
    },
    {
      status: "Processing",
      label: "Processing",
      description: "Your order is currently being processed.",
      icon: {
        iconName: "loader-line",
        bgColor: "yellow-800",
        textColor: "yellow-800",
      },
    },
    {
      status: "Shipped",
      label: "Shipped",
      description: "Your order has been shipped and will reach you shortly.",
      icon: {
        iconName: "truck-line",
        bgColor: "blue-800",
        textColor: "blue-800",
      },
    },
    {
      status: "Completed",
      label: "Completed",
      description: "Your order has been successfully completed.",
      icon: {
        iconName: "check-line",
        bgColor: "green-800",
        textColor: "green-900",
      },
    },
  ];

  return (
    <section className="md:p-6  bg-gray-100 min-h-screen">
      <div className="rounded p-2 sm:p-6 section__container bg-white shadow-lg">
        <div className="mt-10 mx-auto sm:mx-0 sm:ml-14">
          <h2 className="text-2xl font-bold mb-6">Your order is successfully {order?.orderStatus}</h2>

          <div className="flex flex-col md:flex-row justify-evenly items-center mb-10">
            <div className="flex space-x-2 mb-4 md:mb-0">
              <h2 className="text-lg font-semibold">Order Status :</h2>
              <div className="inline-block px-4 py-1 bg-yellow-200 text-yellow-800 text-sm font-medium rounded">
                {order?.orderStatus}
              </div>
            </div>
            <div className="flex space-x-2">
              <h2 className="text-lg font-semibold">Payment Status :</h2>
              <div className="inline-block px-4 py-1 bg-green-200 text-green-800 text-sm font-medium rounded">
                {order?.paymentStatus}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 w-full md:w-[80%] justify-center mx-auto">
          <div className="bg-white p-4 py-6 flex flex-col gap-2 rounded shadow">
            <h3 className="text-sm text-gray-600">Order Number</h3>
            <p className="text-base truncate font-semibold text-gray-800">{order?.orderId}</p>
          </div>
          <div className="bg-white p-4 py-6 flex flex-col gap-2 rounded shadow">
            <h3 className="text-sm text-gray-600">Date</h3>
            <p className="text-base font-semibold text-gray-800">
              {new Date(order?.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-white p-4 py-6 flex flex-col gap-2 rounded shadow">
            <h3 className="text-sm text-gray-600">Total</h3>
            <p className="text-base font-semibold text-gray-800">₹{" "}{order?.amount}</p>
          </div>
          <div className="bg-white p-4 py-6 flex flex-col gap-2 rounded shadow">
            <h3 className="text-sm text-gray-600">Payment Method</h3>
            <p className="text-base font-semibold text-gray-800">{order.paymentMethod}</p>
          </div>
        </div>

        <ol className="xl:flex items-center mb-10 relative justify-center">
          {steps.map((step, index) => (
            <TimelineStep
              order={order}
              key={index}
              step={step}
              isCompleted={isCompleted(step.status)}
              isCurrent={isCurrent(step.status)}
              isLastStep={index === steps.length - 1}
              icon={step.icon}
              description={step.description}
            />
          ))}
        </ol>

        <div className="border-y py-2 text-sm">
          <div className="border-y mt-1 py-2">
            <div className="flex space-x-2">
              <h2 className="text-lg font-semibold">Total :</h2>
              <div className="inline-block px-4 py-1 bg-gray-300 text-black text-sm font-medium rounded">
                ₹{" "}{order?.amount}
              </div>
            </div>
          </div>

          {/* Order Items Section */}
          <div className="mt-6 p-6 flex justify-center">
            <table className="w-full md:w-[80%]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left text-sm font-semibold text-gray-800 py-2 px-4">Image</th>
                  <th className="text-left text-sm font-semibold text-gray-800 py-2 px-4">Item</th>
                  <th className="text-left text-sm font-semibold text-gray-800 py-2 px-4">Brand</th>
                  <th className="text-left text-sm font-semibold text-gray-800 py-2 px-4">Quantity</th>
                  <th className="text-left text-sm font-semibold text-gray-800 py-2 px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-cover mb-2"
                      />
                    </td>
                    <td className="text-sm text-gray-600 py-2 px-4">{product.name}</td>
                    <td className="text-sm text-gray-600 py-2 px-4">{product.brand}</td>
                    <td className="text-sm text-gray-600 py-2 px-4">{product.quantity}</td>
                    <td className="text-sm text-gray-600 py-2 px-4">₹{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-20 text-xl font-bold ml-10">Continue Shopping</div>
      <Products />
      <Footer />
    </section>
  );
};

export default OrderSuccess;
