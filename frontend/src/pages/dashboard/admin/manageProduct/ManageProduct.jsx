import React, { useState } from "react";
import {
  useDeleteProductMutation,
  useFetchAllProductsQuery,
} from "../../../../redux/features/products/productsApi";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../util/formatDate";

const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(30);

  const {
    data: { products = [], totalPages, totalProducts } = {},
    isLoading,
    error,
    refetch,
  } = useFetchAllProductsQuery({
    category: "",
    subcategory: "",
    minPrice: "",
    maxPrice: "",
    page: currentPage,
    limit: productsPerPage,
  });

  // pagination
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const [deleteProduct] = useDeleteProductMutation();
  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id).unwrap();
      alert("Product deleted successfully");
      await refetch();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading products.</div>}
      <section className="overflow-hidden rounded-lg-md m-5">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h2 className="text-2xl font-bold mb-6">All Products</h2>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-primary text-white active:bg-primary-dark text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>
              <h3 className="my-4 text-sm">
                Showing {startProduct} to {endProduct} of {totalProducts}{" "}
                products
              </h3>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-medium text-gray-900">ID</th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Product
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Category
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Brand
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Quantity
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Price
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {products &&
                    products.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <th className="px-6 py-4 font-normal ">
                          #ID:{index + 1}
                        </th>
                        <td className="px-6 py-4 font-normal flex items-center gap-3">
                          <div className="relative h-10 w-10">
                            <img
                              className="h-full w-full object-contain ring-gray-300 ring-1 rounded-lg object-center"
                              src={product.image || "default-image-url"} // Replace with actual image URL
                              alt={product.name}
                            />
                          </div>
                          <div>{product.name}</div>
                        </td>
                        <td className="px-6 py-4 items-center">{product.category || "-"}</td>
                        <td className="px-6 py-4 items-center ">{product.brand || "-"}</td>
                        <td className="px-6 py-4 text-center">{product.quantity || "-"}</td>
                        <td className="px-6 py-4 text-center">₹{product.price || "-"}</td>

                        <td className="px-6 py-4 space-x-2 cursor-pointer hover:text-primary">
                          <Link
                            to={`/dashboard/update-product/${product._id}`}
                            className="text-gray-700 hover:text-gray-900"
                          >
                            <i class="ri-edit-box-line ri-lg"></i>
                          </Link>

                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="hover:text-primary-dark text-primary"
                          >
                            <i class="ri-delete-bin-line ri-lg"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 mr-4 flex items-center justify-end">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="py-1 px-2 rounded-md text-gray-400 ring-1 ring-gray-400 m-2"
          >
            <i class="ri-arrow-left-s-line"></i>
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              onClick={() => handlePageChange(index + 1)}
              className={`px-[14px] py-1 ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-700"
              } rounded-md mx-1`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="py-1 px-2 rounded-md text-gray-400 ring-1 ring-gray-400 m-2"
          >
            <i class="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </section>
    </>
  );
};

export default ManageProduct;
