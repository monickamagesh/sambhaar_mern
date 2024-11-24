const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  subcategories: [SubcategorySchema], // Array of subcategories
});

const Categories = mongoose.model('Category', CategorySchema);

module.exports = Categories;
