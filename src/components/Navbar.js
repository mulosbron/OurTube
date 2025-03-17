// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useArConnect } from '../hooks/useArConnect';
import '../styles/Navbar.css';

export default function Navbar() {
  const { address, connect, disconnect } = useArConnect();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">OurTube</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/upload" className="nav-link">Upload</Link>
        <Link to="/my-videos" className="nav-link">My Videos</Link>
      </div>
      <div className="wallet-section">
        {address ? (
          <div className="wallet-info">
            <span className="wallet-address">{address.slice(0, 6)}...{address.slice(-4)}</span>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={disconnect}
              size="small"
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={connect}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </nav>
  );
}