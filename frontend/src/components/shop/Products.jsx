import React, { useEffect, useState } from "react";
import ProductCards from "../../components/shop/ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  subcategories: [
    "bags",
    "belts",
    "hats",
    "casual",
    "formal",
    "evening",
    "necklaces",
    "rings",
    "bracelets",
    "lipstick",
    "foundation",
    "eyeliner",
  ],
  brands: ["all", "rgb", "grt", "svs"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $150", min: 100, max: 150 },
    { label: "$150 and above", min: 150, max: Infinity },
  ],
};

const Products = () => {
  const [filtersState, setFiltersState] = useState({
    category: "all",
    subcategory: "",
    brand: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);

  const { category, subcategory, brand, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    brand: brand !== "all" ? brand : "",
    subcategory: subcategory ? subcategory : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });
  //clear filters
  const clearFilters = () => {
    setFiltersState({
      category: "all",
      subcategory: "",
      brand: "all",
      priceRange: "",
    });
  };

  //Handle page change
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
      <section className="section__container py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Filter options */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* Right side - Products */}
          <div className="section__container">
            <h3 className="font-medium mb-4">
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
            <ProductCards products={products} />

            {/* Pagination controls */}
            <div className="mt-6 flex justify-center">
              <button
              disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  onClick={() => handlePageChange(index + 1)}
                  key={index}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-gray-300 text-gray-700"
                  } rounded-md mx-1 `}
                >
                  {index + 1}
                </button>
              ))}
              <button
              disabled={totalPages === currentPage}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
