import React from "react";
import { useDispatch } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CartModel = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantity = (type, id) => {
    dispatch(updateQuantity({ type, id }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleCheckout = (e) => {
    e.stopPropagation();
    onClose();
    navigate("/order-summary");
  };

  const calculateTotal = () => {
    return products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 flex  justify-center transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed right-0 top-0 w-[29%] flex justify-between py-4 flex-col bg-white h-full overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          {/* Cart Items */}
          <div className="cart-items space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-primary">
                <i className="ri-shopping-cart-fill ri-xl "></i>
                <span className="inline-block text-medium pl-2 font-semibold ">
                  {products.length} {products.length > 1 ? "Items" : "Item"}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-primary hover:text-primary-dark"
              >
                <i class="ri-close-circle-fill ri-xl"></i>
              </button>
            </div>

            {products.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              products.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center w-[28px] border flex-col rounded-full bg-slate-50">
                      <button
                        onClick={() => handleQuantity("increment", item._id)}
                        className=" flex justify-center items-center"
                      >
                        +
                      </button>
                      <span className="">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantity("decrement", item._id)}
                        className=" flex justify-center items-center"
                      >
                        -
                      </button>
                    </div>

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16  p-2 object-fill rounded-md"
                    />

                    <div className="items-start flex flex-col gap-1">
                      <h5 className="text-sm font-semibold">{item.name}</h5>
                      <p className="text-primary font-semibold text-sm">
                        ₹{item.price.toFixed(2)}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {item.quantity} x 1 lb
                      </p>
                    </div>
                  </div>

                  <div className="ml-5 flex gap-4 items-center">
                    <p className="text-sm font-semibold">₹{item.price.toFixed(2) * item.quantity}</p>
                    <button
                      onClick={(e) => handleRemove(e, item._id)}
                      className=""
                    >
                      <i class="ri-close-fill"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Cart Summary */}
        {products.length > 0 && (
          <div className="">
            <div
              onClick={handleCheckout}
              className=" flex justify-between items-center bg-primary hover:bg-primary-dark text-sm font-semibold text-white py-1 px-1 pl-8 mx-8 mt-6 rounded-full  transition"
            >
              <p>Checkout</p>
              <p className="bg-white  text-sm font-semibold px-4 py-3.5  flex justify-center rounded-full  text-primary">
                ₹{calculateTotal().toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModel;
