import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCards from "../../components/shop/ProductCards";
import products from "../../data/products.json";
import Products from "../../components/shop/Products";

const Category = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 8);
  };

  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === categoryName.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Add an empty dependency array to run this effect only once on mount

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header captialize">{categoryName}</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga alias
          nam placeat similique nemo delectus eum molestias. Facilis maiores
          cupiditate a vel quis inventore ab quae, ut vitae quibusdam obcaecati.
        </p>
      </section>

      <div className="section__container">
        <ProductCards products={filteredProducts.slice(0, visibleProducts)} />
      </div>

      {/* Load more product button */}
      <div className="product__btn">
        {filteredProducts.length > visibleProducts && (
          <button className="btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>

      <Products />
    </>
  );
};

export default Category;
