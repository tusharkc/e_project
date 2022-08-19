import { DoctContainer } from '@doct-react/core';
import React from 'react';
import './DashboardExplainationVideo.scss';
import playIcon from '../../../assets/icons/play_icon.svg';

const DashboardExplainationVideo = () => {
  return (
    <DoctContainer>
      <div className="dashboard_video_section">
        <h1 className="video_section_title text-center">All-in-one Enterprise Dashboard</h1>

        <div className="video_player mx-auto my-5 d-flex align-items-center justify-content-center">
          <img src={playIcon} alt="play_icon" />
        </div>
      </div>
    </DoctContainer>
  );
};

export default DashboardExplainationVideo;
