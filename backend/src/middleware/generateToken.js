const jwt = require("jsonwebtoken");
const User = require("../users/user.model");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }
    const token = jwt.sign({ user: user._id, role: user.role }, JWT_SECRET);
    return token;
  } catch (error) {}
};

module.exports = generateToken;