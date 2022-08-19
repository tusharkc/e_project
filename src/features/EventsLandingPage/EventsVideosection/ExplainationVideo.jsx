import React from 'react';
import { DoctContainer } from '@doct-react/core';
import './ExplainationVideo.scss';
import playIcon from '../../../assets/icons/play_icon.svg';
import underline from '../../../assets/images/event_landing_page/video_section/underline_right.svg';
const ExplainationVideo = () => {
  return (
    <DoctContainer>
      <div className="dashboard_video_section position-relative">
        <h1 className="video_section_title text-center">Witness the process of redefining</h1>
        <img
          src={underline}
          alt="unerline"
          className="video_section_redefining_underline position-absolute"
        />

        <div className="video_player mx-auto my-5 d-flex align-items-center justify-content-center">
          <img src={playIcon} alt="play_icon" />
        </div>
      </div>
    </DoctContainer>
  );
};

export default ExplainationVideo;
