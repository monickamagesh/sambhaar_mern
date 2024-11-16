import React from "react";
import Products from "../../components/shop/Products";
import Footer from "../../components/Footer";

const Shop = () => {

  
  return (
    <>
      <section className="section__container bg-primary-light py-12 text-center">
        <h2 className="section__header text-3xl font-bold text-gray-800 capitalize mb-4">Shopping</h2>
        <p className="section__subheader text-gray-600 max-w-xl mx-auto">
          Explore our wide range of products. Use the filters to narrow down your choices.
        </p>
      </section>
        
        <Products />

        <Footer />
    </>
  );
};

export default Shop;
