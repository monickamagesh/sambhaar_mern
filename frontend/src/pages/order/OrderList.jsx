import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getBaseUrl } from "../../util/baseURL";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        setLoading(true); // Set loading state
        try {
          const response = await axios.get(
            `${getBaseUrl()}/api/orders/ordered-products/${user._id}`
          );
          setOrders(response.data.orders);
        } catch (error) {
          setError("Error fetching orders");
          console.error("Error confirming payment", error);
        } finally {
          setLoading(false); // Stop loading when done
        }
      };
      fetchOrders();
    }
  }, [user]); // Runs only when the user changes

  useEffect(() => {
    console.log(orders); // Logs orders whenever the state changes
  }, [orders]);

  return (
    <section className="section__container rounded p-6">
      <h2>Order List</h2>
      
      {loading && <p>Loading orders...</p>}
      {error && <p>{error}</p>}
      
      <ul>
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order._id}>
              <p>Order ID: {order._id}</p>
              {/* Add more order details as needed */}
            </li>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </ul>
    </section>
  );
};

export default OrderList;
