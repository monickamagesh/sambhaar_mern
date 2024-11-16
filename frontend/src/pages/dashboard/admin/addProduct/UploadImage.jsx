import React, { useState } from 'react';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi'; // Import the FiUpload icon
import { getBaseUrl } from '../../../../util/baseURL';


const UploadImage = ({ name, setImage }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  // Handle drag and drop file upload
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    const base64 = await convertBase64(file);
    setLoading(true);
    axios
      .post(`${getBaseUrl()}/uploadImage`, { image: base64 })
      .then((res) => {
        const imageUrl = res.data;  // Get URL from response
        setUrl(imageUrl);           // Store the image URL
        alert("Image uploaded successfully");
        setImage(imageUrl);         // Call parent method to set image
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to upload image");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="mt-2 w-full border-2 border-dashed border-green-600 flex justify-center items-center py-12 px-4 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
    >
      <label htmlFor={name} className="w-full h-full text-center cursor-pointer">
        <input
          type="file"
          id={name}
          name={name}
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={handleChange}
        />
        {/* Only show this div if no image has been uploaded */}
        {!url && (
          <div className="text-center">
            <FiUpload className="mx-auto text-gray-500 text-4xl" />
            <p className="mt-2 text-gray-600">
              <span className="text-green-600">Upload an image</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">PNG, JPG</p>
          </div>
        )}
        {loading && (
        <div className="mt-2 text-sm text-blue-600">Product uploading...</div>
      )}
      {url && (
        <div className=" text-sm text-green-600">
          <p>Image uploaded successfully!</p>
          {/* Display the uploaded image with fixed size */}
          <img 
            src={url} 
            alt="uploaded-image" 
            className="mt-2 max-w-[300px] max-h-[300px] object-contain mx-auto" 
          />
        </div>
      )}
      </label>
      
    </div>
  );
};

export default UploadImage;
