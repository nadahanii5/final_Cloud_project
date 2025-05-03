const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

router.post("/add", cartController.addMealToCart);

router.get("/", cartController.getCart);

router.delete("/remove/:mealId", cartController.removeMealFromCart);

router.delete("/clear", cartController.clearCart);

router.put("/update/:mealId", cartController.updateMealInCart);

module.exports = router;
