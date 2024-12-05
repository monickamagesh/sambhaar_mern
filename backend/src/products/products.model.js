const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    gst: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    weight: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isRewardEligible: { 
      type: Boolean, 
      default: false 
    }, 
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", ProductSchema);
module.exports = Products;
