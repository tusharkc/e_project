import { DoctButton } from '@doct-react/core';
import React from 'react';
import incredibleUnderline from '../../../assets/icons/incredible_underline.svg';

const SectionHeader = () => {
  return (
    <>
      <div className="faq_section_header_container d-flex flex-column align-items-center justify-content-center mb-5">
        <h3 className="faq_section_header text-center">
          Let&apos;s write a new chapter and begin an incredible journey
        </h3>
        <img src={incredibleUnderline} alt={'underline'} />
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={process.env.REACT_APP_ACCOUNT_APP_BUSINESS_LINK}
        >
          <button className="my-5 dashboard_landing_page_common_button cursor-pointer">
            Create Enterprise Account
          </button>
        </a>
      </div>
    </>
  );
};

export default SectionHeader;
