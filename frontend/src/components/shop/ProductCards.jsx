import React, { useState } from "react";
import RatingStars from "../RatingStars";
import SingleProductPopup from "./SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";

const ProductCards = ({ products }) => {
  // Redux
  const dispatch = useDispatch();

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Handle Quantity Update (Increment / Decrement)
  const handleQuantity = (type, id) => {
    const itemInCart = findProductInCart(id); // Find the product in the cart

    if (type === "increment") {
      dispatch(updateQuantity({ type, id }));
    } else if (type === "decrement") {
      if (itemInCart && itemInCart.quantity === 1) {
        // If quantity is 1, remove the item from the cart
        dispatch(removeFromCart({ id }));
      } else {
        // Otherwise, decrement the quantity
        dispatch(updateQuantity({ type, id }));
      }
    }
  };

  // Get products in the cart from the Redux store
  const productIn = useSelector((state) => state.cart.products);

  // Find product in cart helper function
  const findProductInCart = (id) => {
    return productIn.find((product) => product._id === id) || null;
  };

  // Popup product modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((product, index) => {
          const cartItem = findProductInCart(product._id);

          return (
            <article
              key={index}
              className="product-card cart-type-krypton h-full cursor-pointer overflow-hidden rounded-md border border-border-200 bg-white transition-shadow duration-200 hover:shadow-sm"
              onClick={() => openModal(product)}
            >
              {/* Product Image */}
              <div className="relative flex h-48 w-auto sm:px-10 items-center justify-center sm:h-56 lg:h-64 group overflow-hidden">
                <img
                  src={product.image}
                  alt="product"
                  className="block object-contain product-image transform transition-transform duration-300 group-hover:scale-110"
                />
                {product.discount && (
                  <div className="absolute top-3 rounded-full bg-yellow-500 px-2 text-xs font-semibold leading-6 text-light">
                    {product.discount}%
                  </div>
                )}
              </div>

              {/* Product Details */}
              <header className="p-3 text-start md:p-6">
                <h3 className="mb-2 truncate text-sm font-semibold text-heading">
                  {product.name}
                </h3>
                <h4 className="text-xs text-gray-500 mb-4">
                  {product.weight}
                </h4>

                <div className="flex items-center justify-between">
                  {/* Pricing */}
                  <div className="flex flex-col">
                    {product.oldPrice && (
                      <del className="text-xs text-gray-500">
                        ₹{product.oldPrice}
                      </del>
                    )}
                    <span className="text-sm font-semibold text-primary">
                      ₹{product.price}
                    </span>
                  </div>

                  {/* Cart Actions */}
                  {cartItem ? (
                    <div className="mt-4 flex items-center justify-center  text-sm font-semibold text-gray-50  bg-primary border rounded-full ">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantity("decrement", product._id);
                        }}
                        className="  pl-2 pr-2  py-2  rounded-l-full hover:bg-primary-dark"
                      >
                        -
                      </button>
                      <span className="px-4">{cartItem.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantity("increment", product._id);
                        }}
                        className=" pr-2 pl-2 py-2  rounded-r-full hover:bg-primary-dark"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(handleAddToCart(product));
                      }}
                      className="mt-4 flex items-center justify-center px-4 py-2 text-sm font-semibold text-primary border rounded-full hover:bg-primary transition duration-200 hover:text-gray-50"
                    >
                      <i className="ri-shopping-basket-fill"></i>
                      <span className="pl-2">Cart</span>
                    </button>
                  )}
                </div>
              </header>
            </article>
          );
        })}
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
        <SingleProductPopup product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
};

export default ProductCards;
