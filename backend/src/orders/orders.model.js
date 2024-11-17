const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: { type: String, required: true, unique: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        name: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        subcategory: {
          type: String,
          required: true,
        },
        brand: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
      },
    ],
    amount: { type: Number, required: true },
    email: { type: String, required: true },
    orderStatus: {
      type: String,
      enum: ["Ordered", "Processing", "Shipped", "Completed"],
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Phonepe"],
      default: "Cash",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
