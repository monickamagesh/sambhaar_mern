import React, { useEffect, useState } from "react";
import ProductCards from "../../components/shop/ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: [
    {
      label: "Category",
      icon: "",
      value: "",
    },
    {
      label: "Fresh Vegetables & Fruits",
      icon:" ",
      value: "Fresh Vegetables & Fruits",
      subcategories: [
        { label: "Fresh Vegetables", value: "Fresh Vegetables" },
        { label: "Fresh Fruits", value: "Fresh Fruits" },
      ],
    },
    {
      label: "Indian Grocery",
      icon:" ",
      value: "Indian Grocery",
      subcategories: [
        { label: "Appalam | Vathal | Vadam", value: "Appalam | Vathal | Vadam" },
        { label: "Bakery | Bread | Cakes", value: "Bakery | Bread | Cakes" },
        {
          label: "Cookies | Biscuits | Rusk",
          value: "Cookies | Biscuits | Rusk",
        },
        { label: "Atta | Flours | Sooji", value: "Atta | Flours | Sooji" },
        { label: "Dairy | Beverages", value: "Dairy | Beverages" },
        { label: "Cooking Oil | Ghee", value: "Cooking Oil | Ghee" },
        { label: "Dals | Pulses | Grains", value: "Dals | Pulses | Grains" },
        { label: "Fruit Mix", value: "Fruit Mix" },
        { label: "Dry Fruits | Nuts", value: "Dry Fruits | Nuts" },
        {
          label: "Indian Masala | Spices | Salt",
          value: "Indian Masala | Spices | Salt",
        },
        { label: "Rice | Rice Products", value: "Rice | Rice Products" },
        {
          label: "Sugar | Sweeteners | Jaggery",
          value: "Sugar | Sweeteners | Jaggery",
        },
        { label: "Snacks | Packaged Food", value: "Snacks | Packaged Food" },
      ],
    },
    {
      label: "Puja Needs & Idols",
      value: "Puja Needs & Idols",
      icon:" ",
      subcategories: [
        { label: "Idols", value: "Idols" },
        { label: "Puja Needs", value: "Puja Needs" },
      ],
    },
    {
      label: "Evergreen",
      value: "Evergreen",
      icon:" ",
      subcategories: [
        { label: "South Vegies & Fruits", value: "South Vegies & Fruits" },
        { label: "Indian Sweets", value: "Indian Sweets" },
        { label: "South Snacks", value: "South Snacks" },
      ],
    },
    {
      label: "South Cookware",
      value: "South Cookware",
      icon:" ",
      subcategories: [
        { label: "Cookware", value: "Cookware" },
        { label: "Clay Cookware", value: "Clay Cookware" },
      ],
    },
    {
      label: "Handlooms",
      icon:" ",
      value: "Handlooms",
      subcategories: [
        { label: "For Women", value: "For Women" },
        { label: "For Men", value: "For Men" },
        { label: "Accessories", value: "Accessories" },
      ],
    },
    {
      label: "Personal Care",
      value: "Personal Care",
      icon:" ",
      subcategories: [
        { label: "Bath & Hand wash", value: "Bath & Hand wash" },
        { label: "Hair Care", value: "Hair Care" },
        { label: "Oral Care", value: "Oral Care" },
      ],
    },
    {
      label: "Cleaning & Household",
      value: "Cleaning & Household",
      icon:" ",
      subcategories: [
        { label: "Cleaners", value: "Cleaners" },
        { label: "Detergents | Dish wash", value: "Detergents | Dish wash" },
      ],
    },
    { label: "South Special Grocery", icon:" ", value: "South Special Grocery" },
    {
      label: "Specials",
      value: "Specials",
      icon: "",
      subcategories: [
        {
          label: "Dals, Pulses & Millets, Gbappa Grocery",
          value: "Dals, Pulses & Millets, Gbappa Grocery",
        },
        {
          label: "Grains & Flours, Grocery, Meela",
          value: "Grains & Flours, Grocery, Meela",
        },
        {
          label: "Monthly Essentials, Specials",
          value: "Monthly Essentials, Specials",
        },
      ],
    },
  ],
  
  priceRanges: [
    { label: "Under $50", min: 0, max: 250 },
    { label: "$50 - $100", min: 250, max: 500 },
    { label: "$100 - $150", min: 500, max: 1000 },
    { label: "$150 and above", min: 1000, max: Infinity },
  ],
};

const Products = () => {
  const [filtersState, setFiltersState] = useState({
    category: "all",
    subcategory: "",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(30);

  const { category, subcategory, priceRange } = filtersState;
  const price = filters.priceRanges.find((range) => range.label === priceRange);

  const { minPrice, maxPrice } = price || { minPrice: "", maxPrice: "" };

  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    subcategory: subcategory || "",
    minPrice,
    maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  // Clear filters
  const clearFilters = () => {
    setFiltersState({
      category: "all",
      subcategory: "",
      priceRange: "",
    });
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error loading products.</div>;

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className="py-12">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left side - Filter options */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* Right side - Products */}
          <div className="p-8">
            <h3 className="font-medium mb-4">
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
            <ProductCards products={products} />

            {/* Pagination */}
        <div className="mt-6 mr-4 flex items-center justify-end">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="py-1 px-2 rounded-md text-gray-400 ring-1 ring-gray-400 m-2"
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              onClick={() => handlePageChange(index + 1)}
              className={`px-[14px] py-1 ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md mx-1`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="py-1 px-2 rounded-md text-gray-400 ring-1 ring-gray-400 m-2"
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
