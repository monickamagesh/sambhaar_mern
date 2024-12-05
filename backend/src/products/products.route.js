const express = require("express");
const Products = require("./products.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

//post a product
router.post("/create-product", async (req, res) => {
  try {
    const newProduct = new Products({
      ...req.body,
    });
    const savedProduct = await newProduct.save();
    res.status(201).send(savedProduct);
  } catch (error) {
    console.log("Error creating new product", error);
    res.status(500).send({ message: "Failed to create new product" });
  }
});

//get all products
router.get("/", async (req, res) => {
  try {
    const {
      category,
      brand,
      subcategory,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
    } = req.query;

    let filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }
    if (brand && brand !== "all") {
      filter.brand = brand;
    }
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (!isNaN(min) && isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / parseInt(limit));
    const products = await Products.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "email")
      .sort({ createdAt: -1 });

    res.status(200).send({ products, totalPages, totalProducts });
  } catch (error) {
    console.log("Error fetching products", error);
    res.status(500).send({ message: "Error fetching products" });
  }
});

//get all products for search
// Get all products
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query; // Retrieve the search query
    const regex = new RegExp(query, "i"); // Case-insensitive regex for partial matching

    const filter = {
      $or: [
        { name: regex },
        { description: regex },
        { category: regex },
        { subcategory: regex },
        { brand: regex },
      ],
    };

    const products = await Products.find(filter);
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Failed to fetch products" });
  }
});

//get single product
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Products.findById(productId).populate(
      "author",
      "email username"
    );
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ product });
  } catch (error) {
    console.log("Error fetching single product", error);
    res.status(500).send({ message: "Error fetching single product" });
  }
});

//update a product
router.patch(
  "/update-product/:id",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedProduct = await Products.findByIdAndUpdate(
        productId,
        { ...req.body },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(400).send({ message: "Product not found" });
      }

      res.status(200).send({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.log("Error updating the product", error);
      res.status(500).send({ message: "Error updating the product" });
    }
  }
);

//delete a product
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Products.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting the product", error);
    res.status(500).send({ message: "Error deleting the product" });
  }
});

//get related products
router.get("/related/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const titleRegex = new RegExp(
      product.name
        .split(" ")
        .filter((word) => word.length > 1)
        .join("|"),
      "i"
    );

    const relatedProducts = await Products.find({
      _id: { $ne: id }, //Exclude the current product
      $or: [
        { name: { $regex: titleRegex } }, //match similar names
        { category: product.category }, //match the same category
      ],
    });

    res.status(200).send(relatedProducts);
  } catch (error) {
    console.log("Error fetching the related products", error);
    res.status(500).send({ message: "Error fetching the related products" });
  }
});

// Get all products that are reward eligible
// Router for rewarded products
router.get("/rewarded-products", async (req, res) => {
  try {
    console.log("Fetching reward-eligible products...");
    
    // Fetch reward-eligible products
    const rewardedProducts = await Products.find({ isRewardEligible: true });

    if (rewardedProducts.length === 0) {
      console.log("No reward-eligible products found.");
    } else {
      console.log("Rewarded products fetched successfully:", rewardedProducts);
    }

    res.status(200).json({ rewardedProducts });
  } catch (error) {
    console.error("Error fetching rewarded products:", error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
