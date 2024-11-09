import React from "react";

const HeroSection = () => {


  return (
    <section className="hero bg-cover bg-center relative flex items-center justify-center bg-primary-white header__container section__container">
      <div className="overlay absolute inset-0 opacity-100"></div>
      <div className=" container text-center  text-black relative z-10 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Bringing Authentic India to Your Doorstep
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Groceries, Spices, and Snacks Full of Culture & Flavour
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          <a href="#shop" className="cta-primary">
            Shop Now
          </a>
          <a href="#explore" className="cta-secondary">
            Explore Our Range
          </a>
          
        </div>
        <div className="flex justify-center space-x-8 text-sm md:text-base">
          <div>
            <i className="icon-delivery"></i> Free Delivery
          </div>
          <div>
            <i className="icon-quality"></i> 100% Quality Guarantee
          </div>
          <div>
            <i className="icon-authentic"></i> Authentic Ingredients
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;
