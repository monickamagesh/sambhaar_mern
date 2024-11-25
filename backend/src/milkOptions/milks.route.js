const express = require("express");
const Milks = require("./milks.model");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

// Create a new milk product
router.post("/create-milk", async (req, res) => {
  try {
    const newMilk = new Milks({
      ...req.body,
    });

    const savedMilk = await newMilk.save();
    res.status(201).send(savedMilk);
  } catch (error) {
    console.log("Error creating new milk product", error);
    res.status(500).send({ message: "Failed to create new milk product" });
  }
});

// Get all milk products with optional filtering
router.get("/", async (req, res) => {
  try {
    const milks = await Milks.find();
    res.status(200).send({ milks });
  } catch (error) {
    console.log("Error fetching milks", error);
    res.status(500).send({ message: "Error fetching milks" });
  }
});

// Get a single milk product by id
router.get("/:id", async (req, res) => {
  try {
    const milkId = req.params.id;
    const milk = await Milks.findById(milkId)

    if (!milk) {
      return res.status(404).send({ message: "Milk not found" });
    }

    res.status(200).send({ milk });
  } catch (error) {
    console.log("Error fetching single milk product", error);
    res.status(500).send({ message: "Error fetching single milk product" });
  }
});

// Update a milk product
router.patch("/update-milk/:id", async (req, res) => {
  try {
    const milkId = req.params.id;
    const updatedMilk = await Milks.findByIdAndUpdate(
      milkId,
      { ...req.body },
      { new: true }
    );

    if (!updatedMilk) {
      return res.status(400).send({ message: "Milk not found" });
    }

    res.status(200).send({
      message: "Milk product updated successfully",
      milk: updatedMilk,
    });
  } catch (error) {
    console.log("Error updating the milk product", error);
    res.status(500).send({ message: "Error updating the milk product" });
  }
});

// Delete a milk product
router.delete("/:id",  async (req, res) => {
  try {
    const milkId = req.params.id;
    const deletedMilk = await Milks.findByIdAndDelete(milkId);

    if (!deletedMilk) {
      return res.status(404).send({ message: "Milk not found" });
    }

    res.status(200).send({
      message: "Milk product deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting the milk product", error);
    res.status(500).send({ message: "Error deleting the milk product" });
  }
});

// Get related milk products (based on category)
router.get("/related/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Milk ID is required" });
    }

    const milk = await Milks.findById(id);
    if (!milk) {
      return res.status(404).send({ message: "Milk not found" });
    }

    const relatedMilks = await Milks.find({
      _id: { $ne: id }, // Exclude the current milk
      category: milk.category, // Match the same category
    });

    res.status(200).send(relatedMilks);
  } catch (error) {
    console.log("Error fetching the related milks", error);
    res.status(500).send({ message: "Error fetching the related milks" });
  }
});

module.exports = router;
