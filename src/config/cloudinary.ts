// Cloudinary Configuration
export const cloudinaryConfig = {
  cloudName: 'dieqdgnyv',
  apiKey: '212766687463963',
  apiSecret: 'Lzw7q8T74uIVtl_Dww87Q_nxkcU',
  secure: true,
  defaultFolder: 'viral_boast',
  profileImagesFolder: 'viral_boast_profile_images',
} as const;

// Cloudinary URL for client-side uploads
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
