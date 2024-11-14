import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBaseUrl } from "../../util/baseURL";

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const query = new URLSearchParams(window.location.search);
  const orderId = query.get('id');

  useEffect(() => {
    if (user && orderId) {
      fetch(`${getBaseUrl()}/api/orders/order-success/${orderId}`)
        .then((res) => res.json())
        .then((data) => setOrder(data.order))
        .catch((err) => console.error("Error fetching order details", err));
    }
  }, [user, orderId]);

  
  const isCompleted = (status) => {
    const statuses = ["Ordered", "Processing", "Shipped", "Completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status) => order.status === status;

  const steps = [
    {
      status: "Ordered",
      label: "Ordered",
      description: "Your order has been created and is awaiting processing.",
      icon: {
        iconName: "time-line",
        bgColor: "red-500",
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
      description: "Your order has been shipped.",
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

  if (!order) {
    return <p>Loading order details...</p>;
  }

  return (
    <section className="section__container rounded p-6">
      <h2>Payment {order.orderStatus}</h2>

      
    </section>
  );
};

export default OrderSuccess;
