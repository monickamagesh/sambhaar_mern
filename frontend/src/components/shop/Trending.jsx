import React, { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import { useFetchAllCategoriesQuery } from "../../redux/features/categories/categoriesApi";
import { Link } from "react-router-dom";

const Trending = () => {

  
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

          

          {/* Right side - Products */}
          <div className="p-8">
            
            <ProductCards products={products} />

            {/* Pagination */}
            <div className="mt-6 mr-4 flex items-center justify-center">
              <Link
                disabled={currentPage === totalPages}
                to="/shop"
                className="load-btn text-md font-semibold shadow-md transition-all duration-300 bottom-1 bg-gradient-to-br from-orange-600 to-orange-400"
              >
                Shop more
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Trending;
