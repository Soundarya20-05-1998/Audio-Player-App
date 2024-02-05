import React from 'react';
import './Playlist.css';

function Playlist({ audioFiles }) {
    return (
        <div>
            <h2 className="playlist-title">Playlist</h2>
            <ul classame="playlist-list">
                {audioFiles.map((audioFile, index) => (
                    <li key = {index} classame="playlist-item">{audioFile.filename}</li>
                ))}
            </ul>
        </div>
    );
}

export default Playlist;