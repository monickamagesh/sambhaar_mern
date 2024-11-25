
import React, { useState } from "react";
import dealsImg from "../../assets/milk/banner-2.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import prodbanner1 from "../../assets/productbanner/Atta-flour_final-web.png";
import prodbanner2 from "../../assets/productbanner/Cooking-oil-Ghee.png";
import prodbanner3 from "../../assets/productbanner/Dals-Pulses.png";
import prodbanner4 from "../../assets/productbanner/Indian-Masala.png";
import prodbanner5 from "../../assets/productbanner/Dry-fruits-nuts.png";
import prodbanner6 from "../../assets/productbanner/Bakery.png";
import { useFetchAllMilksQuery } from "../../redux/features/milks/milksApi";

const DealsSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);

  const { data, error, isLoading } = useFetchAllMilksQuery();

  const togglePopup = () => setShowPopup(!showPopup);

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

  const handleSubmit = () => {
    const subscriptionData = {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "9876543210",
      address: {
        street: "123 Street",
        city: "Cityville",
        state: "State",
        postalCode: "123456",
        country: "India",
      },
      duration: 3, // Example duration
      startDate: new Date(),
      subscriptionId: `SUB-${Date.now()}`,
      milks: subscriptions,
      amount: subscriptions.reduce(
        (total, milk) => total + milk.price * milk.quantity,
        0
      ),
      subscriptionStatus: "Active",
      paymentMethod: "Cash",
      paymentStatus: "Pending",
    };

    console.log("Submitted Subscription:", subscriptionData);
  };

  const productImages = [
    { src: prodbanner1, alt: "prodbanner1" },
    { src: prodbanner2, alt: "prodbanner2" },
    { src: prodbanner3, alt: "prodbanner3" },
    { src: prodbanner4, alt: "prodbanner4" },
    { src: prodbanner5, alt: "prodbanner5" },
    { src: prodbanner6, alt: "prodbanner6" },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 mx-10 gap-6">
        {productImages.map((image, index) => (
          <div key={index} className="relative">
            <img src={image.src} alt={image.alt} className="w-full h-auto rounded-md" />
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-600 transition-all duration-300">
              Get now
            </button>
          </div>
        ))}
      </div>
      <br/>
      <br/>

      <section className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row items-center gap-8 p-6 lg:p-12 max-w-7xl mx-auto">
        {/* Left Image Section */}
        <div className="relative lg:w-1/2">
          <img
            src={dealsImg}
            alt="Fresh Milk Daily"
            className="w-[450px] transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div className="absolute top-4 left-4 bg-blue-950 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
            100% Fresh & Natural
          </div>
        </div>

        {/* Right Content Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
            Get <span className="text-primary">Fresh Milk</span> Daily
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Experience the joy of fresh, creamy milk delivered right to your
            doorstep every morning. Your family's health deserves the best!
          </p>
          <ul className="mt-6 text-md text-gray-700 space-y-2">
            <li className="flex items-center gap-2">
              <i className="ri-check-double-line text-primary"></i> Fresh
              every day
            </li>
            <li className="flex items-center gap-2">
              <i className="ri-check-double-line text-primary"></i> Easy
              subscription options
            </li>
            <li className="flex items-center gap-2">
              <i className="ri-check-double-line text-primary"></i>{" "}
              Affordable prices
            </li>
          </ul>

          <div className="mt-8 flex flex-col lg:flex-row items-center gap-4">
            <button
              className="bg-primary text-white px-6 py-3 rounded-lg text-md font-semibold shadow-md hover:bg-orange-600 transition-all duration-300"
              onClick={togglePopup}
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-5/6 h-fit overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Milk Categories</h2>
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error fetching data</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {data?.milks?.map((milk) => (
                  <div
                    key={milk._id}
                    className="bg-white p-4 border rounded-lg shadow-md flex flex-col items-center"
                  >
                    <img
                      src={milk.image || "default-milk-image.png"}
                      alt={milk.name}
                      className="w-24 h-24 object-cover rounded-full"
                    />
                    <h3 className="mt-2 text-lg font-bold">{milk.name}</h3>
                    <p className="text-sm text-gray-600">{milk.weight}</p>
                    <p className="text-sm text-primary font-bold">₹{milk.price}</p>
                    {subscriptions.some((item) => item.milkId === milk._id) ? (
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleDecrement(milk._id)}
                          className="px-2 bg-gray-300 rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="px-4">
                          {subscriptions.find((item) => item.milkId === milk._id)
                            ?.quantity || 0}
                        </span>
                        <button
                          onClick={() => handleIncrement(milk._id)}
                          className="px-2 bg-gray-300 rounded-r-lg"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddMilk(milk)}
                        className="mt-2 bg-primary text-white px-4 py-1 rounded-lg"
                      >
                        Add
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={togglePopup}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-8 bg-green-500 text-white px-6 py-2 rounded-lg"
      >
        Submit Subscription
      </button>
    </>
  );
};

export default DealsSection;
