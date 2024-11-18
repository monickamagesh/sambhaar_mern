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
    return <div>Loading</div>;
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

  if (!order) {
    return <p>Loading order details...</p>;
  }

  
  return (
    <section className=" ">
      <div className="rounded p-6 section__container">
      <div className="mt-10 ml-14">
        <h2 className="text-2xl font-bold mb-4">
          Payment {order.paymentStatus}
        </h2>
        <p className="mb-4">Order Id: {order?.orderId}</p>
        <p className="mb-8">Status: {order?.orderStatus}</p>
      </div>

      <ol className="sm:flex items-center relative justify-center">
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
      </div>
      
      <div className="mt-20 text-xl font-bold ml-10">Continue Shopping</div>
      <Products />
      <Footer />
    </section>
  );
};

export default OrderSuccess;
