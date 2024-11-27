import React from "react";
import Category1 from "../../assets/categories/Grocery.png";
import Category2 from "../../assets/categories/Dairy.png";
import Category3 from "../../assets/categories/Oil.png";
import Category4 from "../../assets/categories/Sweet.png";
import Category5 from "../../assets/categories/Frozen.png";
import Category6 from "../../assets/categories/Personalcare.png";
import Category7 from "../../assets/categories/Cleaning.png";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      name: "Fresh Vegetables & Fruits",
      path: "fresh-vegetables-fruits",
      image: Category1 // placeholder for generic image
    },
    {
      name: "Indian Grocery",
      path: "indian-grocery",
      image: Category2 // placeholder for generic image
    },
    {
      name: "Puja Needs & Idols",
      path: "puja-needs-idols",
      image: Category3 // placeholder for generic image
    },
    {
      name: "Personal Care",
      path: "personal-care",
      image: Category4 // placeholder for generic image
    },
    {
      name: "Cleaning & Household",
      path: "cleaning-household",
      image: Category5 // placeholder for generic image
    },
    {
      name: "Handlooms",
      path: "handlooms",
      image: Category6 // placeholder for generic image
    },
    {
      name: "Handlooms",
      path: "handlooms",
      image: Category7 // placeholder for generic image
    }
  ];  

  return (
    <section>
      <div className="product__grid">
        {categories.map((Category) => (
            <Link key={Category.name} to={`/category/${Category.path}`} className="categories__card">
            <img src={Category.image} alt={Category.name} />
            {/* <h4>{Category.name}</h4> */}
          </Link>
        ))};
      </div>
    </section>
  );
};

export default Categories;
