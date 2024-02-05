import React from 'react';
import './PlaybackControls.css';

function PlaybackControls( { audioFile, onTrackEnded }) {
    const audioRef = useRef (null);

    const handlePlay = () => {
        audioRef.current.play();
    };

    const handlePause = () => {
        audioRef.current.pause();
    };

    const handleEnded = () => {
        onTrackEnded();
    };

    return (
        <div className="PlaybackControlsContainer">
            <audio ref = {audioRef} onEnded = {handleEnded}>
                <source src = {audioFile.audioBlob} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            <button className="PlaybackControlsButton" onClick= {handlePlay}>
                Play
            </button>
            <button className="PlaybackControlsButton" onClick= {handlePause}>
                pause
            </button>
        </div>
    );
}

export default PlaybackControls;