import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const saveFileToCloudinary = (buffer, userId) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'nodejs-hw/avatars',
        public_id: `avatar_${userId}`,
        overwrite: true,
        resource_type: 'image',
      },
      (error, result) => (error ? reject(error) : resolve(result))
    );

    uploadStream.end(buffer);
  });
