import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddMilkMutation } from "../../../../redux/features/milks/milksApi"; // Assuming you have an API to add milk
import UploadImage from "../addProduct/UploadImage";
import TextInput from "../addProduct/TextInput";
import SelectInput from "../addProduct/SelectInput";

const AddMilk = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Category for milk products (you could also fetch this from an API)
  const [categories] = useState([
    { label: "Aavin", value: "aavin" },
    { label: "Arokya", value: "arokya" },
  ]);

  const [milkData, setMilkData] = useState({
    name: "",
    category: "aavin", // Default category
    price: "",
    weight: "",
    image: "",
  });

  const [AddMilk, { isLoading, error }] = useAddMilkMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMilkData({
      ...milkData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setMilkData({
      ...milkData,
      category: selectedCategory,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !milkData.name ||
      !milkData.category ||
      !milkData.price ||
      !milkData.weight ||
      !milkData.image
    ) {
      alert("Please fill all the required fields");
      return;
    }

    try {
      const { name, category, price, weight, image } = milkData;
      await AddMilk({
        name,
        category,
        price,
        weight,
        image,
        author: user?._id,
      }).unwrap();
      alert("Milk product added successfully!");
      setMilkData({
        name: "",
        category: "aavin",
        price: "",
        weight: "",
        image: "",
      });
      navigate("/dashboard/manage-milks"); // Redirect after successful add
    } catch (error) {
      console.error("Failed to submit milk product", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Milk Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <UploadImage
          name="image"
          id="image"
          value={(e) => setMilkData({ ...milkData, image: e.target.value })}
          placeholder="Upload Milk Image"
          setImage={(image) => setMilkData({ ...milkData, image })}
        />

        {/* Milk Name */}
        <TextInput
          label="Milk Name"
          name="name"
          placeholder="Ex: Full Cream milk"
          value={milkData.name}
          onChange={handleChange}
        />

        {/* Weight */}
        <TextInput
          label="Weight"
          name="weight"
          placeholder="Ex: 1L or 500ml"
          value={milkData.weight}
          onChange={handleChange}
        />

        {/* Category Select */}
        <SelectInput
          label="Category"
          name="category"
          value={milkData.category}
          onChange={handleCategoryChange}
          options={categories}
        />

        {/* Price */}
        <TextInput
          label="Price"
          name="price"
          type="number"
          placeholder="Ex: 50"
          value={milkData.price}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`mt-4 w-full bg-orange-600 text-white py-3 px-4 rounded-md shadow-lg transition-all duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Milk Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMilk;
