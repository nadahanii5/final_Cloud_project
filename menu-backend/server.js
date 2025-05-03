const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes"); // Import user routes
const authRoutes = require("./routes/authRoutes"); // Import auth routes
const connectDB = require("./config/database");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 3030;

if (!process.env.DB_URI) {
  console.error("❌ : uri error. DB_URI is undefined.");
  process.exit(1);
} else {
  console.log("✅ MongoDB URI:", process.env.DB_URI);
}

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/menu", menuRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRoutes); // Use the user routes for authentication
app.use("/auth", authRoutes); // Use the auth routes for authentication

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
console.log("Server started successfully.");
