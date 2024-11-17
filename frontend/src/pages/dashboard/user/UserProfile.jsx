import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatarImg from "../../../assets/avatar.png";
import { useEditProfileMutation } from "../../../redux/features/auth/authApi";
import { setUser } from "../../../redux/features/auth/authSlice";
import UploadImage from "../admin/addProduct/UploadImage";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editProfile, { isLoading, isError, error, isSuccess }] =
    useEditProfileMutation();

  const [formData, setFormData] = useState({
    username: "",
    profileImage: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    userId: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username || "",
        profileImage: user?.profileImage || "",
        phoneNumber: user?.phoneNumber || "",
        address: {
          street: user?.address?.street || "",
          city: user?.address?.city || "",
          state: user?.address?.state || "",
          postalCode: user?.address?.postalCode || "",
          country: user?.address?.country || "",
        },
        userId: user._id,
      });
    }
  }, [user]);

  const [profileImage, setProfileImage] = useState(formData.profileImage);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: user._id,
      username: formData.username,
      profileImage: profileImage, // Use the state for profileImage here
      phoneNumber: formData.phoneNumber,
      address: {
        street: formData.address.street,
        city: formData.address.city,
        state: formData.address.state,
        postalCode: formData.address.postalCode,
        country: formData.address.country,
      },
    };
    try {
      const response = await editProfile(updatedUser).unwrap();
      console.log(response);
      dispatch(setUser(response.user));
      localStorage.setItem("user", JSON.stringify(response.user));
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile. Please try again");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen w-full">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full text-center mb-4">
        <div className="relative">
          <img
            src={formData?.profileImage || avatarImg} // Use the state profileImage here
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          {formData?.username || "Username"}
        </h2>
        <div className="w-4/6 mx-auto">
        <p className="text-sm pt-2 text-gray-600">
          <i className="ri-phone-fill text-primary mr-2 ri-lg"></i>
          {formData?.phoneNumber || "N/A"}
        </p>
        <p className="text-gray-600 text-sm ">
          <i className="ri-home-9-fill text-primary mr-2 ri-lg"> </i>
          {Object.values(formData.address).filter(Boolean).join(", ") || "N/A"}
        </p>
        </div>
        
        
      </div>

      {/* Edit Profile Form */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full border border-gray-200">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <div className="mb-6">
            <UploadImage
              name="profileImage"
              id="profileImage"
              value={(e) => setProfileImage(e.target.value)} // Set profile image URL to state here
              placeholder="Image"
              setImage={setProfileImage}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="username"
              value={formData?.username}
              onChange={handleChange}
              className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData?.phoneNumber}
              onChange={handleChange}
              className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          {/* Address Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Street
              </label>
              <input
                type="text"
                name="address.street"
                value={formData?.address.street}
                onChange={handleChange}
                className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="address.city"
                value={formData?.address.city}
                onChange={handleChange}
                className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                name="address.state"
                value={formData?.address.state}
                onChange={handleChange}
                className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                name="address.postalCode"
                value={formData?.address.postalCode}
                onChange={handleChange}
                className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              name="address.country"
              value={formData?.address.country}
              onChange={handleChange}
              className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className={`mt-4 w-full bg-orange-600 text-white py-3 px-4 rounded-md shadow-lg transition-all duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
