# OurTube

## Overview
A decentralized video sharing platform built on the Arweave blockchain that provides permanent, censorship-resistant video storage. Users can upload and share videos using their Arweave wallet, ensuring content remains accessible forever without the risk of centralized censorship.

## Purpose
To create a Web3 alternative to traditional video platforms that offers true content ownership and permanence. OurTube leverages blockchain technology to ensure videos are stored permanently and distributed without central points of failure.

## Scope

### Technology Stack:
- **Frontend**: React 19.0.0, React Router DOM 7.3.0
- **UI Framework**: Material-UI 6.4.7
- **Blockchain**: Arweave, ArConnect Wallet
- **Storage**: Permanent blockchain storage
- **GraphQL**: Arweave GraphQL for data queries
- **Styling**: CSS Modules, Google Fonts

## Implementation

### Project Structure:
```
OurTube/
├── public/
│   ├── index.html                 # HTML template
│   ├── manifest.json              # PWA manifest
│   └── favicon.ico               # Favicon
├── src/
│   ├── components/
│   │   ├── Navbar.js              # Navigation component
│   │   └── VideoCard.js           # Video preview card
│   ├── hooks/
│   │   └── useArConnect.js        # Arweave wallet hook
│   ├── pages/
│   │   ├── Home.js                # Video gallery
│   │   ├── Upload.js              # Video upload interface
│   │   ├── VideoPlayer.js         # Video playback
│   │   └── MyVideos.js           # User's uploaded videos
│   ├── styles/
│   │   ├── Home.css               # Home page styles
│   │   ├── Upload.css             # Upload page styles
│   │   ├── VideoPlayer.css        # Video player styles
│   │   ├── MyVideos.css           # My videos page styles
│   │   ├── Navbar.css             # Navigation styles
│   │   └── VideoCard.css          # Video card styles
│   ├── utils/
│   │   ├── arweave.js            # Arweave utilities
│   │   └── graphql.js            # GraphQL queries
│   ├── App.js                     # Main application
│   ├── App.css                    # Global app styles
│   ├── index.js                   # Entry point
│   ├── index.css                  # Global styles
│   └── logo.svg                   # React logo
├── .gitignore                     # Git ignore file
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Lockfile
└── README.md                      # Project documentation
```

### Getting Started:

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Connect your ArConnect wallet
4. Start uploading and viewing videos!

## Screenshots

Sample video thumbnails from OurTube:

<img src="https://5kkrcx2vuzusjue2hzsrfp7hksh43sd43yed37gr7skz2wlc7tva.arweave.net/6pURX1WmaSTQmj5lEr_nVI_NyHzeCD380fyVnVli_Oo" width="750" alt="Test Video Thumbnail">
<img src="https://mhxz6cn446ct3ztnvrgbjsoamgqeyrcboaasmb3x6nmyh7bcsmxq.arweave.net/Ye-fCbznhT3mbaxMFMnAYaBMREFwASYHd_NZg_wiky8" width="750" alt="Test2 Video Thumbnail">
<img src="https://ykqfc2houpzn22ft2mwelr4u64cthyrcge7qncdxgakzae2rimba.arweave.net/wqBRaO6j8t1os9MsRceU9wUz4iIxPwaIdzAVkBNRQwI" width="750" alt="Test3 Video Thumbnail">
