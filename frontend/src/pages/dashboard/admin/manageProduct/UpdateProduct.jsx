import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "../../../../redux/features/products/productsApi";
import SelectInput from "../addProduct/SelectInput";
import TextInput from "../addProduct/TextInput";
import UploadImage from "../addProduct/UploadImage";
import { useFetchAllCategoriesQuery } from "../../../../redux/features/categories/categoriesApi";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [fetchCategory, setFetchCategory] = useState([]);
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

      setFetchCategory(formattedCategories); // Store the formatted categories in state
    }
  }, [data]);

  const categories = fetchCategory;

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

  const {
    data: productData,
    isLoading: isProductLoading,
    error: fetchError,
    refetch,
  } = useFetchProductByIdQuery(id);

  const [newImage, setNewImage] = useState(null);

  const {
    name,
    category,
    brand,
    subcategory,
    oldPrice,
    gst,
    weight,
    description,
    image: imageURL,
    price,
  } = productData?.product || {};

  const [updateProduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      setProduct({
        name: name || "",
        category: category || "",
        price: price || "",
        description: description || "",
        image: imageURL || "",
        brand: brand || "",
        subcategory: subcategory || "",
        oldPrice: oldPrice || "",
        gst: gst || "",
        weight: weight || "",
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProduct({
      ...product,
      category: selectedCategory,
      subcategory: "", // Reset subcategory when category changes
    });
  };

  const handleImageChange = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      image: newImage ? newImage : product.image,
      author: user?._id,
    };

    try {
      await updateProduct({ id: id, ...updatedProduct }).unwrap();
      alert("Product updated successfully");
      await refetch();
      navigate("/dashboard/manage-products");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (isProductLoading) return <div>Loading....</div>;
  if (fetchError) return <div>Error fetching product!...</div>;

  // Get the selected category's subcategories
  const selectedCategory = categories.find(
    (cat) => cat.value === product.category
  );
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Update Product </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <UploadImage
          name="image"
          id="image"
          value={newImage || product.image}
          placeholder="Image"
          setImage={handleImageChange}
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

        <div>
          <button
            type="submit"
            className={`mt-4 w-full bg-orange-600 text-white py-3 px-4 rounded-md shadow-lg transition-all duration-300 ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isUpdating ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
