import React, { useRef, useState } from 'react';

import { DoctIcon } from '@doct-react/core';

import playBtn from '../../assets/icons/play_icon.svg';

import './VideoPlayer.scss';

const VideoPlayer = ({ src }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoRef = useRef(null);
  const playButtonRef = useRef(null);

  const handlePayButtonClick = () => {
    videoRef.current.play();
    setIsVideoPlaying(true);
  };

  return (
    <div className="position-relative">
      <video
        width="100%"
        height="auto"
        className="video-player position-relative"
        ref={videoRef}
        controls={isVideoPlaying}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!isVideoPlaying && (
        <div
          className="video-player-icon position-absolute d-flex justify-content-center"
          onClick={handlePayButtonClick}
          ref={playButtonRef}
        >
          <img src={playBtn} width="50px" />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
