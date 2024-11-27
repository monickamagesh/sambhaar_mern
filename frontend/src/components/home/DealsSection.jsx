import React from "react";
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
import { Link } from "react-router-dom";

const DealsSection = () => {
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
      <div className="product-grid">
        {productImages.map((image, index) => (
          <div key={index} className="image-container">
            <img src={image.src} alt={image.alt} />
            <button className="get-it-now-btn">Get now</button>
          </div>
        ))}
      </div>
      <br />
      <br />

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

          <div className="mt-8 flex flex-col lg:flex-row items-center gap-4">
            <Link
              to={`/subscription`}
              className="bg-primary text-white px-6 py-3 rounded-lg text-md font-semibold shadow-md hover:bg-orange-600 transition-all duration-300"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default DealsSection;
