// src/pages/Upload.js
import { useState } from 'react';
import { useArConnect } from '../hooks/useArConnect';
import { uploadFile } from '../utils/arweave';
import LinearProgress from '@mui/material/LinearProgress';
import '../styles/Upload.css';

export default function Upload() {
  const { address, getWallet } = useArConnect();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    video: null,
    thumbnail: null
  });

  const handleUploadProgress = (progress) => {
    setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!form.thumbnail || !form.video) {
        throw new Error('Please select all files');
      }
      
      if (form.video.type !== 'video/mp4') {
        throw new Error('Video file must be in MP4 format');
      }
      
      if (!['image/jpeg', 'image/png'].includes(form.thumbnail.type)) {
        throw new Error('Thumbnail must be in PNG or JPG format');
      }

      const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
      if (form.video.size > MAX_FILE_SIZE) {
        throw new Error('Video file is too large (max 100MB)');
      }

      const wallet = await getWallet();
      
      const thumbnailTx = await uploadFile(
        form.thumbnail,
        { 
          'Content-Type': form.thumbnail.type,
          'app-name': 'my-youtube-app'
        },
        wallet,
        handleUploadProgress
      );

      const videoTx = await uploadFile(
        form.video,
        {
          'Content-Type': 'video/mp4',
          'app-name': 'my-youtube-app',
          'title': form.title,
          'description': form.description,
          'thumbnail-tx': thumbnailTx
        },
        wallet,
        handleUploadProgress
      );

      alert(`Video uploaded successfully!\nVideo ID: ${videoTx}`);
      setForm({ title: '', description: '', video: null, thumbnail: null });
      
    } catch (err) {
      setError(err.message);
      console.error('Upload error:', err);
    } finally {
      setUploadProgress(0);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Video</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Thumbnail (PNG/JPG):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({...form, thumbnail: e.target.files[0]})}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Video (MP4):</label>
          <input
            type="file"
            accept="video/mp4"
            onChange={(e) => setForm({...form, video: e.target.files[0]})}
            required
          />
        </div>

        {uploadProgress > 0 && (
          <LinearProgress 
            variant="determinate" 
            value={uploadProgress} 
            className="progress-bar"
          />
        )}

        <button 
          type="submit" 
          disabled={!address || uploadProgress > 0}
          className="upload-button"
        >
          {uploadProgress > 0 ? `Uploading... %${uploadProgress}` : 'Upload'}
        </button>
      </form>
    </div>
  );
}