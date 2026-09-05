import React, { useState, useRef } from 'react';
import { UploadCloud, Loader2, CheckCircle2, AlertCircle, X, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { uploadToCloudinary } from '../../config/upload';

const MediaUploadInput = ({
  label,
  value = '',
  onChange,
  placeholder = 'Paste URL or choose a file to upload...',
  accept = 'image/*',
  mediaType = 'image',
  required = false,
  className = ''
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadMsg, setUploadMsg] = useState(null); // { type: 'success'|'error', text: '' }
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setUploadMsg(null);

    try {
      // Upload to Cloudinary CDN (Portfolio Cloud)
      const uploadedUrl = await uploadToCloudinary(file, (percent) => {
        setProgress(percent);
      });

      onChange(uploadedUrl);
      setUploadMsg({
        type: 'success',
        text: `${file.type.startsWith('video/') ? 'Video' : 'Image'} uploaded to Cloudinary CDN successfully!`
      });
    } catch (err) {
      console.error('Cloudinary Upload Error:', err);
      setUploadMsg({
        type: 'error',
        text: err.message || 'Upload failed. Please check network connection or paste a direct URL.'
      });
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleClear = () => {
    onChange('');
    setUploadMsg(null);
  };

  const isVideo = mediaType === 'video' || (value && (value.endsWith('.mp4') || value.endsWith('.webm') || value.includes('mixkit') || value.includes('video') || value.startsWith('data:video')));

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs uppercase tracking-widest text-brand-cream/70 font-light flex justify-between items-center">
          <span>{label} {required && <span className="text-brand-gold">*</span>}</span>
          <span className="text-[10px] text-brand-gold/60 lowercase">Direct link or file upload</span>
        </label>
      )}

      {/* Input Group */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className="w-full bg-brand-black/70 border border-brand-gold/20 text-brand-cream p-3 pr-8 text-sm focus:border-brand-gold focus:outline-none transition-colors"
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-cream/40 hover:text-rose-400 transition-colors p-1"
              title="Clear link"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Upload Button */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="btn-gold !py-3 !px-4 !text-xs flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
              <span>Uploading {progress > 0 ? `${progress}%` : '...'}</span>
            </>
          ) : (
            <>
              <UploadCloud className="w-4 h-4 text-brand-gold" />
              <span>{mediaType === 'video' ? 'Upload Video' : 'Upload Image'}</span>
            </>
          )}
        </button>
      </div>

      {/* Upload Feedback Message */}
      {uploadMsg && (
        <div className={`text-xs flex items-center gap-1.5 p-2 rounded ${
          uploadMsg.type === 'success' ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-400' : 'bg-rose-950/40 border border-rose-500/30 text-rose-400'
        }`}>
          {uploadMsg.type === 'success' ? (
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>{uploadMsg.text}</span>
        </div>
      )}

      {/* Live Media Preview Box */}
      {value && value.trim().startsWith('http') && (
        <div className="relative mt-2 p-2 bg-brand-dark/90 border border-brand-gold/20 rounded inline-block group">
          <div className="flex items-center gap-3">
            <div className="w-16 h-12 rounded overflow-hidden bg-brand-black border border-brand-gold/30 shrink-0 flex items-center justify-center">
              {isVideo ? (
                <video src={value} className="w-full h-full object-cover" muted />
              ) : (
                <img src={value} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              )}
            </div>
            <div className="text-[11px] font-mono text-brand-cream/60 max-w-[200px] truncate">
              <span className="text-brand-gold uppercase text-[9px] block">Preview Active</span>
              {value}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUploadInput;
