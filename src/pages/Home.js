// src/pages/Home.js
import { useEffect, useState } from 'react';
import { getVideos } from '../utils/graphql';
import VideoCard from '../components/VideoCard';
import '../styles/Home.css';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos();
      const multipliedVideos = Array(30).fill(data).flat(); // 3 kopya, toplam 3 kat // veri çoğaltmak için
      setVideos(multipliedVideos);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="video-grid">
      {videos.map((video, index) => (
        <VideoCard key={`${video.id}-${index}`} video={video} />
      ))}
    </div>
  );
}