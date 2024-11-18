import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cart/cartSlice";
import { getBaseUrl } from "../../util/baseURL";
import Footer from "../../components/Footer";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.cart.products);
  const { user } = useSelector((state) => state.auth);
  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector(
    (store) => store.cart
  );

  const [paymentMethod, setPaymentMethod] = useState("phonepe");
  const [loading, setLoading] = useState(false);

  const handleQuantity = (type, id) => {
    dispatch(updateQuantity({ type, id }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const makePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      user: user,
      products: products,
      selectedItems: selectedItems,
      GrandTotal: grandTotal.toFixed(2),
      MUID: "MUIDW" + Date.now(),
      transaction: "T" + Date.now(),
      paymentMethod: paymentMethod,
    };

    try {
      if (paymentMethod === "phonepe") {
        const response = await axios.post(
          `${getBaseUrl()}/api/orders/create-checkout-session`,
          data
        );
        const redirectUrl =
          response.data?.data?.instrumentResponse?.redirectInfo?.url;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          console.error("Redirect URL not found in response", response.data);
        }
      } else if (paymentMethod === "cod") {
        const response = await axios.post(
          `${getBaseUrl()}/api/orders/create-cod-order`,
          data
        );
        const redirectUrl = response.data.redirectUrl;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          console.log("Redirect url not found in response");
        }
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-100 p-6">
      <div className=" mx-auto bg-white shadow-lg rounded-lg p-6">
        {products.length === 0 ? (
          <div className="text-center text-lg font-bold">
            Your cart is empty.
          </div>
        ) : (
          <div className="space-y-6 justify-center ">
            {products.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-8 bg-gray-50 shadow-md rounded-md p-4 px-10"
              >
                <span className="text-sm font-medium text-white bg-primary  px-2 py-1 rounded-full">
                  0{index + 1}
                </span>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover mx-4"
                />
                <div className="flex-1">
                  <h5 className="text-lg font-semibold">{item.name}</h5>
                  <p className="text-primary font-semibold text-sm">
                    ₹{item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {item.quantity} x 1 lb
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <p className=" font-semibold text-lg">
                    ₹{item.price.toFixed(2) * item.quantity}
                  </p>
                  <button
                    onClick={() => handleQuantity("decrement", item._id)}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantity("increment", item._id)}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <i className="ri-close-fill ri-lg"></i>
                  </button>
                </div>
              </div>
            ))}

            <div className="p-6 mt-6 bg-white w-full  shadow-xl rounded-md">
              <h2 className="text-xl font-semibold mb-4 mt-4">
                Choose Payement Method:
              </h2>
              <div className="my-5 space-y-4 grid grid-cols-2">
                <div className="grid gap-4  grid-cols-3">
                  <div
                    value="phonepe"
                    
                    className="bg-white shadow-md w-56 rounded-lg p-4 border-b-4 border-primary items-center justify-center flex flex-col hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    <p className="text-xl font-bold ">PhonePe</p>
                    <h2 className="text-lg font-semibold mb-2">
                      Online Payement
                    </h2>
                  </div>
                  <div
                    value="cash"
                    className="bg-white shadow-md w-56 rounded-lg p-4 border-b-4 border-primary items-center justify-center flex flex-col hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    <h2 className="text-lg font-semibold mb-2">
                      Cash on Delivery
                    </h2>
                    <p className="text-xl font-bold"> Cash </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 justify-end">
                  <div className="bg-white shadow-md rounded-lg p-6 border border-[#ff1a1a] ">
                    <div className="text-gray-700 flex justify-between">
                      <span className="font-semibold  text-medium">
                        Selected Items
                      </span>
                      <span className="font-semibold text-lg text-primary">
                        {selectedItems}
                      </span>
                    </div>
                    <div className="text-gray-700 flex justify-between">
                      <span className="font-semibold  text-medium">
                        Total Price
                      </span>
                      <span className="font-semibold text-lg text-primary">
                        ₹ {totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-gray-700 flex justify-between">
                      <span className="font-semibold  text-medium">
                        Tax ({taxRate * 100}%)
                      </span>
                      <span className="font-semibold text-lg text-primary">
                        ₹ {tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-gray-700 flex justify-between">
                      <span className="font-semibold  text-medium">
                        Grand Total
                      </span>
                      <span className="font-semibold text-lg text-primary">
                        ₹ {grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center  items-center gap-8">
              <button
                
                className="border-primary text-sm font-semibold px-4 py-3.5  border rounded-full text-primary"
              >
                Clear Cart
              </button>
              {products.length > 0 && (
                <div className="">
                  <div
                    
                    
                    className=" flex justify-between w-[240px] items-center bg-primary hover:bg-primary-dark text-sm font-semibold text-white py-1 px-1 pl-8 rounded-full  transition"
                  >
                    {loading ? "Processing..." : "Proceed to Pay"}
                    <p className="bg-white  text-sm font-semibold px-4 py-3.5  flex justify-center rounded-full  text-primary">
                      ₹ {grandTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Payment method selection */}
      <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              Choose Payment Method:
            </h3>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                value="phonepe"
                checked={paymentMethod === "phonepe"}
                onChange={() => setPaymentMethod("phonepe")}
                className="mr-2"
              />
              PhonePe
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="mr-2"
              />
              Cash on Delivery (COD)
            </label>
          </div>

          {/* Clear cart and proceed buttons */}
          <button
            onClick={handleClearCart}
            className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md mb-4"
          >
            Clear Cart
          </button>
          <button
            onClick={makePayment}
            disabled={loading}
            className="bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md"
          >
            Proceed to Payment
          </button>
      <Footer />
    </div>
  );
};

export default OrderSummary;
