import React, { useState, useEffect } from "react";
import {
  useFetchAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../../redux/features/categories/categoriesApi";

const ManageCategories = () => {
    const { data: categories, isLoading, refetch } = useFetchAllCategoriesQuery();
    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
  
    const [formData, setFormData] = useState({
      name: "",
      subcategories: [],
      id: null,
    });
  
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    useEffect(() => {
      if (!isEditing) {
        setFormData({ name: "", subcategories: [], id: null });
      }
    }, [isEditing]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleAddSubcategory = () => {
      setFormData({
        ...formData,
        subcategories: [...formData.subcategories, ""],
      });
    };
  
    const handleSubcategoryChange = (index, value) => {
      const updatedSubcategories = formData.subcategories.map((sub, idx) =>
        idx === index ? value : sub
      );
      setFormData({ ...formData, subcategories: updatedSubcategories });
    };
  
    const handleRemoveSubcategory = (index) => {
      const updatedSubcategories = formData.subcategories.filter(
        (_, idx) => idx !== index
      );
      setFormData({ ...formData, subcategories: updatedSubcategories });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const subcategoriesArray = formData.subcategories.map((sub) => ({
        name: sub.trim(),
      }));
  
      if (isEditing) {
        await updateCategory({
          id: formData.id,
          name: formData.name,
          subcategories: subcategoriesArray,
        });
        alert("Category updated successfully");
      } else {
        await addCategory({
          name: formData.name,
          subcategories: subcategoriesArray,
        });
        alert("Category added successfully");
      }
  
      setFormData({ name: "", subcategories: [], id: null });
      setIsEditing(false);
      setIsModalOpen(false); // Close the modal after submit
    };
  
    const handleEdit = (category) => {
      setFormData({
        name: category.name,
        subcategories: category.subcategories.map((sub) => sub.name),
        id: category._id,
      });
      setIsEditing(true);
      setIsModalOpen(true); // Open modal when editing
    };
  
    const handleAddNew = () => {
      setFormData({ name: "", subcategories: [], id: null });
      setIsEditing(false);
      setIsModalOpen(true); // Open modal for adding new category
    };
  
    const handleCancelEdit = () => {
      setFormData({ name: "", subcategories: [], id: null });
      setIsEditing(false);
      setIsModalOpen(false); // Close modal on cancel
    };
  
    const handleDelete = async (categoryId) => {
      try {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this category?"
        );
        if (confirmDelete) {
          await deleteCategory(categoryId);
          alert("Category deleted successfully");
          await refetch();
        }
      } catch (error) {
        console.error("Error deleting category", error);
      }
    };
  
    if (isLoading) return <p>Loading categories...</p>;
  
    return (
      <div className="container mx-auto mt-8">
        <div className="flex w-full justify-between">
          <h2 className="text-2xl font-bold mb-6">All Categories</h2>
  
          {/* Add New Category Button */}
          <button
            onClick={handleAddNew}
            className="bg-primary text-white py-2 px-4 rounded-md shadow-md mb-6 transition-transform transform hover:scale-105"
          >
            Add New Category
          </button>
        </div>
  
        {/* Categories List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  {category.name}
                </h4>
                <div>
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-gray-900 px-3 py-1 rounded-md text-sm hover:text-primary transition-colors"
                  >
                    <i className="ri-edit-box-line ri-lg"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="hover:text-primary-dark text-primary"
                  >
                    <i className="ri-delete-bin-line ri-lg"></i>
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.subcategories.map((sub, index) => (
                  <span
                    key={index}
                    className="bg-gray-950 bg-opacity-5 text-sm text-gray-700 px-3 py-1 rounded-full"
                  >
                    {sub.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        {/* Modal for Add/Edit Category */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 transition-all ease-in-out duration-300">
            <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 md:w-8/12 lg:w-1/3 transform transition-all ease-in-out duration-500">
              <h3 className="text-2xl font-semibold mb-4 text-center">
                {isEditing ? "Edit Category" : "Add New Category"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Enter category name"
                    required
                  />
                </div>
  
                {/* Subcategories Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subcategories
                  </label>
                  {formData.subcategories.map((sub, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2 ">
                      <input
                        type="text"
                        value={sub}
                        onChange={(e) =>
                          handleSubcategoryChange(index, e.target.value)
                        }
                        className="p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder={`Subcategory ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSubcategory(index)}
                        className="text-red-500 text-xl"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddSubcategory}
                    className="text-primary mt-2 flex items-center space-x-1"
                  >
                    <span className="text-xs">+</span>
                    <span>Add Subcategory</span>
                  </button>
                </div>
  
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="bg-primary text-white py-2 px-4 rounded-md shadow-md"
                  >
                    {isEditing ? "Update Category" : "Add Category"}
                  </button>
                  <button
                    type="button"
                    className="border border-primary text-primary py-2 px-4 rounded-md shadow-md"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  

export default ManageCategories;