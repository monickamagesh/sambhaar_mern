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
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const newErrors = {};

    // Validate phone number
    const trimmedPhoneNumber = phoneNumber.trim();
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(trimmedPhoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
    }

    // Validate address fields
    const trimmedAddress = {
      street: address.street.trim(),
      city: address.city.trim(),
      state: address.state.trim(),
      postalCode: address.postalCode.trim(),
      country: address.country.trim(),
    };
    if (!trimmedAddress.street) {
      newErrors.street = "Street is required.";
    }
    if (!trimmedAddress.city) {
      newErrors.city = "City is required.";
    }
    if (!trimmedAddress.state) {
      newErrors.state = "State is required.";
    }
    if (!trimmedAddress.postalCode) {
      newErrors.postalCode = "Postal code is required.";
    } else if (!/^[0-9]{6}$/.test(trimmedAddress.postalCode)) {
      newErrors.postalCode = "Postal code must be a 6-digit number.";
    }
    if (!trimmedAddress.country) {
      newErrors.country = "Country is required.";
    }

    setErrors(newErrors);

    // Return false if there are any errors
    return Object.keys(newErrors).length === 0;
  };

  const makePayment = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    setLoading(true);

    const data = {
      user: user,
      products: products,
      selectedItems: selectedItems,
      GrandTotal: grandTotal.toFixed(2),
      MUID: "MUIDW" + Date.now() + user._id,
      transaction: "T" + Date.now() + user._id,
      paymentMethod: paymentMethod,
      address,
      phoneNumber: phoneNumber.trim(),
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
          console.log("Redirect URL not found in response");
        }
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-100">
      <div className="mx-auto p-6 mt-10">
        {products.length === 0 ? (
          <div className="text-center text-lg font-bold">
            Your cart is empty.
          </div>
        ) : (
          <div className="mt-10 flex justify-center flex-col md:flex-row gap-6">
            <div className="w-full md:w-[60%]">
              <div className="w-full">
                <h2 className=" text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
                  Shipping Information
                </h2>
                <form onSubmit={makePayment}>
                  {/* Contact */}
                  <div className="space-y-4 bg-white p-4 md:p-6 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-4">
                      <span>
                        <i className="ri-number-1 rounded-full bg-primary text-white p-2 mr-4"></i>
                      </span>
                      Contact Number
                    </h2>
                    <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
                      <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                    )}
                  </div>
                  {/* Address */}
                  <div className="space-y-4 my-4 md:my-10 bg-white p-4 md:p-6 rounded shadow-md">
                    <h2 className="text-lg font-semibold mb-4">
                      <span>
                        <i className="ri-number-2 rounded-full bg-primary text-white p-2 mr-4"></i>
                      </span>
                      Address
                    </h2>
                    <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
                      <input
                        type="text"
                        name="street"
                        placeholder="Flat/House no, Street"
                        className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
                        value={address.street}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {errors.street && (
                      <p className="text-red-500 text-sm">{errors.street}</p>
                    )}

                    <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
                        value={address.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}

                    <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
                        value={address.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {errors.state && (
                      <p className="text-red-500 text-sm">{errors.state}</p>
                    )}

                    <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
                        value={address.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm">{errors.postalCode}</p>
                    )}

                    <div className="flex items-center border border-gray-300 rounded-md px-2 sm:px-4 pt-2 shadow-sm">
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        className="w-full px-2 sm:px-4 py-2 bg-transparent outline-none"
                        value={address.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {errors.country && (
                      <p className="text-red-500 text-sm">{errors.country}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <div className="w-full md:w-1/4 mt-2 sm:mt-4 lg:mt-12">
              {products.map((item, index) => (
                <div key={index} className="flex justify-between p-2 pb-4">
                  <div className="flex flex-col">
                    <p className="text-gray-600 text-sm">
                      <span className="text-gray-900 font-semibold">
                        {item.quantity}
                      </span>{" "}
                      x {item.name} | {item.weight}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-y py-2 text-sm">
                <div className="flex justify-between p-2">
                  <div className="flex flex-col text-gray-600">Sub Total</div>
                  <div className="flex text-gray-600">
                    ₹ {totalPrice.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between px-2">
                  <div className="flex flex-col text-gray-600">Tax</div>
                  <div className="flex items-end text-gray-600">
                    ₹ {tax.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="border-y mt-1 py-2">
                <div className="flex justify-between p-2">
                  <div className="flex flex-col text-gray-900 font-semibold">
                    Total
                  </div>
                  <div className="flex items-end text-gray-900 font-semibold">
                    ₹ {grandTotal.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex justify-center flex-col pt-4 items-center gap-8">
                <div className="bg-white rounded-sm w-full p-6">
                  <div className="flex flex-col text-gray-900 font-semibold">
                    Select Payment Method
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
