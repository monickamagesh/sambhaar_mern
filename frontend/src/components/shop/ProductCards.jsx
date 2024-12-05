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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product, index) => {
          const cartItem = findProductInCart(product._id);

          return (
            <article
              key={index}
              className="product-card cart-type-krypton h-full cursor-pointer overflow-hidden rounded-md border border-border-200 bg-white transition-shadow duration-200 hover:shadow-sm flex flex-col"
              onClick={() => openModal(product)}
            >
              {/* Product Image */}
              <div className="relative flex h-40 w-auto sm:px-10 items-center justify-center sm:h-48 group overflow-hidden">
                {/* Discount Badge - Display Only If Discount Exists */}
                {product.oldPrice && product.price && (
                  <div className="absolute top-0 left-0 bg-gradient-to-br from-orange-600 to-orange-400 text-white rounded-br-lg px-2 py-1 text-center w-10 z-10">
                    <span className="block text-xs font-bold">
                      {Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100
                      )}
                      %
                    </span>
                    <p className="text-[10px] leading-tight">Off</p>
                  </div>
                )}

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="block object-contain product-image transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Product Details */}
              <header className="p-3 text-start md:p-6 flex flex-col justify-between flex-grow">
                <h3 className="mb-2 truncate text-sm font-semibold text-heading ">
                  {product.name}
                </h3>
                {product.weight != "0" && (
                  <h4 className="text-xs text-gray-500 mb-2">
                    {product.weight}
                  </h4>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between mt-auto">
                  {/* Pricing */}
                  <div className="flex gap-1 items-center">
                    <div className="text-sm font-semibold text-primary">
                      ₹{product.price}{" "}
                    </div>
                    {product.oldPrice && (
                      <del className="text-xs text-gray-500">
                        ₹{product.oldPrice}
                      </del>
                    )}
                  </div>

                  {/* Cart Actions */}
                  {cartItem ? (
                    <div className="mt-2 flex items-center justify-center  text-sm font-semibold bg-gradient-to-br from-orange-600 to-orange-400  transition duration-200 text-gray-50 border rounded-full ">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantity("decrement", product._id);
                        }}
                        className="  pl-2 pr-2  py-2  rounded-l-full hover:bg-primary"
                      >
                        -
                      </button>
                      <span className="px-4">{cartItem.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantity("increment", product._id);
                        }}
                        className=" pr-2 pl-2 py-2  rounded-r-full hover:bg-primary"
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
                      className=" flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-full  text-orange-600 border border-orange-600 bg-transparent  hover:bg-primary  transition duration-200 hover:text-gray-50"
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
