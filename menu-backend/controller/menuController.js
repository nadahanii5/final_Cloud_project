const menuService = require("../services/menuService");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const validatorMiddleware = require("../middlewares/validatorMiddleware");

const getAllMeals = async (req, res) => {
  try {
    const meals = await menuService.getAllMeals();
    successResponse(res, meals);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getMealsByCategory = async (req, res) => {
  try {
    const meals = await menuService.getMealsByCategory(req.params.category);
    if (meals.length === 0)
      return errorResponse(res, "Category not found", 404);
    successResponse(res, meals);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = {
  getAllMeals,
  getMealsByCategory,
};
