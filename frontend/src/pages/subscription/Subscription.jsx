import React, { useState } from "react";
import { useFetchAllMilksQuery } from "../../redux/features/milks/milksApi";

const Subscription = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState(); // Default selected duration
    const [startDate, setStartDate] = useState(""); // Calendar picker date
    const [userDetails, setUserDetails] = useState({
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
  
    const { data, error, isLoading } = useFetchAllMilksQuery();
    console.log(data)

    const handleAddMilk = (milk) => {
      setSubscriptions((prev) => {
        const existing = prev.find((item) => item.milkId === milk._id);
        if (existing) {
          return prev.map((item) =>
            item.milkId === milk._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [
          ...prev,
          {
            milkId: milk._id,
            quantity: 1,
            name: milk.name,
            category: milk.category,
            price: milk.price,
            weight: milk.weight,
            image: milk.image,
          },
        ];
      });
    };
  
    const handleIncrement = (milkId) => {
      setSubscriptions((prev) =>
        prev.map((item) =>
          item.milkId === milkId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    };
  
    const handleDecrement = (milkId) => {
      setSubscriptions((prev) =>
        prev
          .map((item) =>
            item.milkId === milkId
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    };
  
    const calculateAmountForDuration = (duration) => {
      const totalAmount = subscriptions.reduce(
        (total, milk) => total + milk.price * milk.quantity,
        0
      );
      return totalAmount * 30 * duration; // 30 days per month
    };
  
    // Form Validation
    const validateForm = () => {
      if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.street || !userDetails.city || !userDetails.state || !userDetails.postalCode || !userDetails.country) {
        alert("Please fill all the user details.");
        return false;
      }
  
      if (subscriptions.length === 0) {
        alert("Please add at least one milk option.");
        return false;
      }
  
      if (!selectedDuration) {
        alert("Please select a subscription duration.");
        return false;
      }
  
      if (!startDate) {
        alert("Please select a start date.");
        return false;
      }
  
      const selectedStartDate = new Date(startDate);
      if (selectedStartDate <= new Date()) {
        alert("Start date should be in the future.");
        return false;
      }
  
      return true;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent form from submitting
  
      // If all validations pass
      if (!validateForm()) {
        return; // Stop if validation fails
      }
  
      const subscriptionData = {
        ...userDetails,
        duration: selectedDuration,
        startDate: new Date(startDate),
        subscriptionId: `SUB-${Date.now()}`,
        milks: subscriptions,
        amount: calculateAmountForDuration(selectedDuration),
        subscriptionStatus: "Active",
        paymentMethod: "Cash",
        paymentStatus: "Pending",
      };
  
      console.log("Submitted Subscription:", subscriptionData);
  
      // Submit logic here (e.g., API call)
    };

  return (
    <section className="section__container">
      <section className="bg-primary-light py-12 text-center">
        <h2 className="section__header text-3xl font-bold text-gray-800 capitalize mb-4">
          Subscription
        </h2>
        <p className="section__subheader text-gray-600 max-w-xl mx-auto">
          Choose the perfect plan for you and enjoy our premium milk
          subscription services.
        </p>
      </section>

      {/* Milk options */}
      <div className="my-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          <span>
            <i className="ri-number-1 rounded-full bg-primary text-white p-2 mr-4"></i>
          </span>
          Add Your Fresh Milks
        </h2>
        <p className="text-center text-gray-600 mb-20">
          Add options that works best for you and your team.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {data?.milks.map((milk) => (
            <div
              key={milk._id}
              className="bg-white p-4 border rounded-lg shadow-md flex flex-col "
            >
              <div className="relative flex h-44 mt-2 w-auto sm:px-10 justify-end group overflow-hidden">
                <img
                  src={milk.image || "default-milk-image.png"}
                  alt={milk.name}
                  className="w-36 h-36 block object-contain product-image transform transition-transform duration-300 group-hover:scale-110"
                />
                {milk.category === "aavin" && (
                  <div className="absolute top-0 right-1 rounded-full bg-blue-950 px-2 text-xs font-semibold leading-6 text-light text-white">
                    Aavin
                  </div>
                )}
                {milk.category === "arokya" && (
                  <div className="absolute top-0 right-1 rounded-full bg-blue-950 px-2 text-xs font-semibold leading-6 text-light text-white">
                    Arokya
                  </div>
                )}
              </div>

              <header className="p-2 text-start md:px-4 md:py-2">
                <h3 className="mb-2 truncate text-md font-bold text-heading">
                  {milk.name}
                </h3>
                <p className="text-xs text-gray-500">{milk.weight}</p>

                <div className="flex items-center justify-between">
                  <div className="text-lg mt-4 items-center font-bold text-primary">
                    ₹{milk.price}
                  </div>
                  {subscriptions.some((item) => item.milkId === milk._id) ? (
                    <div className="mt-4 flex items-center justify-center text-sm font-semibold text-gray-50 bg-primary border rounded-full">
                      <button
                        onClick={() => handleDecrement(milk._id)}
                        className="pl-2 pr-2 py-2 rounded-l-full hover:bg-primary-dark"
                      >
                        -
                      </button>
                      <span className="px-4">
                        {subscriptions.find((item) => item.milkId === milk._id)
                          ?.quantity || 0}
                      </span>
                      <button
                        onClick={() => handleIncrement(milk._id)}
                        className="pl-2 pr-2 py-2 rounded-r-full hover:bg-primary-dark"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddMilk(milk)}
                      className="mt-4 flex items-center justify-center px-7 py-2 text-sm font-semibold text-primary border rounded-full hover:bg-primary transition duration-200 hover:text-gray-50"
                    >
                      Add
                    </button>
                  )}
                </div>
              </header>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Card Section */}
      <div className="flex flex-col my-36 ">
        <h2 className="text-3xl font-bold  text-center text-gray-800 mb-4">
          <span>
            <i className="ri-number-2 rounded-full bg-primary text-white p-2 mr-4"></i>
          </span>{" "}
          Choose Your Flexible Plan
        </h2>
        <p className="text-center text-gray-600 mb-20">
          Choose a plan to enjoy fresh milk delivered to your doorstep daily..
        </p>

        <div className="flex flex-col md:flex-row gap-6 ">
          {[1, 3, 6, 12].map((duration) => (
            <div
              key={duration}
              className={`flex flex-col relative hover: colo justify-between items-center p-6 rounded-lg shadow-lg w-full max-w-sm transition-transform duration-300 ${
                selectedDuration === duration
                  ? "border-primary bg-primary bg-opacity-5 border-2 scale-105"
                  : "border border-gray-300 bg-white"
              }`}
              onClick={() => setSelectedDuration(duration)}
            >
              {duration === 6 && (
                <span className="absolute top-4 right-4  bg-blue-900 text-white text-xs font-bold px-2 py-1 rounded-full mb-4 uppercase">
                  Popular
                </span>
              )}

              {duration === 1 && (
                <h3 className="text-xl font-bold mb-4">{duration} Month</h3>
              )}
              {duration != 1 && (
                <h3 className="text-xl font-bold mb-4">{duration} Months</h3>
              )}
              <p className="text-4xl font-bold mb-6">
                ₹{calculateAmountForDuration(duration)}
                <span className="text-lg font-medium"> / plan</span>
              </p>

              <p className="text-sm text-gray-500 mb-4">
                A plan that fits for {duration * 30} days.
              </p>
              <ul className="space-y-3 text-left mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-blue-900">✔</span> Morning Door Delivery
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-900">✔</span> Fresh Farm Milk
                  Guaranteed
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-900">✔</span> No Holidays -
                  Delivered 7 Days a Week
                </li>
              </ul>

              <button
                className={`py-2 px-6 rounded-full font-semibold transition-all ${
                  selectedDuration === duration
                    ? "bg-white text-gray-900 hover:bg-primary hover:text-white"
                    : "bg-primary text-white hover:bg-primary"
                }`}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout */}
      <div className="my-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          <span>
            <i className="ri-number-3 rounded-full bg-primary text-white p-2 mr-4"></i>
          </span>
          Checkout Subscription
        </h2>
        <p className="text-center text-gray-600 mb-20">
          Complete your details, make payment, and start enjoying our services!
        </p>
        <div>
          {/* user details */}
          <form className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
            {/* Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter your full name"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter your email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter your phone number"
                value={userDetails.phone}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phone: e.target.value })
                }
              />
            </div>

            {/* Address */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                placeholder="Flat no, Street"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-4"
                value={userDetails.street}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, street: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-4"
                value={userDetails.city}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, city: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="State"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-4"
                value={userDetails.state}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, state: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={userDetails.postalCode}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, postalCode: e.target.value })
                }
              />
            </div>

            {/* Start Date */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                value={startDate}
                min={
                  new Date(Date.now() + 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Submit
            </button>
          </form>

          {/* payment summary*/}
          <div className="w-1/4">
            {subscriptions.map((item, index) => (
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
                  ₹{" "}
                  {subscriptions
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </div>
              </div>
              <div className="flex justify-between  px-2">
                <div className="flex flex-col text-gray-600 ">
                  Subscription plan
                </div>
                <div className="flex items-end  text-gray-600">
                  {selectedDuration}{" "}
                  {selectedDuration === 1 ? "Month" : "Months"}
                </div>
              </div>
            </div>
            <div className=" border-y mt-1 py-2">
              <div className="flex justify-between p-2">
                <div className="flex flex-col  text-gray-900 font-semibold ">
                  Total
                </div>
                <div className="flex items-end  text-gray-900 font-semibold ">
                  ₹{calculateAmountForDuration(selectedDuration).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 bg-green-500 text-white px-6 py-2 rounded-lg"
      >
        Submit Subscription
      </button>
    </section>
  );
};

export default Subscription;
