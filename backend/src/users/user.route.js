const express = require("express");
const User = require("./user.model");
const generateToken = require("../middleware/generateToken");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();


//Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username, password });
    await user.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).send({ message: "Error registering user" });
  }
});

//Login user endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Password not match" });
    }
    const token = await generateToken(user._id);

    //console.log("token:", token)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).send({
      message: "Logged in successfully!",
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        profileImage: user.profileImage,
        address: {
          street: user.address?.street,
          city: user.address?.city,
          state: user.address?.state,
          postalCode: user.address?.postalCode,
          country: user.address?.country,
        },
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error logged in user", error);
    res.status(500).send({ message: "Error Logged in user!" });
  }
});

//logout endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Logged out successfully!" });
});

//delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully!" });
  } catch (error) {
    console.log("Error deleting user", error);
    res.status(500).send({ message: "Error deleting user" });
  }
});

//get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "id email role username profileImage phoneNumber").sort({ createdAt: -1 });
    res.status(200).send(users);
  } catch (error) {
    console.log("Error fetching user", error);
    res.status(500).send({ message: "Error fetching user" });
  }
});

//update your role
router.put("/users/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {role} = req.body;
    const user = await User.findByIdAndUpdate(id, {role}, {new: true});
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User role updated successfully!" });
  } catch (error) {
    console.log("Error updating user", error);
    res.status(500).send({ message: "Error updating user" });
  }
});


//Edit profile
router.patch("/edit-profile", async (req, res) => {
  try {
    const { userId, username, profileImage, address, phoneNumber } = req.body;
    
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // Update profile fields if provided
    if (username !== undefined) user.username = username;
    if (profileImage !== undefined) user.profileImage = profileImage;

    // Update address fields if provided
    if (address !== undefined) {
      if (address.street) user.address.street = address.street;
      if (address.city) user.address.city = address.city;
      if (address.state) user.address.state = address.state;
      if (address.postalCode) user.address.postalCode = address.postalCode;
      if (address.country) user.address.country = address.country;
    }

    // Update phone number if provided
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).send({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        address: user.address,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error updating user profile", error);
    res.status(500).send({ message: "Error updating user profile" });
  }
});


module.exports = router;
