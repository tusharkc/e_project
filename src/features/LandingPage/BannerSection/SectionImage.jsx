import React from 'react';
import bannerVideo from '../../../assets/images/landing_page/banner_images/banner_images_video.mp4';

const SectionImage = () => {
  return (
    <div className="images_container position-relative">
      <video loop muted autoPlay controls="">
        <source src={bannerVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default SectionImage;
