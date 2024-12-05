import React, { useState } from "react";

const ShopFiltering = ({
  filtersState,
  setFiltersState,
  clearFilters,
  filters,
}) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Toggle for mobile/tablet sidebar

  const handleCategorySelect = (category) => {
    setFiltersState({ ...filtersState, category, subcategory: "" });
    setExpandedCategory(expandedCategory === category ? null : category);
    setSelectedSubcategory(null); // Reset subcategory when a new category is selected
  };

  const handleSubcategorySelect = (subcategory) => {
    setFiltersState({ ...filtersState, subcategory });
    setSelectedSubcategory(subcategory);
  };

  return (
    <>
      {/* Hamburger Icon for Mobile/Tablet */}
      <div className="sm:hidden flex justify-between items-center px-6 py-3">
        <button
          className="text-xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar
        >
          <i className="ri-menu-4-line"></i>
        </button>
      </div>

      {/* Sidebar (only for small screens) */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen
            ? "transform translate-x-0"
            : "transform translate-x-full"
        } md:block w-64 sm:hidden`}
      >
        <div className="space-y-6 flex-shrink-0 py-8 right-0 h-auto w-64 ">
          {/* Category Accordion */}
          <div className="flex flex-col space-y-6 px-10  ">
            {filters.categories.map((category) => (
              <div key={category.value} className="mb-2">
                <div
                  className={`flex justify-between items-center cursor-pointer  rounded-md ${
                    expandedCategory === category.value &&
                    selectedSubcategory === null
                      ? "text-primary"
                      : "text-heading"
                  }`}
                  onClick={() => handleCategorySelect(category.value)}
                >
                  <div className="flex items-center gap-2">
                    {category.icon && (
                      <div>
                        <i className={category.icon}> </i>
                      </div>
                    )}
                    <span className="text-sm font-medium">
                      {category.label}
                    </span>
                  </div>
                  {category.subcategories?.length > 0 && (
                    <button
                      className={`transition-transform duration-300 ${
                        expandedCategory === category.value ? "rotate-180" : ""
                      }`}
                    >
                      <i className="ri-arrow-down-s-line text-xl"></i>
                    </button>
                  )}
                </div>

                {/* Subcategories Accordion */}
                <div
                  className={` overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedCategory === category.value
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {category.subcategories?.map((subcategory) => (
                    <div
                      key={subcategory.value}
                      className={`py-3 pr-2 pl-8 flex  rounded-md cursor-pointer text-sm font-medium ${
                        selectedSubcategory === subcategory.value
                          ? "text-primary"
                          : "text-heading"
                      }`}
                      onClick={() => handleSubcategorySelect(subcategory.value)}
                    >
                      {subcategory.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Clear Filters */}
          <div className="w-full flex justify-center text-center">
            <button
              onClick={() => {
                clearFilters();
                setSelectedSubcategory(null); // Reset selected subcategory
                setExpandedCategory(null); // Reset expanded category
              }}
              className="border-primary text-sm mt-2 mb-20 border p-2 rounded-md text-primary"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar for larger screens (hidden on sm and below) */}
      <div className="hidden sm:block space-y-6 flex-shrink-0 py-8 right-0 h-screen w-64">
        {/* Category Accordion for larger screens */}
        <div className="flex flex-col space-y-6 px-8">
          {filters.categories.map((category) => (
            <div key={category.value} className="mb-2">
              <div
                className={`flex justify-between items-center cursor-pointer rounded-md ${
                  expandedCategory === category.value &&
                  selectedSubcategory === null
                    ? "text-primary"
                    : "text-heading"
                }`}
                onClick={() => handleCategorySelect(category.value)}
              >
                <div className="flex items-center gap-2">
                  {category.icon && (
                    <div>
                      <i className={category.icon}></i>
                    </div>
                  )}
                  <span className="text-sm font-medium">{category.label}</span>
                </div>
                {category.subcategories?.length > 0 && (
                  <button
                    className={`transition-transform duration-300 ${
                      expandedCategory === category.value ? "rotate-180" : ""
                    }`}
                  >
                    <i className="ri-arrow-down-s-line text-xl"></i>
                  </button>
                )}
              </div>

              {/* Subcategories Accordion */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedCategory === category.value
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {category.subcategories?.map((subcategory) => (
                  <div
                    key={subcategory.value}
                    className={`py-3 pr-2 pl-8 flex rounded-md cursor-pointer text-sm font-medium ${
                      selectedSubcategory === subcategory.value
                        ? "text-primary"
                        : "text-heading"
                    }`}
                    onClick={() => handleSubcategorySelect(subcategory.value)}
                  >
                    {subcategory.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Clear Filters for larger screens */}
        <div className="w-full flex justify-center text-center">
          <button
            onClick={() => {
              clearFilters();
              setSelectedSubcategory(null); // Reset selected subcategory
              setExpandedCategory(null); // Reset expanded category
            }}
            className="border-primary text-sm mt-2 border p-2 rounded-md text-primary"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default ShopFiltering;