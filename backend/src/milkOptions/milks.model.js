const mongoose = require("mongoose");

const MilkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["aavin", "arokya"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Milks = mongoose.model("Milk", MilkSchema);
module.exports = Milks;
