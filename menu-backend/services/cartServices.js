const Cart = require("../models/cartModel");

let globalCart = null;

exports.addMealToCart = async ({
  mealId,
  quantity,
  //price,
  // note
}) => {
  let cart = await Cart.findOne().maxTimeMS(30000); // Retrieve the first cart from the database (if it exists)

  if (!cart) {
    cart = new Cart({ cartItems: [] });
  }

  const existingItem = cart.cartItems.find(
    (item) => item.meal.toString() === mealId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.cartItems.push({
      meal: mealId,
      quantity,
      //price,
      //note,
      // totalCartPrice,
    });
  }

  // Recalculate total price
  cart.totalCartPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save(); // Save the updated cart in the database

  return cart;
};

exports.getCart = async () => {
  const cart = await Cart.findOne();
  return cart || { cartItems: [] };
};

exports.removeMealFromCart = async (mealId) => {
  const cart = await Cart.findOne();
  if (!cart) return null;

  const itemIndex = cart.cartItems.findIndex(
    (item) => item.meal.toString() === mealId
  );

  if (itemIndex !== -1) {
    cart.cartItems.splice(itemIndex, 1);
  }

  // Recalculate total price
  cart.totalCartPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();

  return cart;
};

exports.updateMealQuantity = async (mealId, quantity, note) => {
  const cart = await Cart.findOne(); // Retrieve the cart from the database
  if (!cart) return null; // If no cart exists, return null

  const existingItem = cart.cartItems.find(
    (item) => item.meal.toString() === mealId // Find the meal by ID
  );

  if (existingItem) {
    existingItem.quantity = quantity; // Update the quantity
    existingItem.note = note; // Update the note
  } else {
    // If meal doesn't exist in cart, we can add a new one
    cart.cartItems.push({
      meal: mealId,
      quantity,
      note,
      price: 0, // Set an initial price, you might want to retrieve it from the meal model
    });
  }

  // Recalculate total price
  cart.totalCartPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save(); // Save the updated cart in the database
  return cart; // Return the updated cart
};

exports.clearCart = async () => {
  const cart = await Cart.findOne(); // Retrieve the cart from the database
  if (!cart) return null;

  cart.cartItems = []; // Clear all cart items
  cart.totalCartPrice = 0;

  await cart.save(); // Save the cleared cart in the database

  return cart;
};
