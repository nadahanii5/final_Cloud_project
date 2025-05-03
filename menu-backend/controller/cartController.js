const cartService = require("../services/cartServices");

exports.addMealToCart = async (req, res) => {
  try {
    const {
      mealId,
      quantity,
      //
      // price,
      // note
    } = req.body;

    // const totalCartPrice = quantity * price;
    //
    // Call the service to add the meal to the cart
    const cart = await cartService.addMealToCart({
      mealId,
      quantity,
      //  price,
      //note,
      //totalCartPrice,
    });

    // Return success response
    res.status(200).json({
      message: "Meal added to cart",
      // cart,
    });
  } catch (err) {
    // Return error response in case of failure
    res.status(500).json({ error: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    // Call the service to get the cart
    const cart = await cartService.getCart();

    // Return success response
    res.status(200).json({
      message: "Cart retrieved successfully",
      cart,
    });
  } catch (err) {
    // Return error response in case of failure
    res.status(500).json({ error: err.message });
  }
};
exports.removeMealFromCart = async (req, res) => {
  try {
    const { mealId } = req.params;

    const cart = await cartService.removeMealFromCart(mealId);

    res.status(200).json({
      message: "Meal removed from cart",
      cart,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearCart();

    res.status(200).json({
      message: "Cart cleared successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateMealInCart = async (req, res) => {
  try {
    const { mealId } = req.params; // Extract mealId from the URL parameters
    const { quantity, note } = req.body; // Extract the updated quantity and note from the request body

    const cart = await cartService.updateMealQuantity(mealId, quantity, note);

    res.status(200).json({
      message: "Meal updated in cart",
      cart,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
