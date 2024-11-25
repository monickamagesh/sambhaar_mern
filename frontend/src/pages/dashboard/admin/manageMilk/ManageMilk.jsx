import React, { useState } from "react";
import {
  useDeleteMilkMutation,
  useFetchAllMilksQuery,
} from "../../../../redux/features/milks/milksApi"; // Adjust according to your redux slice
import { Link } from "react-router-dom";

const ManageMilk = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [milksPerPage] = useState(12);

  const {
    data: { milks = [], totalPages, totalMilks } = {},
    isLoading,
    error,
    refetch,
  } = useFetchAllMilksQuery({
    category: "",
    minPrice: "",
    maxPrice: "",
    page: currentPage,
    limit: milksPerPage,
  });

  // Pagination
  const startMilk = (currentPage - 1) * milksPerPage + 1;
  const endMilk = startMilk + milks.length - 1;
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const [deleteMilk] = useDeleteMilkMutation();
  const handleDeleteMilk = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this milk product?"
      );
      if (confirmDelete) {
        const response = await deleteMilk(id).unwrap();
        alert("Milk product deleted successfully");
        await refetch();
      }
    } catch (error) {
      console.error("Error deleting milk product", error);
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading milks.</div>}
      <section className="overflow-hidden rounded-lg-md m-5">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h2 className="text-2xl font-bold mb-6">All Milks</h2>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link
                    to={`/dashboard/add-milk`}
                    className="bg-primary text-white py-2 px-4 rounded-md shadow-md"
                  >
                    Add New Milk
                  </Link>
                </div>
              </div>
              <h3 className="my-4 text-sm">
                Showing {startMilk} to {endMilk} of {totalMilks} milks
              </h3>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-medium text-gray-900">ID</th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Milk
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Category
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Price
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Weight
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {milks &&
                    milks.map((milk, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <th className="px-6 py-4 font-normal ">
                          #ID:{index + 1}
                        </th>
                        <td className="px-6 py-4 font-normal flex items-center gap-3">
                          <div className="relative h-10 w-10">
                            <img
                              className="h-full w-full object-contain ring-gray-300 ring-1 rounded-lg object-center"
                              src={milk.image || "default-image-url"} // Replace with actual image URL
                              alt={milk.name}
                            />
                          </div>
                          <div>{milk.name}</div>
                        </td>
                        <td className="px-6 py-4 items-center">
                          {milk.category || "-"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          ₹{milk.price || "-"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {milk.weight || "-"}
                        </td>

                        <td className="px-6 py-4 space-x-2 cursor-pointer hover:text-primary">
                          <Link
                            to={`/dashboard/update-milk/${milk._id}`}
                            className="text-gray-700 hover:text-gray-900"
                          >
                            <i className="ri-edit-box-line ri-lg"></i>
                          </Link>

                          <button
                            onClick={() => handleDeleteMilk(milk._id)}
                            className="hover:text-primary-dark text-primary"
                          >
                            <i className="ri-delete-bin-line ri-lg"></i>
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
            <i className="ri-arrow-left-s-line"></i>
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
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </section>
    </>
  );
};

export default ManageMilk;
