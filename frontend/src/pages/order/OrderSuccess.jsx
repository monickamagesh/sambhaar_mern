import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const OrderSuccess = () => {
  {
    /* 
    const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${user._id}`);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [user]);
  */
  }

  return (
    <div>
      <h2 className="pt-40">Your Orders</h2>
      {/* {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.orderId}>
              <p>Order ID: {order.orderId}</p>
              <p>Status: {order.status}</p>
              <p>Amount: ${order.amount}</p>
              <p>Products:</p>
              <ul>
                {order.products.map((product, index) => (
                  <li key={index}>
                    Product ID: {product.productId}, Quantity: {product.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default OrderSuccess;
