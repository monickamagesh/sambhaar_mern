import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCards from "../../components/shop/ProductCards";
import Footer from "../../components/Footer";
import { getBaseUrl } from "../../util/baseURL";
import Products from "../../components/shop/Products";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from the database
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${getBaseUrl()}/api/products/search`);
      setProducts(response.data);
      setFilteredProducts(response.data); // Set initial products to display
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.subcategory.toLowerCase().includes(query) ||
        product.quantity.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <section className=" ">
        <div className="w-full mb-12 flex fixed top-0 left-0 z-50 py-5 bg-opacity-50 backdrop-blur-xl  flex-col border border-b-1  border-primary md:flex-row items-center justify-center gap-4">
        <span className="search-bar w-[50%] p-2 border border-primary active:border-1 rounded-lg outline-none ">
        <button
            onClick={handleSearch}
            className="pr-4"
          >
            <i className="ri-search-line  font-bold text-primary"></i>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-5/6 outline-none"
            placeholder="Search for products.."
          />
        </span>
        
          
          <Link to="/shop" className="border border-primary active:border-1 p-2 px-3 rounded-lg outline-none">
            <i className="ri-close-large-fill text-primary font-bold"></i>
          </Link>

        </div>
        <div className="">
          <div className="pt-36 mx-20">
          <ProductCards products={filteredProducts}   />
          </div>
        
        <Products />
        <Footer />
        </div>
        
      </section>
    </>
  );
};

export default Search;
