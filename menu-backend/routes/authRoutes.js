const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
// routes/authRoutes.js

// Register route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

module.exports = router;

// api
// http://localhost:8000/auth/register

// http://localhost:8000/auth/login
// http://localhost:8000/auth/logout
