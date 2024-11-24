
const express = require("express");
const Categories = require("./categories.model");
const router = express.Router();

// Create a new category
router.post("/create-category", async (req, res) => {
  try {
    const { name, subcategories } = req.body;

    const newCategory = new Categories({
      name,
      subcategories,
    });

    const savedCategory = await newCategory.save();
    res.status(201).send(savedCategory);
  } catch (error) {
    console.error("Error creating new category:", error);
    res.status(500).send({ message: "Failed to create new category" });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).send(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send({ message: "Failed to fetch categories" });
  }
});

// Get a single category by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Categories.findById(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).send({ message: "Failed to fetch category" });
  }
});

// Update a category
router.patch("/update-category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subcategories } = req.body;

    const updatedCategory = await Categories.findByIdAndUpdate(
      id,
      { name, subcategories },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({ message: "Category not found" });
    }

    res.status(200).send({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send({ message: "Failed to update category" });
  }
});

// Delete a category
router.delete("/delete-category/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Categories.findByIdAndDelete(id);
      res.status(200).send({ message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).send({ message: "Error deleting category" });
    }
  });

module.exports = router;
