import React from 'react';
import './CallToAction.scss';

const CallToAction = () => {
  return (
    <div className="call_to_action_body d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="call_to_action_text text-white">
          Leaving no stone unturned when it comes to assisting the healthcare fraternity
        </h1>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={process.env.REACT_APP_ACCOUNT_APP_BUSINESS_LINK}
        >
          <button className="dashboard_landing_page_common_button mt-5 cursor-pointer">
            Create Enterprise Account
          </button>
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
