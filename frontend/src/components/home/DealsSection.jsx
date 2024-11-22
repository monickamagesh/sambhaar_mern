import React from "react";
import dealsImg from "../../assets/milk-bottle.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import prodbanner1 from "../../assets/productbanner/Atta-flour_final-web.png";
import prodbanner2 from "../../assets/productbanner/Cooking-oil-Ghee.png";
import prodbanner3 from "../../assets/productbanner/Dals-Pulses.png";
import prodbanner4 from "../../assets/productbanner/Indian-Masala.png";
import prodbanner5 from "../../assets/productbanner/Dry-fruits-nuts.png";
import prodbanner6 from "../../assets/productbanner/Bakery.png";

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
      </div><br/><br/>
      <section className="section__container deals__container">
        <div className="deals__image ">
          <img src={dealsImg} alt="" />
        </div>
        <div className="deals__content">
          <h5>Get Milk at you door</h5>
          <h4>Monthly Subscription</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, illo
            iusto nemo ut saepe accusantium corporis pariatur fugit magni, odit
            debitis nobis? Tempore possimus voluptatem laborum consequatur, ex
            beatae deserunt?a
          </p>
          <div className="deals__countdown flex-wrap">
            <div className="deals__countdown__card">
              <h4>20</h4>
              <p>Days</p>
            </div>
            <div className="deals__countdown__card">
              <h4>20</h4>
              <p>Hours</p>
            </div>
            <div className="deals__countdown__card">
              <h4>40</h4>
              <p>Mins</p>
            </div>
            <div className="deals__countdown__card">
              <h4>10</h4>
              <p>Secs</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DealsSection;
