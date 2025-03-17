// src/pages/MyVideos.js
import { useEffect, useState } from 'react';
import { useArConnect } from '../hooks/useArConnect';
import { getUserVideos } from '../utils/graphql';
import VideoCard from '../components/VideoCard';
import '../styles/MyVideos.css';

export default function MyVideos() {
  const { address } = useArConnect();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      if (address) {
        try {
          setLoading(true);
          const data = await getUserVideos(address);
          const multipliedVideos = Array(30).fill(data).flat(); // 3 kopya, toplam 3 kat // veri çoğaltmak için
          setVideos(multipliedVideos);
        } catch (err) {
          console.error('Error fetching videos:', err);
          setError('Failed to load your videos. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchVideos();
  }, [address]);

  if (!address) {
    return (
      <div className="connect-wallet-message">
        <h2>Connect Your Wallet</h2>
        <p>Please connect your wallet to view your uploaded videos.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="loading-container">Loading your videos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="my-videos-container">
      <h2>Your Uploaded Videos ({videos.length})</h2>
      
      {videos.length === 0 ? (
        <div className="no-videos-message">
          <p>You haven't uploaded any videos yet.</p>
          <a href="/upload" className="upload-link">Upload your first video</a>
        </div>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}