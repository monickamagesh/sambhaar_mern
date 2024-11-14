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
      },
    ],
    amount: { type: Number, required: true },
    email: { type: String, required: true },
    OrderStatus: {
      type: String,
      enum: ["Pending", "Ordered", "Processing", "Shipped", "Completed"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "phonepe"],
      default: "cod",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
