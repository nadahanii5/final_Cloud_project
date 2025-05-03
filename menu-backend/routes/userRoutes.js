const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const protect = require("../middlewares/authMiddleware"); // Assuming you've created auth middleware

router.get("/me", protect, userController.getUserDetails);

// Update user details (protected)
router.put("/me", protect, userController.updateUserDetails);

// Change password (protected)
router.put("/change-password", protect, userController.changePassword);

module.exports = router;
