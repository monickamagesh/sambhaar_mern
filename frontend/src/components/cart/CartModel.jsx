import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import JSConfetti from "js-confetti";
import empty from "../../assets/cards/empty-cart.avif";

const CartModel = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const thresholds = [
    { value: 495, reward: "₹15 Vim pouch" },
    { value: 995, reward: "500g Sugar" },
    { value: 1995, reward: "2kg Aashirvaad Atta" },
    { value: 2995, reward: "1lts Goldwinner Oil" },
  ];

  const [lastUnlockedReward, setLastUnlockedReward] = useState(null);

  const jsConfetti = new JSConfetti();

  const totalValue = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const nextReward = thresholds.find((t) => totalValue < t.value);
  const unlockedReward = thresholds.filter((t) => totalValue >= t.value);

  useEffect(() => {
    if (isOpen && unlockedReward.length > 0) {
      const latestReward = unlockedReward[unlockedReward.length - 1];
      if (
        !lastUnlockedReward ||
        latestReward.value !== lastUnlockedReward.value
      ) {
        setLastUnlockedReward(latestReward);
        jsConfetti.addConfetti({});
      }
    }
  }, [totalValue, unlockedReward, lastUnlockedReward]);

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
        className={`fixed right-0 top-0 w-full sm:w-[60%] md:w-[50%] lg:w-[40%] text-gray-600 bg-white h-full overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="sticky top-0 px-6 border-b bg-white w-full py-4 z-[120]">
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

          {/* Rewards Progress */}
          <div className="p-4 border-b">
            <h5 className="text-xs font-semibold mb-2 text-primary">
              🎉 Rewards Progress
            </h5>
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-sm">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
                style={{
                  width: `${
                    (totalValue / thresholds[thresholds.length - 1].value) * 100
                  }%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              {thresholds.map((threshold, index) => {
                const isHighestUnlocked =
                  unlockedReward.length > 0 &&
                  threshold.value ===
                    unlockedReward[unlockedReward.length - 1].value;

                return (
                  <div
                    key={index}
                    className="text-center"
                    style={{ width: `${100 / thresholds.length}%` }}
                  >
                    {isHighestUnlocked ? (
                      <div className="text-green-600 font-semibold text-xs">
                        <i className="ri-check-line"></i>
                        <p>{threshold.reward}</p>
                      </div>
                    ) : (
                      <p className="text-gray-400 text-xs">
                        ₹{threshold.value}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 p-4 overflow-y-auto">
            {products.length === 0 ? (
              <div className="flex flex-col items-center space-y-4">
                <img
                  src={empty}
                  alt="Cart is empty"
                  className="w-40 h-40 mt-20 object-contain"
                />
                <p className="text-lg font-semibold text-gray-600">
                  Your cart is empty.
                </p>
                <p className="text-sm text-gray-500">
                  Add items to your cart and they will appear here.
                </p>
              </div>
            ) : (
              products.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center w-[28px] flex-col bg-slate-50 rounded-full">
                      <button
                        onClick={() => handleQuantity("increment", item._id)}
                        className="text-primary"
                      >
                        +
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantity("decrement", item._id)}
                        className="text-primary"
                      >
                        -
                      </button>
                    </div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h5 className="text-sm font-semibold">{item.name}</h5>
                      <p className="text-primary font-semibold text-sm">
                        ₹{item.price.toFixed(2)}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {item.quantity} x {item.weight}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
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

          {/* Checkout Section */}
          {products.length > 0 && (
            <div className="sticky bottom-0 bg-white w-full py-4 z-[120]">
              <div
                onClick={handleCheckout}
                className="flex justify-between items-center bg-gradient-to-br from-orange-600 to-orange-400 hover:from-primary-dark hover:to-orange-600 duration-200 text-gray-50  text-sm font-semibold  py-1 px-1 pl-8 mx-8 rounded-full transition"
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
    </div>
  );
};

export default CartModel;
