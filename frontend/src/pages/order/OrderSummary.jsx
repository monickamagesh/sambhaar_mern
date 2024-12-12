import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import phonepe from "../../assets/phonepe.png";
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

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

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
      MUID: "MUIDW" + Date.now() + user._id,
      transaction: "T" + Date.now() + user._id,
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
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4 mt-4">
                  Choose Payement Method:
                </h2>
                <div className="my-5 space-y-4  flex flex-col">
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
                </div>
              </div>
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
