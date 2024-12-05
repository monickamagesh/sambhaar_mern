import React from "react";
import dealsImg from "../../assets/milk/banner-2.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import prodbanner1 from "../../assets/productbanner/Atta-flour_final-web.png";
import prodbanner2 from "../../assets/productbanner/Cooking-oil-Ghee.png";
import prodbanner3 from "../../assets/productbanner/Dals-Pulses.png";
import prodbanner4 from "../../assets/productbanner/Indian-Masala.png";
import prodbanner5 from "../../assets/productbanner/Dry-fruits-nuts.png";
import prodbanner6 from "../../assets/productbanner/Bakery.png";
import { Link } from "react-router-dom";

const DealsSection = () => {
  const productImages1 = [
    { src: prodbanner1, alt: "prodbanner1" },
    { src: prodbanner2, alt: "prodbanner2" },
    { src: prodbanner3, alt: "prodbanner3" },
  ];
  const productImages2 = [
    { src: prodbanner4, alt: "prodbanner4" },
    { src: prodbanner5, alt: "prodbanner5" },
    { src: prodbanner6, alt: "prodbanner6" },
  ];

  return (
    <>
      <div className="product-grid">
        {productImages1.map((image, index) => (
          <div
            key={index}
            className="relative w-full bg-white rounded-lg shadow-md overflow-hidden group"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-full shadow-md transition-all duration-500 group-hover:scale-110 flex items-center justify-center px-6 py-3 text-sm font-semibold border-2 border-orange-600 bg-transparent bg-gradient-to-br from-[#c74227] to-[#edbb1c] hover:from-[#edbb1c] hover:to-[#c74227] hover:shadow-lg hover:shadow-orange-500/50 text-gray-50">
              Get now
            </button>
          </div>
        ))}
      </div>
      <br />

      <section className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col lg:flex-row items-center gap-2 p-6 lg:py-8 lg:px-12 max-w-7xl mx-auto">
        {/* Left Image Section */}
        <div className="relative lg:w-1/2">
          <img
            src={dealsImg}
            alt="Fresh Milk Daily"
            className="w-[450px] transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <div className="absolute top-4 left-4 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
            100% Fresh & Natural
          </div>
        </div>

        {/* Right Content Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
            Get <span className="text-primary">Fresh Milk</span> Daily
          </h2>
          <p className="mt-2 text-lg text-gray-600 leading-relaxed">
            Experience the joy of fresh, creamy milk delivered right to your
            doorstep every morning. Your family's health deserves the best!
          </p>
          <ul className="mt-4 text-md text-gray-700 space-y-2">
            <li className="flex items-center gap-2">
              <i className="ri-check-double-line text-primary"></i> Fresh every
              day
            </li>
            <li className="flex items-center gap-2">
              <i className="ri-check-double-line text-primary"></i> Easy
              subscription options
            </li>
            <li className="flex items-center gap-2">
              <i className="ri-check-double-line text-primary"></i> Affordable
              prices
            </li>
          </ul>

          <div className="mt-6 flex flex-col lg:flex-row items-center gap-4">
            <Link
              to={`/subscription`}
              className="subscribe-btn text-md font-semibold shadow-md transition-all duration-300"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      </section>

      <br />
      <div className="product-grid">
        {productImages2.map((image, index) => (
          <div
            key={index}
            className="relative w-full bg-white rounded-lg shadow-md overflow-hidden group"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-full shadow-md transition-all duration-500 group-hover:scale-110 flex items-center justify-center px-6 py-3 text-sm font-semibold border-2 border-orange-600 bg-transparent bg-gradient-to-br from-[#c74227] to-[#edbb1c] hover:from-[#edbb1c] hover:to-[#c74227] hover:shadow-lg hover:shadow-orange-500/50 text-gray-50">
              Get now
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default DealsSection;
