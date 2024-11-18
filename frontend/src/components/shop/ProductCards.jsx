import React, { useState } from "react";
import RatingStars from "../RatingStars";
import SingleProductPopup from "./SingleProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductCards = ({ products }) => {
  // Redux
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Popup product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <article
            key={index}
            className="product-card  cart-type-krypton   h-full cursor-pointer overflow-hidden rounded-md border border-border-200 bg-white transition-shadow duration-200 hover:shadow-sm"
            onClick={() => openModal(product)}
          >
            {/* Product Image */}
            <div className="relative flex h-48 w-auto sm:px-10 items-center justify-center sm:h-56 lg:h-64">
              <img
                src={product.image}
                alt="product"
                className="block object-contain product-image "
              />
              {product.discount && (
                <div className="absolute top-3 rounded-full bg-yellow-500 px-2 text-xs font-semibold leading-6 text-light ltr:right-3 rtl:left-3 md:top-4 md:px-2.5 ltr:md:right-4 rtl:md:left-4">
                  {product.discount}%
                </div>
              )}
            </div>
            {/* End of product image */}

            {/* Product Details */}
            <header className="p-3 text-start md:p-6">
              <h3 className="mb-2 flex items-start  gap-1 truncate text-sm font-semibold text-heading">
                {product.name}
              </h3>

              <h4 className="text-xs text-muted ltr:ml-2 text-gray-500 mb-4 rtl:mr-2">
                {product.quantity}
              </h4>

              <div className="flex items-center justify-between">
                {/* Pricing */}
                <div className="flex items-start flex-col justify-center">
                  {product.oldPrice && (
                    <del className="text-xs text-muted ltr:ml-2 text-gray-500 rtl:mr-2">
                      ₹{product.oldPrice}
                    </del>
                  )}
                  <span className="text-sm text-sub-heading font-semibold text-primary">
                    ₹{product.price}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="mt-4 flex items-center justify-center px-4 py-2 text-sm font-semibold text-primary  rounded-full  hover:border-gray-300 border"
                >
                  
                  <i class="ri-shopping-basket-fill"></i>

                  <span className="pl-2 text-sm font-semibold">Cart</span>
                </button>
              </div>
            </header>
          </article>
        ))}
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
        <SingleProductPopup product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
};

export default ProductCards;
