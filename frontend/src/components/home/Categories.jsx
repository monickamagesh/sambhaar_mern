import React from "react";
import { Link } from "react-router-dom";
import Category1 from "../../assets/categories/Grocery.png";
import Category2 from "../../assets/categories/Dairy.png";
import Category3 from "../../assets/categories/Oil.png";
import Category4 from "../../assets/categories/Sweet.png";
import Category5 from "../../assets/categories/Frozen.png";
import Category6 from "../../assets/categories/Personal Care.png";
import Category7 from "../../assets/categories/Cleaning.png";
import Category8 from "../../assets/categories/Pooja Essentials.png";
import Category9 from "../../assets/categories/Stationery.png";

const Categories = () => {
  const categories = [
    { name: "Grocery Essentials", path: "Grocery Essentials", image: Category1 },
    { name: "Dairy & Fresh Foods", path: "indian-grocery", image: Category2 },
    { name: "Oils & Condiments", path: "puja-needs-idols", image: Category3 },
    { name: "Snacks & Sweets", path: "personal-care", image: Category4 },
    { name: "Frozen & Beverages", path: "cleaning-household", image: Category5 },
    { name: "Health & Personal Care", path: "handlooms", image: Category6 },
    { name: "Cleaning & Household", path: "handlooms", image: Category7 },
    { name: "Pooja Essentials", path: "handlooms", image: Category8 },
    { name: "Stationery", path: "handlooms", image: Category9 },
    { name: "Subscription", path: "subscription", image: Category2 },
  ];

  return (
    <section>
      <h2 className="sr-only" id="categories-heading">
        Browse Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 py-8 mx-auto max-w-screen-xl justify-center ite">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/category/${category.path}`}
            className="flex flex-col  items-center group bg-white border border-gray-300 rounded-lg shadow-md p-4 transition-transform duration-300 ease-in-out hover:translate-y-[-8px] hover:shadow-lg"
            aria-label={`Explore ${category.name}`}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-24 h-24 rounded-[10%] object-contain mb-2"
            />
            <p className="font-bold text-gray-800 group-hover:text-primary text-sm mt-2 text-center">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
