import React, { useState } from "react";
import RatingStars from "../RatingStars";
import SingleProductPopup from "./SingleProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
const ProductCards = ({ products }) => {

  //redux
  const dispatch = useDispatch();
  const handleAddToCart = (product) =>{
    dispatch(addToCart(product))
  }



  //popup product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="product__card"
            onClick={() => {openModal(product)}}
          >
            <div className="relative">
              <img
                src={product.image}
                alt="product"
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
              />
              <div className="hover:block absolute top-3 right-3">
                <button onClick={(e)=>{
                  e.stopPropagation();
                  handleAddToCart(product)
                }}>
                  <i className="ri-shopping-bag-4-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i>
                </button>
              </div>
            </div>

            {/* product description */}
            <div>
              <h4>{product.name}</h4>
              <p>
                ₹ {product.price}{" "}
                {product.oldPrice ? <s>₹ {product.oldPrice}</s> : null}
              </p>
              <RatingStars rating={product.rating} />
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <SingleProductPopup product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
};

export default ProductCards;
