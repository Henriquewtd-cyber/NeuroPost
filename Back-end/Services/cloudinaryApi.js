import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

export async function uploadImg(imagem) {
  cloudinary.config({
    cloud_name: process.env.API_NAME_CLOUD,
    api_key: process.env.API_KEY_CLOUD,
    api_secret: process.env.API_SECRET_CLOUD,
  });

  const id = crypto.randomUUID();

  const uploadResult = await cloudinary.uploader
    .upload(imagem, {
      public_id: id,
    })
    .catch(error => {
      console.log(error);
    });

  if (uploadResult) return { url: uploadResult.url, id };
}
