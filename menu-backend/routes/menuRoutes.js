const express = require("express"); // ✅ Import express here
const { getAllMeals, getMealsByCategory } = require("../services/mealServices");
const validatorMiddleware = require("../middlewares/validatorMiddleware");

const router = express.Router(); // ✅ Now express is defined

// Routes
router.get("/", getAllMeals);
router.get("/:category", getMealsByCategory);

module.exports = router;
