import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryOncloud = async (filePath) => {
  try {
    if (!filePath) return null;
    // Upload file
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath)
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath)
     return null
  }
};

export {cloudinaryOncloud}