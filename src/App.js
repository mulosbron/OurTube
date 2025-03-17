// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import VideoPlayer from './pages/VideoPlayer';
import MyVideos from './pages/MyVideos';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
            <Route path="/my-videos" element={<MyVideos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;