// src/components/VideoCard.js
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/VideoCard.css';

export default function VideoCard({ video }) {
  const [thumbnailError, setThumbnailError] = useState(false);
  
  const getTag = (name) => {
    const tag = video.tags.find(t => t.name === name);
    return tag ? tag.value : '';
  };

  const title = getTag('title') || 'Untitled Video';
  const thumbnailTx = getTag('thumbnail-tx');
  
  return (
    <div className="video-card">
      <Link to={`/video/${video.id}`}>
        {thumbnailTx && !thumbnailError ? (
          <img 
            src={`https://arweave.net/${thumbnailTx}`}
            alt={title}
            onError={() => setThumbnailError(true)}
            className="video-thumbnail"
          />
        ) : (
          <div className="video-thumbnail-placeholder">
            <span>No Thumbnail</span>
          </div>
        )}
        <h3 className="video-title">{title}</h3>
      </Link>
    </div>
  );
}