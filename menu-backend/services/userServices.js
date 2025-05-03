const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const getUserById = async (userId) => {
  return await User.findById(userId);
};

const updateUser = async (userId, updatedData) => {
  return await User.findByIdAndUpdate(userId, updatedData, { new: true });
};

const changeUserPassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Invalid current password");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return true;
};

module.exports = {
  getUserById,
  updateUser,
  changeUserPassword,
};
