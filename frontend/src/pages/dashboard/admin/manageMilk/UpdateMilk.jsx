import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchMilkByIdQuery,
  useUpdateMilkMutation,
} from "../../../../redux/features/milks/milksApi"; // Adjust according to your API slice
import { useFetchAllCategoriesQuery } from "../../../../redux/features/categories/categoriesApi";
import UploadImage from "../addProduct/UploadImage";
import TextInput from "../addProduct/TextInput";
import SelectInput from "../addProduct/SelectInput";

const UpdateMilk = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [categories] = useState([
    { label: "Aavin", value: "aavin" },
    { label: "Arokya", value: "arokya" },
  ]);

  const [milk, setMilk] = useState({
    name: "",
    category: "",
    price: "",
    weight: "",
    image: "",
  });

  const {
    data: milkData,
    isLoading: isMilkLoading,
    error: fetchError,
    refetch,
  } = useFetchMilkByIdQuery(id);

  const [newImage, setNewImage] = useState(null);

  const {
    name,
    category,
    price,
    weight,
    image: imageURL,
  } = milkData?.milk || {};

  const [updateMilk, { isLoading: isUpdating, error: updateError }] =
    useUpdateMilkMutation();

  useEffect(() => {
    if (milkData) {
      setMilk({
        name: name || "",
        category: category || "",
        price: price || "",
        weight: weight || "",
        image: imageURL || "",
      });
    }
  }, [milkData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMilk({
      ...milk,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setMilk({
      ...milk,
      category: selectedCategory,
    });
  };

  const handleImageChange = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedMilk = {
      ...milk,
      image: newImage ? newImage : milk.image,
      author: user?._id,
    };

    try {
      await updateMilk({ id: id, ...updatedMilk }).unwrap();
      alert("Milk updated successfully");
      await refetch();
      navigate("/dashboard/manage-milks"); // Change route as needed
    } catch (error) {
      console.error("Failed to update milk:", error);
    }
  };

  if (isMilkLoading) return <div>Loading....</div>;
  if (fetchError) return <div>Error fetching milk product!...</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Update Milk</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <UploadImage
          name="image"
          id="image"
          value={newImage || milk.image}
          placeholder="Image"
          setImage={handleImageChange}
        />

        <TextInput
          label="Milk Name"
          name="name"
          placeholder="Ex: Full Cream milk"
          value={milk.name}
          onChange={handleChange}
        />

        <TextInput
          label="Weight"
          name="weight"
          placeholder="Ex: 1L or 500ml"
          value={milk.weight}
          onChange={handleChange}
        />

        <SelectInput
          label="Category"
          name="category"
          value={milk.category}
          onChange={handleCategoryChange}
          options={[{ label: "Select Category", value: "" }, ...categories]}
        />

        <TextInput
          label="Price"
          name="price"
          type="number"
          placeholder="Ex: 50"
          value={milk.price}
          onChange={handleChange}
        />


        <div>
          <button
            type="submit"
            className={`mt-4 w-full bg-orange-600 text-white py-3 px-4 rounded-md shadow-lg transition-all duration-300 ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUpdating ? "Updating..." : "Update Milk"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMilk;
