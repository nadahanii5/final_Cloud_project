const mongoose = require("mongoose");
const Meal = require("./mealModel");

const cartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        meal: {
          type: mongoose.Schema.ObjectId,
          ref: "Meal",
          required: false,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        // note: String,
        // price: Number,
      },
    ],
    //  totalCartPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
