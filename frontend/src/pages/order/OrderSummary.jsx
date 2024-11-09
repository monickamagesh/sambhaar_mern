import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart, updateQuantity } from "../../redux/features/cart/cartSlice";
import Products from "../../components/shop/Products";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.cart.products);
  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector((store) => store.cart);

  const handleQuantity = (type, id) => {
    dispatch(updateQuantity({ type, id }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="mt-5 rounded text-base p-4">
      <h2 className="text-xl text-text-dark mb-4">Order Summary</h2>

      {products.length === 0 ? (
        <div>Your cart is empty
        </div>
        
      ) : (
        <div className="space-y-5">
          {products.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4">
              <span className="mr-4 px-1 bg-primary text-white rounded-full">0{index + 1}</span>
              <img src={item.image} alt={item.name} className="size-12 object-cover mr-4" />
              <div>
                <h5 className="text-lg font-medium">{item.name}</h5>
                <p className="text-gray-600 text-sm">${Number(item.price).toFixed(2)}</p>
              </div>
              <div className="flex flex-row md:justify-start justify-end items-center mt-2">
                <button
                  onClick={() => handleQuantity("decrement", item._id)}
                  className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-8"
                >
                  -
                </button>
                <span className="px-2 text-center mx-1">{item.quantity}</span>
                <button
                  onClick={() => handleQuantity("increment", item._id)}
                  className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="ml-5 text-gray-600 hover:text-red-600"
                >
                  <i className="ri-close-fill ri-sm"></i>
                </button>
              </div>
            </div>
          ))}

          {/* Display totals */}
          <div className="px-4 mb-6">
            <p className="text-text-dark mt-2">Selected Items: {selectedItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p className="font-bold">Tax({taxRate * 100}%) : ${tax.toFixed(2)}</p>
            <h3 className="font-bold">Grand Total: ${grandTotal.toFixed(2)}</h3>
          </div>

          {/* Clear cart and proceed buttons */}
          <button
            onClick={handleClearCart}
            className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md mb-4"
          >
            Clear Cart
          </button>
          <button className="bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md">
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
