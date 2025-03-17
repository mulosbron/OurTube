// src/hooks/useArConnect.js
import { useState, useEffect } from 'react';

export const useArConnect = () => {
  const [address, setAddress] = useState('');

  const connect = async () => {
    try {
      await window.arweaveWallet.connect(['ACCESS_ADDRESS']);
      const addr = await window.arweaveWallet.getActiveAddress();
      setAddress(addr);
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const disconnect = async () => {
    await window.arweaveWallet.disconnect();
    setAddress('');
  };

  const getWallet = async () => {
    return window.arweaveWallet;
  };

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const addr = await window.arweaveWallet.getActiveAddress();
        setAddress(addr);
      } catch {
        setAddress('');
      }
    };

    if (window.arweaveWallet) {
      checkConnection();
    }
  }, []);

  return { address, connect, disconnect, getWallet };
};