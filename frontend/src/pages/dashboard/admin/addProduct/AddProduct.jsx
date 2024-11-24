import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";
import { useFetchAllCategoriesQuery } from "../../../../redux/features/categories/categoriesApi";
import { useAddProductMutation } from "../../../../redux/features/products/productsApi";

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);

  const [category, setCategory] = useState([]);
  const { data } = useFetchAllCategoriesQuery();

  useEffect(() => {
    if (data) {
      // Format the data to match the required structure
      const formattedCategories = data.map((category) => ({
        label: category.name,
        value: category.name,
        subcategories: category.subcategories.map((subcategory) => ({
          label: subcategory.name,
          value: subcategory.name,
        })),
      }));

      console.log(formattedCategories);

      setCategory(formattedCategories); // Store the formatted categories in state
    }
  }, [data]);

  const categories = category;
  console.log(categories);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    brand: "",
    subcategory: "",
    price: "",
    oldPrice: "",
    description: "",
    gst: "",
    weight: "",
  });
  const [image, setImage] = useState("");

  const [AddProduct, { isLoading, error }] = useAddProductMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProduct({
      ...product,
      category: selectedCategory,
      subcategory: "", // Reset subcategory when category changes
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.category ||
      !product.subcategory ||
      !product.price ||
      !product.description ||
      !product.brand ||
      !product.gst ||
      !product.weight
    ) {
      alert("Please fill all the required fields");
      return;
    }

    try {
      await AddProduct({ ...product, image, author: user?._id }).unwrap();
      alert("Product added successfully");
      setProduct({
        name: "",
        category: "",
        subcategory: "",
        brand: "",
        price: "",
        description: "",
        oldPrice: "",
        gst: "",
        weight: "",
      });
      setImage("");
      navigate("/shop");
    } catch (error) {
      console.log("Failed to submit product", error);
    }
  };

  // Get the selected category's subcategories
  const selectedCategory = categories.find(
    (cat) => cat.value === product.category
  );
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <UploadImage
          name="image"
          id="image"
          value={(e) => setImage(e.target.value)}
          placeholder="Image"
          setImage={setImage}
        />

        <TextInput
          label="Product Name"
          name="name"
          placeholder="Ex: Rice"
          value={product.name}
          onChange={handleChange}
        />
        <TextInput
          label="Weight"
          name="weight"
          placeholder="Ex: 1kg or 200g"
          value={product.weight}
          onChange={handleChange}
        />
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleCategoryChange}
          options={[{ label: "Select Category", value: "" }, ...categories]}
        />
        <SelectInput
          label="Subcategory"
          name="subcategory"
          value={product.subcategory}
          onChange={handleChange}
          options={[
            { label: "Select Subcategory", value: "" },
            ...subcategories,
          ]}
        />
        <TextInput
          label="Brand Name"
          name="brand"
          placeholder="Ex: Udhaiyam"
          value={product.brand}
          onChange={handleChange}
        />

        <TextInput
          label="Price"
          name="price"
          type="number"
          placeholder="Ex: 100"
          value={product.price}
          onChange={handleChange}
        />

        <TextInput
          label="old price"
          name="oldPrice"
          type="number"
          placeholder="Ex: 200"
          value={product.oldPrice}
          onChange={handleChange}
        />

        <TextInput
          label="GST"
          name="gst"
          type="gst"
          placeholder="Ex: 10%"
          value={product.gst}
          onChange={handleChange}
        />

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 h-40"
            value={product.description}
            placeholder="Write a product description"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* submit button */}
        <div>
          <button
            type="submit"
            className={`mt-4 w-full bg-orange-600 text-white py-3 px-4 rounded-md shadow-lg transition-all duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
