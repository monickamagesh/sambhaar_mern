import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import phonepe from "../../assets/phonepe.png";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cart/cartSlice";
import Footer from "../../components/Footer";
import { getBaseUrl } from "../../util/baseURL";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.cart.products);
  const { user } = useSelector((state) => state.auth);
  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector(
    (store) => store.cart
  );

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const makePayment = async (e) => {
    e.preventDefault();

    
    if (!user && !email) {
      alert("Please provide your email to proceed with the payment.");
      return;
    }

    setLoading(true);

    const _id = Date.now();

    const data = {
      user: user || { email , _id},
      products: products,
      selectedItems: selectedItems,
      GrandTotal: grandTotal.toFixed(2),
      MUID: "MUIDW" + Date.now(),
      transaction: "SKU" + Date.now(),
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
    <div className="min-h-screen mt-20 bg-gray-100 ">
      <div className=" mx-auto p-6 ">
        {products.length === 0 ? (
          <div className="text-center text-lg font-bold">
            Your cart is empty.
          </div>
        ) : (
          <div className="space-y-6 flex mx-10 justify-center ">
            <div className="flex w-2/3 ">
              <div className="w-full"></div>
            </div>

            <div className="w-1/4">
              {products.map((item, index) => (
                <div key={index} className="flex justify-between   p-2 pb-4">
                  <div className="flex flex-col  ">
                    <p className="text-gray-600 text-sm">
                      <span className="text-gray-900 font-semibold">
                        {item.quantity}
                      </span>{" "}
                      x {item.name} | {item.weight}
                    </p>
                  </div>
                  <div className="">
                    <p className="  text-sm">
                      ₹{item.price.toFixed(2) * item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <div className=" border-y py-2 text-sm">
                <div className="flex justify-between   p-2">
                  <div className="flex flex-col  text-gray-600">Sub Total</div>
                  <div className="flex  text-gray-600 ">
                    ₹ {totalPrice.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between  px-2">
                  <div className="flex flex-col text-gray-600 ">Tax</div>
                  <div className="flex items-end  text-gray-600">
                    ₹ {tax.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className=" border-y mt-1 py-2">
                <div className="flex justify-between p-2">
                  <div className="flex flex-col  text-gray-900 font-semibold ">
                    Total
                  </div>
                  <div className="flex items-end  text-gray-900 font-semibold ">
                    ₹ {grandTotal.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Email input for non-logged-in users */}
              {!user && (
                <div className="pt-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Enter Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="Your email"
                    required
                  />
                </div>
              )}

              <div className="flex justify-center flex-col pt-4 items-center gap-8">
                <div className="bg-white rounded-sm w-full p-6">
                  <div className="flex flex-col  text-gray-900 font-semibold ">
                    Choose Payment Method
                  </div>

                  <div className="flex mt-4 justify-between">
                    <div
                      onClick={() => setPaymentMethod("phonepe")}
                      className={`bg-white border p-2 rounded-sm cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                        paymentMethod === "phonepe"
                          ? "bg-primary border-primary"
                          : ""
                      }`}
                    >
                      <div className="flex w-20 h-20 justify-center items-center">
                        <img
                          src={phonepe}
                          alt="phonepe"
                          className="h-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {products.length > 0 && (
                  <button
                    onClick={makePayment}
                    disabled={loading}
                    className="bg-primary w-full px-3 py-3 text-white mt-2 rounded-md"
                  >
                    {loading ? "Processing..." : "Proceed to Pay"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrderSummary;
