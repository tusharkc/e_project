import React from 'react';
import SectionContent from './SectionContent';
import SectionImage from './SectionImage';
import './BannerStyles.scss';
import { DoctContainer } from '@doct-react/core';
import bgIllustratation from '../../../assets/images/landing_page/banner_images/banner_section_illustration.svg';

const Banner = () => {
  return (
    <div className="position-relative banner_container">
      <DoctContainer>
        <img
          src={bgIllustratation}
          className="position-absolute bg_illustration_banner"
          alt="illustration"
        />
        <div className="d-flex  my-5">
          <div>
            <SectionContent />
          </div>
          <div>
            <SectionImage />
          </div>
        </div>
      </DoctContainer>
    </div>
  );
};

export default Banner;
