import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../../../redux/features/products/productsApi";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";

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

//brands
{
  /* 
    const brands = [
  { label: "Select Category", value: "" },
  { label: "Fryums", value: "Fryums" },
  { label: "SMS", value: "SMS" },
  { label: "Udhaiyam", value: "Udhaiyam" },
  { label: "ASR", value: "ASR" },
  { label: "Aval", value: "Aval" },
  { label: "Pampers", value: "Pampers" },
  { label: "Basmati Rice", value: "Basmati Rice" },
  { label: "Biscuits", value: "Biscuits" },
  { label: "Vaseline", value: "Vaseline" },
  { label: "Boiled Rice", value: "Boiled Rice" },
  { label: "Kitchen", value: "Kitchen" },
  { label: "Brahmins", value: "Brahmins" },
  { label: "Modern", value: "Modern" },
  { label: "Saravana", value: "Saravana" },
  { label: "Kissan", value: "Kissan" },
  { label: "Channa", value: "Channa" },
  { label: "Bingo", value: "Bingo" },
  { label: "Lays", value: "Lays" },
  { label: "Pringles", value: "Pringles" },
  { label: "Chocolate", value: "Chocolate" },
  { label: "Clips", value: "Clips" },
  { label: "AVT", value: "AVT" },
  { label: "Brookebond", value: "Brookebond" },
  { label: "RCM", value: "RCM" },
  { label: "Ariel", value: "Ariel" },
  { label: "RIN", value: "RIN" },
  { label: "Surf", value: "Surf" },
  { label: "Tide", value: "Tide" },
  { label: "VIM", value: "VIM" },
  { label: "Horlicks", value: "Horlicks" },
  { label: "Dry Fruits", value: "Dry Fruits" },
  { label: "Floppy", value: "Floppy" },
  { label: "Eastern", value: "Eastern" },
  { label: "Bakers", value: "Bakers" },
  { label: "Everest", value: "Everest" },
  { label: "G&L", value: "G&L" },
  { label: "Anil", value: "Anil" },
  { label: "Naga", value: "Naga" },
  { label: "Sakthi", value: "Sakthi" },
  { label: "Galaxy", value: "Galaxy" },
  { label: "Ambi Pur", value: "Ambi Pur" },
  { label: "GRB", value: "GRB" },
  { label: "RKG", value: "RKG" },
  { label: "Grain & Grace", value: "Grain & Grace" },
  { label: "Indulekha", value: "Indulekha" },
  { label: "Vatika", value: "Vatika" },
  { label: "Medimix", value: "Medimix" },
  { label: "Toothpowder", value: "Toothpowder" },
  { label: "Hersheys", value: "Hersheys" },
  { label: "Himalayan", value: "Himalayan" },
  { label: "Dabur", value: "Dabur" },
  { label: "Suction", value: "Suction" },
  { label: "Jaagery", value: "Jaagery" },
  { label: "Candy", value: "Candy" },
  { label: "Americana", value: "Americana" },
  { label: "KLF", value: "KLF" },
  { label: "Knife", value: "Knife" },
  { label: "KP Namboodiri", value: "KP Namboodiri" },
  { label: "LG", value: "LG" },
  { label: "Lighter", value: "Lighter" },
  { label: "Lotte", value: "Lotte" },
  { label: "Bambino", value: "Bambino" },
  { label: "Aachi", value: "Aachi" },
  { label: "Raoji", value: "Raoji" },
  { label: "Sanitary", value: "Sanitary" },
  { label: "Funfoods", value: "Funfoods" },
  { label: "Hellmanns", value: "Hellmanns" },
  { label: "Veeba", value: "Veeba" },
  { label: "Soya", value: "Soya" },
  { label: "MOP", value: "MOP" },
  { label: "Bell", value: "Bell" },
  { label: "Nandhini", value: "Nandhini" },
  { label: "Narasus", value: "Narasus" },
  { label: "Akash", value: "Akash" },
  { label: "Nutella", value: "Nutella" },
  { label: "Odonil", value: "Odonil" },
  { label: "Arogyam", value: "Arogyam" },
  { label: "Kaleeswari", value: "Kaleeswari" },
  { label: "Goldwinner", value: "Goldwinner" },
  { label: "Mr Gold", value: "Mr Gold" },
  { label: "Mysore Sandal", value: "Mysore Sandal" },
  { label: "Roobini", value: "Roobini" },
  { label: "SVS", value: "SVS" },
  { label: "VVD", value: "VVD" },
  { label: "Gillette", value: "Gillette" },
  { label: "H&S Shampoo", value: "H&S Shampoo" },
  { label: "OLAY", value: "OLAY" },
  { label: "Oldspice", value: "Oldspice" },
  { label: "ORAL B", value: "ORAL B" },
  { label: "Pantene", value: "Pantene" },
  { label: "Venus", value: "Venus" },
  { label: "Vicks", value: "Vicks" },
  { label: "Whisper", value: "Whisper" },
  { label: "Cups", value: "Cups" },
  { label: "Paperplate", value: "Paperplate" },
  { label: "Closeup", value: "Closeup" },
  { label: "Meswak", value: "Meswak" },
  { label: "Pepsodent", value: "Pepsodent" },
  { label: "Peeler", value: "Peeler" },
  { label: "Double Horse", value: "Double Horse" },
  { label: "PK", value: "PK" },
  { label: "ARC", value: "ARC" },
  { label: "Agarbathi", value: "Agarbathi" },
  { label: "Santhi", value: "Santhi" },
  { label: "KKK", value: "KKK" },
  { label: "Camphor", value: "Camphor" },
  { label: "Gopuram", value: "Gopuram" },
  { label: "Mangaldeep", value: "Mangaldeep" },
  { label: "Premium", value: "Premium" },
  { label: "Monica's", value: "Monica's" },
  { label: "Ambica", value: "Ambica" },
  { label: "MPR", value: "MPR" },
  { label: "Om Muruga", value: "Om Muruga" },
  { label: "Cotton Thiri", value: "Cotton Thiri" },
  { label: "Sri Ananda Vilas", value: "Sri Ananda Vilas" },
  { label: "All Spices", value: "All Spices" },
  {
    label: "Dals, Pulses & Millets, Gbappa Grocery",
    value: "Dals, Pulses & Millets, Gbappa Grocery",
  },
];
 */
}

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({
    name: "",
    category: "",
    brand: "",
    subcategory: "",
    price: "",
    oldPrice: "",
    description: "",
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
      !product.price ||
      !product.description ||
      !product.brand
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
          value={product.price}
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
            className="add-product-InputCSS h-40"
            value={product.description}
            placeholder="Write a product description"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
