import React, { useState, useEffect } from 'react';
import { useFetchAllCategoriesQuery } from '../../redux/features/categories/categoriesApi';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories
  const { data, error, isLoading } = useFetchAllCategoriesQuery();

  useEffect(() => {
    if (data) {
      // Format the data to match the required structure
      const formattedCategories = data.map((category) => ({
        label: category.name,
        value: category.name,
        subcategories: category.subcategories.map(subcategory => ({
            label: subcategory.name,
            value: subcategory.name
        }))
      }));

      console.log(formattedCategories)
      
      setCategories(formattedCategories);  // Store the formatted categories in state
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching categories</p>;

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <h2>{category.value}</h2>
            <ul>
              {category.subcategories.map((subcategory, subIndex) => (
                <li key={subIndex}>{subcategory.value}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
