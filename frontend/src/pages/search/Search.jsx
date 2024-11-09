import React, { useEffect, useState } from "react";

import products from "../../data/products.json";
import ProductCards from "../../components/shop/ProductCards";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fiteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  return (
    <>
      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar w-full max-w-full p-2 border rounded"
            placeholder="Search for products.."
          />
          <button
            onClick={handleSearch}
            className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded"
          >
            Search
          </button>
        </div>

        <ProductCards products={fiteredProducts} />
      </section>
    </>
  );
};

export default Search;
