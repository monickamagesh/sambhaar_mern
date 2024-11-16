const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",  // Automatically detect image type (image, video, etc.)
};

module.exports = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if (error) {
                console.error("Cloudinary error:", error.message);
                return reject({ message: "Cloudinary upload failed" });
            }
            if (result && result.secure_url) {
                resolve(result.secure_url);
            } else {
                reject({ message: "Upload failed, no URL returned" });
            }
        });
    });
};
