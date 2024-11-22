import React, { useState } from "react";
import products from "../../data/products.json"

const Trending = () => {
    const [visibleProducts, setVisibleProducts] = useState(4);
    const loadMoreProducts = () =>{
        setVisibleProducts(prevCount => prevCount + 4)
    }
  return (
    <section className="section__container product__container">
      <h2 className="section__header">Top Selling Products</h2>
      <p className=" section__subheader mb-12">
        Discover the best selling products: Lorem ipsum dolor sit amet
        consectetur adipisicing elit!
      </p>
      {/* ProductCards  */}
      <div className="mt-12">
      <ProductCards products={products.slice(0, visibleProducts )} />
      </div>

      {/* load more product__btn */}
      <div className="product__btn">
        {
            visibleProducts < products.length && (
                <button className="btn" onClick={loadMoreProducts}>
                    Load More
                </button>
            )
        }
      </div>
        
    </section>
  );
};

export default Trending;
