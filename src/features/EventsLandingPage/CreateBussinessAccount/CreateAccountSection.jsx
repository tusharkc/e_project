import React from 'react';
import incredibleUnderline from '../../../assets/icons/incredible_underline.svg';
import './CreateAccountStyle.scss';
const CreateAccountSection = () => {
  return (
    <div className="create_account_section_container d-flex flex-column align-items-center justify-content-center">
      <div className="position-relative">
        <h3 className="faq_section_header text-center">
          Let&rsquo;s connect, to make your next event incredible!
        </h3>
        <img
          src={incredibleUnderline}
          alt={'underline'}
          className="inceredible_underline position-absolute"
        />
      </div>
      <a
        className="create_account_page"
        target="_blank"
        rel="noreferrer noopener"
        href={process.env.REACT_APP_ACCOUNT_APP_BUSINESS_LINK}
      >
        <button className="my-5 create_account_page_button cursor-pointer">
          Create Enterprise Account
        </button>
      </a>
    </div>
  );
};

export default CreateAccountSection;
