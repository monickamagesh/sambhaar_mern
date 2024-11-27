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

  // Thresholds for rewards
  const thresholds = [
    { value: 499, reward: "Free Product A" },
    { value: 799, reward: "Free Product B" },
    { value: 999, reward: "Free Product C" },
    { value: 1499, reward: "Free Product D" },
  ];

  // Calculate total cart value
  const totalValue = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Get the next reward based on the cart value
  const nextReward = thresholds.find((t) => totalValue < t.value);

  // Get the current unlocked rewards
  const unlockedReward = thresholds.filter((t) => totalValue >= t.value);

  const handleQuantity = (type, id) => {
    if (type === "increment") {
      dispatch(updateQuantity({ type, id }));
    } else if (type === "decrement") {
      const item = products.find((product) => product._id === id);
      if (item.quantity === 1) {
        dispatch(removeFromCart({ id }));
      } else {
        dispatch(updateQuantity({ type, id }));
      }
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleCheckout = (e) => {
    e.stopPropagation();
    onClose();
    navigate("/order-summary");
  };

  return (
    <div
      className={`fixed z-[100] inset-0 bg-black bg-opacity-50 flex justify-center transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed right-0 top-0 w-[29%] flex justify-between flex-col text-gray-600 bg-white h-full overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-start flex-col">
          {/* Header */}
          <div className="sticky top-0 px-6 border-b border bg-white w-full py-4 z-[120]">
            <div className="flex justify-between items-center">
              <div className="text-primary">
                <i className="ri-shopping-cart-fill ri-xl"></i>
                <span className="inline-block text-medium pl-2 font-semibold">
                  {products.length} {products.length > 1 ? "Items" : "Item"}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-primary hover:text-primary-dark"
              >
                <i className="ri-close-circle-fill ri-xl"></i>
              </button>
            </div>
          </div>

          {/* Reward Pipe */}
          <div className="p-4 border-b">
            <h5 className="text-sm font-semibold mb-4">Rewards Progress</h5>
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              {/* Pipe (Progress) */}
              <div
                className="absolute top-0 left-0 h-full bg-green-600 transition-all"
                style={{ width: `${(totalValue / thresholds[thresholds.length - 1].value) * 100}%` }}
              ></div>
            </div>

            {/* Free Product Icons and Rewards */}
            <div className="flex justify-between mt-4">
              {thresholds.map((threshold, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-xs"
                  style={{
                    width: `${(threshold.value / thresholds[thresholds.length - 1].value) * 100}%`,
                    position: "relative",
                  }}
                >
                  {/* Icon for product unlocked */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mb-2 ${
                      totalValue >= threshold.value
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-400 border-2 border-gray-400"
                    }`}
                  >
                    <i className={`ri-check-line text-xs`}></i>
                  </div>
                  {/* Reward Description */}
                  <p
                    className={`text-center ${totalValue >= threshold.value ? "text-green-600" : "text-gray-400"}`}
                  >
                    {totalValue >= threshold.value ? threshold.reward : `₹${threshold.value}`}
                  </p>
                </div>
              ))}
            </div>

            {/* Reward Message */}
            {nextReward ? (
              <p className="text-sm text-gray-600 mt-4">
                Add ₹{nextReward.value - totalValue} more to get{" "}
                <span className="font-semibold text-green-600">
                  {nextReward.reward}
                </span>!
              </p>
            ) : (
              <p className="text-sm text-green-600 mt-4 font-semibold">
                You’ve unlocked all rewards!
              </p>
            )}
          </div>

          {/* Cart Items */}
          <div className="p-4">
            <div className="cart-items space-y-4">
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
                          className="flex justify-center items-center"
                        >
                          +
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantity("decrement", item._id)}
                          className="flex justify-center items-center"
                        >
                          -
                        </button>
                      </div>

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 p-2 object-fill rounded-md"
                      />

                      <div className="items-start flex flex-col gap-1">
                        <h5 className="text-sm font-semibold">{item.name}</h5>
                        <p className="text-primary font-semibold text-sm">
                          ₹{item.price.toFixed(2)}
                        </p>
                        <p className="text-gray-600 text-xs">
                          {item.quantity} x {item.weight}
                        </p>
                      </div>
                    </div>

                    <div className="ml-5 flex gap-4 items-center">
                      <p className="text-sm text-gray-700 font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-gray-500 hover:text-primary"
                      >
                        <i className="ri-close-fill"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {products.length > 0 && (
          <div className="sticky bottom-0 bg-white w-full py-4 z-[120]">
            <div
              onClick={handleCheckout}
              className="flex justify-between items-center bg-primary hover:bg-primary-dark text-sm font-semibold text-white py-1 px-1 pl-8 mx-8 rounded-full transition"
            >
              <p>Checkout</p>
              <p className="bg-white text-sm font-semibold px-4 py-3.5 flex justify-center rounded-full text-primary">
                ₹{totalValue.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModel;