// ImgBB API configuration and helper functions
export const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || '4284488a37835ed459904bb22afad66f';

/**
 * Uploads an image file to ImgBB and returns the direct display URL.
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The direct image URL
 */
export const uploadToImgBB = async (file) => {
  if (!file) throw new Error('No file selected');

  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (data.success && data.data && data.data.url) {
    return data.data.url;
  } else {
    throw new Error(data.error?.message || 'ImgBB Upload Failed');
  }
};

export default uploadToImgBB;
