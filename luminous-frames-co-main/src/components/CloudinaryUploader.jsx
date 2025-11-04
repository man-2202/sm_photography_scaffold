import React, { useState } from 'react';

export default function CloudinaryUploader({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) selectFile(f);
  };
  const handleSelect = (e) => {
    const f = e.target.files?.[0];
    if (f) selectFile(f);
  };
  const selectFile = (f) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setMessage('');
  };

  const upload = async () => {
    if (!file) return setMessage('Please select a file first');
    setUploading(true);
    setMessage('Preparing upload...');
    try {
      const signRes = await fetch('/api/cloudinary/sign');
      const signJson = await signRes.json();
      if (!signJson.ok) throw new Error(signJson.error || 'Sign failed');
      const { cloudName, unsignedPreset, apiKey, timestamp, signature } = signJson;
      if (!cloudName) throw new Error('Cloudinary not configured on server');

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
      const fd = new FormData();
      fd.append('file', file);

      if (unsignedPreset) {
        fd.append('upload_preset', unsignedPreset);
      } else if (signature && timestamp && apiKey) {
        // signed upload
        fd.append('timestamp', timestamp);
        fd.append('signature', signature);
        fd.append('api_key', apiKey);
      } else {
        // fallback: let server proxy upload
        setMessage('No unsigned preset and no signature available; trying server proxy...');
        const proxy = new FormData();
        proxy.append('file', file);
        const proxyRes = await fetch('/api/upload/cloudinary-proxy', { method: 'POST', body: proxy });
        const proxyJson = await proxyRes.json();
        if (!proxyJson.ok) throw new Error(proxyJson.error || 'Proxy upload failed');
        setMessage('Uploaded via proxy');
        setUploading(false);
        onUploaded && onUploaded(proxyJson.url);
        return;
      }

      setMessage('Uploading to Cloudinary...');
      const r = await fetch(url, { method: 'POST', body: fd });
      const j = await r.json();
      if (j.error) throw new Error(j.error.message || 'Upload failed');
      setMessage('Upload successful');
      onUploaded && onUploaded(j.secure_url || j.url);
    } catch (err) {
      console.error(err);
      setMessage(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-white/50 rounded-2xl shadow-md">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-muted rounded-lg p-6 text-center cursor-pointer"
      >
        <input type="file" accept="image/*" onChange={handleSelect} className="hidden" id="cloud-file-input" />
        <label htmlFor="cloud-file-input" className="block">
          <div className="mb-3 text-sm">Drag & drop an image here, or click to browse</div>
          {preview ? (
            <img src={preview} alt="preview" className="mx-auto max-h-48 rounded-md shadow-sm" />
          ) : (
            <div className="h-40 flex items-center justify-center text-muted-foreground">No file selected</div>
          )}
        </label>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">{message}</div>
        <div className="flex gap-2">
          <button onClick={() => { setFile(null); setPreview(null); setMessage(''); }} className="px-3 py-1 rounded-md border">Clear</button>
          <button onClick={upload} disabled={uploading} className="px-4 py-2 rounded-md bg-[#ffdede] border border-[#f7c6c6]">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}
