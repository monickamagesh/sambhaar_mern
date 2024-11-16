const express = require("express");
const User = require("./user.model");
const generateToken = require("../middleware/generateToken");
const verifyToken = require("../middleware/verifyToken");
const fileUpload = require("express-fileupload");
const router = express.Router();

// File upload setup
router.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
    createParentPath: true,
  })
);

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
    const users = await User.find({}, "id email role").sort({ createdAt: -1 });
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


//Update Profile
router.patch('/edit-profile', async (req, res) => {
  try {
    const { userId, username, phoneNumber, address } = req.body;
    let profileImage = "";
    
    if (req.files && req.files.profileImage) {
      const profileImageFile = req.files.profileImage;
      profileImage = `/uploads/${Date.now()}_${profileImageFile.name}`;
      profileImageFile.mv(path.join(__dirname, "..", "public", profileImage), (err) => {
        if (err) return res.status(500).send({ message: "Error uploading image" });
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { 
      username, 
      phoneNumber, 
      address, 
      profileImage 
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile", error);
    res.status(500).send({ message: "Error updating profile" });
  }
});

module.exports = router;
