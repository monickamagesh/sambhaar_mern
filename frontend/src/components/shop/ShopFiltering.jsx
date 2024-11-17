import React, { useState } from "react";

const ShopFiltering = ({ filtersState, setFiltersState, clearFilters, filters }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setFiltersState({ ...filtersState, category, subcategory: "" });
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleSubcategorySelect = (subcategory) => {
    setFiltersState({ ...filtersState, subcategory });
  };

  const handlePriceRangeSelect = (range) => {
    setFiltersState({ ...filtersState, priceRange: range.label });
  };

  return (
    <div className="space-y-5 flex-shrink-0">
      <div>Filters</div>

      {/* Category Accordion */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <div key={category.value} className="mb-2">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleCategorySelect(category.value)}
            >
              <span>{category.label}</span>
              {category.subcategories?.length > 0 && (
                <button>
                  {expandedCategory === category.value ? "-" : "+"}
                </button>
              )}
            </div>

            {/* Subcategories Accordion */}
            {expandedCategory === category.value && category.subcategories?.length > 0 && (
              <div className="ml-4 mt-2">
                {category.subcategories.map((subcategory) => (
                  <label key={subcategory.value} className="block">
                    <input
                      type="radio"
                      name="subcategory"
                      value={subcategory.value}
                      checked={filtersState.subcategory === subcategory.value}
                      onChange={() => handleSubcategorySelect(subcategory.value)}
                    />
                    <span className="ml-1">{subcategory.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {filters.priceRanges.map((range) => (
          <label key={range.label} className="block">
            <input
              type="radio"
              name="priceRange"
              value={range.label}
              checked={filtersState.priceRange === range.label}
              onChange={() => handlePriceRangeSelect(range)}
            />
            <span className="ml-1">{range.label}</span>
          </label>
        ))}
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="text-primary text-sm mt-3"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ShopFiltering;
