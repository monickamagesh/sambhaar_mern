import React, { useEffect } from "react";
import RatingStars from "../../components/RatingStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const SingleProductPopup = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [product]);

  if (!product) return null; // Exit if no product is passed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        <section className="section__container">
          <div className="flex flex-col items-center md:flex-row gap-8">
            <div className="md:w-1/2 w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover"
              />
            </div>
            <div className="md:w-1/2 w-full">
              <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
              <p className="text-primary-dark text-xl">
                ${product.price}{" "}
                {product.oldPrice && <s>${product.oldPrice}</s>}
              </p>
              <p className="text-gray-400 mb-4">{product.description}</p>

              <div>
                <p>
                  <strong>Category:</strong> {product.category} ,{" "}
                  {product.subcategory}
                </p>
                <p>
                  <strong>Brand:</strong> {product.brand}
                </p>
                <strong>Rating: </strong>
                <RatingStars rating={product.rating} />
              </div>

              <button
                onClick={(e)=>{
                  e.stopPropagation();
                  handleAddToCart(product)
                }}
                className="mt-6 px-6 py-3 bg-primary rounded-md text-white"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </section>

        {/* Display reviews */}
        <section className="mt-8">
          <h4 className="text-lg font-semibold">Reviews Here </h4>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
            aliquam inventore, accusantium saepe nobis, nulla aperiam fugit
            magnam beatae sunt sapiente non, quod ipsa dignissimos obcaecati
            quaerat. Soluta, illum tenetur!
            {/* Additional review text */}
          </p>
        </section>
      </div>
    </div>
  );
};

export default SingleProductPopup;
