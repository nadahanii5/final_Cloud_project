const MealModel = require("../models/mealModel");

// get all meals from the database
// desc: Get all meals
// route: GET /api/v1/meals
// access: Public

const getAllMeals = async (req, res) => {
  try {
    const meals = await MealModel.find(); //  Fetch all meals from DB
    console.log(meals);
    res.status(200).json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
    res.status(500).json({ message: "Error fetching meals." });
  }
};

const getMealsByCategory = async (req, res) => {
  try {
    const meals = await MealModel.find({ category: req.params.category });
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllMeals,
  getMealsByCategory,
};
