// src/pages/VideoPlayer.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVideoMetadata } from '../utils/graphql';
import '../styles/VideoPlayer.css';

export default function VideoPlayer() {
  const { id } = useParams();
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      const data = await getVideoMetadata(id);
      setMetadata(data);
      setLoading(false);
    };
    fetchMetadata();
  }, [id]);

  if (loading) return <div className="loading">Loading video...</div>;

  return (
    <div className="video-player-container">
      <video controls className="video-player" autoPlay>
        <source src={`https://arweave.net/${id}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-info">
        <h1>{metadata?.title || 'Untitled Video'}</h1>
        <p>{metadata?.description || 'No description'}</p>
        <div className="video-meta">
          <span>Transaction ID: {id}</span>
        </div>
      </div>
    </div>
  );
}