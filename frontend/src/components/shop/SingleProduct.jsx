import React, { useEffect } from "react";
import RatingStars from "../../components/RatingStars";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cart/cartSlice";

const SingleProductPopup = ({ product, onClose }) => {
  const dispatch = useDispatch();

  // Get products in the cart from the Redux store
  const productInCart = useSelector((state) => state.cart.products);

  // Find product in cart helper function
  const findProductInCart = (id) => {
    return productInCart.find((product) => product._id === id) || null;
  };

  const cartItem = findProductInCart(product._id);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleQuantity = (type, id) => {
    if (type === "increment") {
      dispatch(updateQuantity({ type, id }));
    } else if (type === "decrement") {
      if (cartItem && cartItem.quantity === 1) {
        dispatch(removeFromCart({ id }));
      } else {
        dispatch(updateQuantity({ type, id }));
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-[60%] p-5 md:p-8 relative max-h-[75vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          onClick={onClose}
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Product Image */}
          <div className="w-full md:w-2/5">
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-3/5">
            {/* Product Name */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {product.name}
            </h2>

            {/* Pricing */}
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-orange-600">
                ₹{product.price}
              </span>
              {product.oldPrice && (
                <span className="text-gray-400 text-sm line-through ml-3">
                  ₹{product.oldPrice}
                </span>
              )}
            </div>

            {/* Product Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.description ||
                "This is a premium product, crafted with care to offer an exceptional experience. Perfect for your needs and lifestyle."}
            </p>

            {/* Product Meta */}
            <div className="text-sm text-gray-500 mb-4">
              <p>
                <strong>Category:</strong> {product.category} -{" "}
                {product.subcategory}
              </p>
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
              
            </div>

            {/* Add to Cart / Quantity Controls */}
            {cartItem ? (
                    <div className="mt-2 flex items-center justify-center group  group-hover:bg-primary text-sm font-semibold bg-gradient-to-br from-orange-600 to-orange-400  transition duration-200 text-gray-50 border rounded-full ">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantity("decrement", product._id);
                        }}
                        className="  pl-2 pr-2  py-2  rounded-l-full "
                      >
                        -
                      </button>
                      <span className="px-4">{cartItem.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantity("increment", product._id);
                        }}
                        className=" pr-2 pl-2 py-2  rounded-r-full "
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
                      className=" flex items-center w-full justify-center px-4 py-2 text-sm font-semibold rounded-full  text-orange-600 border border-orange-600 bg-transparent  hover:bg-primary  transition duration-200 hover:text-gray-50"
                    >
                      <i className="ri-shopping-basket-fill"></i>
                      <span className="pl-2">Cart</span>
                    </button>
                  )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPopup;
