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

//categories with subcategories
const categories = [
  {
    label: "Select Category",
    value: "",
    subcategories: [{ label: "Select Category", value: "" }],
  },
  {
    label: "Fresh Vegetables & Fruits",
    value: "Fresh Vegetables & Fruits",
    subcategories: [
      { label: "Fresh Vegetables", value: "Fresh Vegetables" },
      { label: "Fresh Fruits", value: "Fresh Fruits" },
    ],
  },
  {
    label: "Indian Grocery",
    value: "Indian Grocery",
    subcategories: [
      { label: "Appalam | Vathal | Vadam", value: "Appalam | Vathal | Vadam" },
      { label: "Bakery | Bread | Cakes", value: "Bakery | Bread | Cakes" },
      {
        label: "Cookies | Biscuits | Rusk",
        value: "Cookies | Biscuits | Rusk",
      },
      { label: "Atta | Flours | Sooji", value: "Atta | Flours | Sooji" },
      { label: "Dairy | Beverages", value: "Dairy | Beverages" },
      { label: "Cooking Oil | Ghee", value: "Cooking Oil | Ghee" },
      { label: "Dals | Pulses | Grains", value: "Dals | Pulses | Grains" },
      { label: "Fruit Mix", value: "Fruit Mix" },
      { label: "Dry Fruits | Nuts", value: "Dry Fruits | Nuts" },
      {
        label: "Indian Masala | Spices | Salt",
        value: "Indian Masala | Spices | Salt",
      },
      { label: "Rice | Rice Products", value: "Rice | Rice Products" },
      {
        label: "Sugar | Sweeteners | Jaggery",
        value: "Sugar | Sweeteners | Jaggery",
      },
      { label: "Snacks | Packaged Food", value: "Snacks | Packaged Food" },
    ],
  },
  {
    label: "Puja Needs & Idols",
    value: "Puja Needs & Idols",
    subcategories: [
      { label: "Idols", value: "Idols" },
      { label: "Puja Needs", value: "Puja Needs" },
    ],
  },
  {
    label: "Evergreen",
    value: "Evergreen",
    subcategories: [
      { label: "South Vegies & Fruits", value: "South Vegies & Fruits" },
      { label: "Indian Sweets", value: "Indian Sweets" },
      { label: "South Snacks", value: "South Snacks" },
    ],
  },
  {
    label: "South Cookware",
    value: "South Cookware",
    subcategories: [
      { label: "Cookware", value: "Cookware" },
      { label: "Clay Cookware", value: "Clay Cookware" },
    ],
  },
  {
    label: "Handlooms",
    value: "Handlooms",
    subcategories: [
      { label: "For Women", value: "For Women" },
      { label: "For Men", value: "For Men" },
      { label: "Accessories", value: "Accessories" },
    ],
  },
  {
    label: "Personal Care",
    value: "Personal Care",
    subcategories: [
      { label: "Bath & Hand wash", value: "Bath & Hand wash" },
      { label: "Hair Care", value: "Hair Care" },
      { label: "Oral Care", value: "Oral Care" },
    ],
  },
  {
    label: "Cleaning & Household",
    value: "Cleaning & Household",
    subcategories: [
      { label: "Cleaners", value: "Cleaners" },
      { label: "Detergents | Dish wash", value: "Detergents | Dish wash" },
    ],
  },
  { label: "South Special Grocery", value: "South Special Grocery" },
  {
    label: "Specials",
    value: "Specials",
    subcategories: [
      {
        label: "Dals, Pulses & Millets, Gbappa Grocery",
        value: "Dals, Pulses & Millets, Gbappa Grocery",
      },
      {
        label: "Grains & Flours, Grocery, Meela",
        value: "Grains & Flours, Grocery, Meela",
      },
      {
        label: "Monthly Essentials, Specials",
        value: "Monthly Essentials, Specials",
      },
    ],
  },
];

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    brand: "",
    subcategory: "",
    price: "",
    oldPrice: "",
    description: "",
    gst: "",
    quantity: "",
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
    quantity,
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
        quantity: quantity || "",
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
          label="Quantity"
          name="quantity"
          placeholder="Ex: 1kg or 200g"
          value={product.quantity}
          onChange={handleChange}
        />
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleCategoryChange}
          options={categories}
        />
        <SelectInput
          label="Subcategory"
          name="subcategory"
          value={product.subcategory}
          onChange={handleChange}
          options={subcategories}
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
