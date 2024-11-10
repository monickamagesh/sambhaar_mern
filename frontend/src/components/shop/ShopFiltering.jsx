import React from "react";

const ShopFiltering = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
}) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <div>Filters</div>

      {/* category */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>

        <hr />
        {filters.categories.map((category) => (
          <label key={category}>
            <input
              type="radio"
              name="category"
              value={category}
              checked={filtersState.category === category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
            />
            <span className="ml-1">{category}</span>
          </label>
        ))}
      </div>

      {/* subcategory */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Subcategory</h4>

        <hr />
        {filters.subcategories.map((subcategory) => (
          <label key={subcategory}>
            <input
              type="radio"
              name="subcategory"
              value={subcategory}
              checked={filtersState.subcategory === subcategory}
              onChange={(e) =>
                setFiltersState({ ...filtersState, subcategory: e.target.value })
              }
            />
            <span className="ml-1">{subcategory}</span>
          </label>
        ))}
      </div>

      {/* brands */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Brands</h4>

        <hr />
        {filters.brands.map((brand) => (
          <label key={brand}>
            <input
              type="radio"
              name="brand"
              value={brand}
              checked={filtersState.brand === brand}
              onChange={(e) =>
                setFiltersState({ ...filtersState, brand: e.target.value })
              }
            />
            <span className="ml-1">{brand}</span>
          </label>
        ))}
      </div>

      {/* pricing */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>

        <hr />
        {filters.priceRanges.map((range) => (
          <label key={range.label}>
            <input
              type="radio"
              name="priceRange"
              value={`${range.min}-${range.max}`}
              checked={filtersState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) =>
                setFiltersState({ ...filtersState, priceRange: e.target.value })
              }
            />
            <span className="ml-1">{range.label}</span>
          </label>
        ))}
      </div>

      {/* clear filter */}
        <button onClick={clearFilters} className="bg-primary py-1 px-4 text-white rounded">
            Clear All Filters
        </button>
    </div>
  );
};

export default ShopFiltering;
