import React, { useEffect, useState } from "react";
import productData from "../../data/products.json";
import ProductCards from "../../components/shop/ProductCards";

const filters = {
  categories: [
    { name: "all", subcategories: [] },
    { name: "accessories", subcategories: ["bags", "belts", "hats"] },
    { name: "dress", subcategories: ["casual", "formal", "party"] },
    { name: "jewellery", subcategories: ["rings", "necklaces", "bracelets"] },
    {
      name: "cosmetics",
      subcategories: ["lipstick", "foundation", "eyeshadow"],
    },
  ],
  colors: ["all", "black", "red", "blue"],
  priceRange: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $150", min: 100, max: 150 },
    { label: "$150 and above", min: 150, max: Infinity },
  ],
};

const Products = () => {
  const [products, setProducts] = useState(productData);
  const [filtersState, setFiltersState] = useState({
    category: "all",
    subcategory: "",
    color: "all",
    priceRange: "",
  });
  const [activeIndex, setActiveIndex] = useState(null);

  // Filtering function
  const applyFilters = () => {
    let filteredProducts = productData;

    // Filter by category
    if (filtersState.category && filtersState.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filtersState.category
      );
    }

    // Filter by subcategory
    if (filtersState.subcategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.subcategory === filtersState.subcategory
      );
    }

    // Filter by color
    if (filtersState.color && filtersState.color !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === filtersState.color
      );
    }

    // Filter by price range
    if (filtersState.priceRange) {
      const selectedPriceRange = filters.priceRange.find(
        (range) => range.label === filtersState.priceRange
      );
      if (selectedPriceRange) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.price >= selectedPriceRange.min &&
            product.price <= selectedPriceRange.max
        );
      }
    }

    setProducts(filteredProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [filtersState]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleCategoryChange = (category) => {
    setFiltersState({ ...filtersState, category, subcategory: "" });
    setActiveIndex(
      filters.categories.findIndex((cat) => cat.name === category)
    );
  };

  const handleSubcategoryChange = (subcategory) => {
    setFiltersState({ ...filtersState, subcategory });
  };

  const handleColorChange = (color) => {
    setFiltersState({ ...filtersState, color });
  };

  const handlePriceRangeChange = (priceRange) => {
    setFiltersState({ ...filtersState, priceRange });
  };

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      subcategory: "",
      color: "all",
      priceRange: "",
    });
  };

  
  return (
    <>

      <section className="section__container py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Filter options */}
          <div className="w-full md:w-1/4 bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Filters
            </h3>
            

            <div className="accordion">
              {filters.categories.map((category, index) => (
                <div key={index} className="accordion-item mb-3">
                  <div
                    className={`accordion-title cursor-pointer font-medium text-gray-700 bg-gray-100 p-2 rounded flex justify-between ${
                      filtersState.category === category.name
                        ? "text-blue-600"
                        : ""
                    }`}
                    onClick={() => {
                      handleCategoryChange(category.name);
                      toggleAccordion(index);
                    }}
                  >
                    <span>
                    <i className="ri-restaurant-fill"></i>
                      {category.name.charAt(0).toUpperCase() +
                        category.name.slice(1)}
                    </span>
                    <span>{activeIndex === index ? "−" : "+"}</span>
                  </div>
                  {activeIndex === index &&
                    category.subcategories.length > 0 && (
                      <div className="accordion-content mt-2 space-y-2">
                        {category.subcategories.map((sub, i) => (
                          <div
                            key={i}
                            className={`subcategory cursor-pointer text-sm hover:text-blue-500 ${
                              filtersState.subcategory === sub
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                            onClick={() => handleSubcategoryChange(sub)}
                          >
                            {sub.charAt(0).toUpperCase() + sub.slice(1)}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* Color Filter */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Color</h4>
              <div className="space-y-1">
                {filters.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer text-sm ${
                      filtersState.color === color
                        ? "text-blue-600"
                        : "text-gray-600"
                    } hover:text-blue-500`}
                    onClick={() => handleColorChange(color)}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Price Range</h4>
              <div className="space-y-1">
                {filters.priceRange.map((range, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer text-sm ${
                      filtersState.priceRange === range.label
                        ? "text-blue-600"
                        : "text-gray-600"
                    } hover:text-blue-500`}
                    onClick={() => handlePriceRangeChange(range.label)}
                  >
                    {range.label}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="bg-primary py-1 px-4 text-white rounded"
            >
              Clear All Filters
            </button>
          </div>

          {/* Right side - Products */}
          <div className="section__container">
                <h3 className="  font-medium mb-4 " >Products Available: {products.length}</h3>
               <ProductCards products={products} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
