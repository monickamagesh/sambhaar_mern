import React, { useEffect, useState } from "react";
import ProductCards from "../../components/shop/ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import CategoryList from "./Categories";
import { useFetchAllCategoriesQuery } from "../../redux/features/categories/categoriesApi";

const Products = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories
  const { data } = useFetchAllCategoriesQuery();

  useEffect(() => {
    if (data) {
      // Format the data to match the required structure
      const formattedCategories = data.map((category) => ({
        label: category.name,
        value: category.name,
        subcategories: category.subcategories.map((subcategory) => ({
          label: subcategory.name,
          value: subcategory.name,
        })),
      }));

      console.log(formattedCategories);

      setCategories(formattedCategories); // Store the formatted categories in state
    }
  }, [data]);

  const filters = {
    categories: categories,

    priceRanges: [
      { label: "Under $50", min: 0, max: 250 },
      { label: "$50 - $100", min: 250, max: 500 },
      { label: "$100 - $150", min: 500, max: 1000 },
      { label: "$150 and above", min: 1000, max: Infinity },
    ],
  };

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
            <div className="mt-6 mr-4 flex items-center justify-center sm:justify-end flex-wrap">
              {/* Previous Page Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="py-1 px-2 rounded-md text-gray-400 ring-1 ring-gray-400 m-2"
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>

              {/* Show a limited number of page numbers on smaller screens */}
              <div className="hidden sm:flex">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
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
              </div>

              {/* Show only the previous and next buttons on smaller screens */}
              <div className="sm:hidden flex">
                {currentPage > 1 && (
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-1 rounded-md text-gray-700"
                  >
                    Prev
                  </button>
                )}
                <span className="px-2 py-1">{currentPage}</span>
                {currentPage < totalPages && (
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-1 rounded-md text-gray-700"
                  >
                    Next
                  </button>
                )}
              </div>

              {/* Next Page Button */}
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
