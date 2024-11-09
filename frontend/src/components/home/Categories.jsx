import React from "react";
import Category from "../../assets/category-img.png";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      name: "Fresh Vegetables & Fruits",
      path: "fresh-vegetables-fruits",
      image: Category // placeholder for generic image
    },
    {
      name: "Indian Grocery",
      path: "indian-grocery",
      image: Category // placeholder for generic image
    },
    {
      name: "Puja Needs & Idols",
      path: "puja-needs-idols",
      image: Category // placeholder for generic image
    },
    {
      name: "Personal Care",
      path: "personal-care",
      image: Category // placeholder for generic image
    },
    {
      name: "Cleaning & Household",
      path: "cleaning-household",
      image: Category // placeholder for generic image
    },
    {
      name: "Handlooms",
      path: "handlooms",
      image: Category // placeholder for generic image
    }
  ];  

  return (
    <section>
      <div className="product__grid">
        {categories.map((Category) => (
            <Link key={Category.name} to={`/category/${Category.path}`} className="categories__card">
            <img src={Category.image} alt={Category.name} />
            <h4>{Category.name}</h4>
          </Link>
        ))};
      </div>
    </section>
  );
};

export default Categories;
