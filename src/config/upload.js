// Cloudinary API configuration and helper functions
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'portfolio';
export const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || '322574116488769';
export const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET || 'TdswcO29cHuCA5UH6EoVKTZMYII';

/**
 * Generates SHA-1 hash using Web Crypto API
 * @param {string} str 
 * @returns {Promise<string>}
 */
const sha1 = async (str) => {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Uploads an image or video file directly to Cloudinary CDN and returns the secure HTTPS URL.
 * @param {File} file - The media file (image or video)
 * @param {function} onProgress - Optional upload progress callback
 * @returns {Promise<string>} - Direct Cloudinary CDN URL
 */
export const uploadToCloudinary = async (file, onProgress) => {
  if (!file) throw new Error('No file selected for upload');

  const timestamp = Math.floor(Date.now() / 1000);
  const stringToSign = `timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  const signature = await sha1(stringToSign);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', CLOUDINARY_API_KEY);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadUrl, true);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.secure_url) {
            resolve(response.secure_url);
          } else {
            reject(new Error(response.error?.message || 'Cloudinary upload failed'));
          }
        } catch (err) {
          reject(new Error('Invalid Cloudinary response JSON'));
        }
      } else {
        try {
          const errorResp = JSON.parse(xhr.responseText);
          reject(new Error(errorResp.error?.message || `Cloudinary Upload Error (${xhr.status})`));
        } catch (err) {
          reject(new Error(`Cloudinary Upload Error (${xhr.status})`));
        }
      }
    };

    xhr.onerror = () => reject(new Error('Network error during Cloudinary upload'));
    xhr.send(formData);
  });
};

export default uploadToCloudinary;
