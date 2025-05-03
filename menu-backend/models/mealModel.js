const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
});

const MealModel = mongoose.model("Meal", mealSchema);

module.exports = MealModel;
