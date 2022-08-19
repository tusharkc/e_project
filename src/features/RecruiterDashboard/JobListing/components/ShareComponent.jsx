import { DoctIcon, DoctTypography } from '@doct-react/core';
import React from 'react';

const ShareComponent = ({ copyLinkHandler }) => {
  return (
    <div className="box-shadow share_options_menu position-absolute border-radius">
      <a
        href="https://www.facebook.com/"
        target={'_blank'}
        rel="noreferrer"
        className="d-flex align-items-center p-3 cursor-pointer"
      >
        <DoctIcon name="facebook" width="25" className="m-0 p-0" />
        <DoctTypography variant="body2" fontWeight="bold" className="mx-3 p-0 my-0">
          Facebook
        </DoctTypography>
      </a>
      <a
        href="https://twitter.com/"
        target={'_blank'}
        rel="noreferrer"
        className="d-flex align-items-center p-3 cursor-pointer"
      >
        <DoctIcon name="twitter" width="25" className="m-0 p-0" />
        <DoctTypography variant="body2" fontWeight="bold" className="mx-3 p-0 my-0">
          Twitter
        </DoctTypography>
      </a>
      <a
        href="https://linkedin.com/"
        target={'_blank'}
        rel="noreferrer"
        className="d-flex align-items-center p-3 cursor-pointer"
      >
        <DoctIcon name="linkedColour" width="25" className="m-0 p-0" />
        <DoctTypography variant="body2" fontWeight="bold" className="mx-3 p-0 my-0">
          Linkedin
        </DoctTypography>
      </a>
      <a
        href="https://instagram.com/"
        target={'_blank'}
        rel="noreferrer"
        className="d-flex align-items-center p-3 cursor-pointer"
      >
        <DoctIcon name="instagram" width="25" className="m-0 p-0" />
        <DoctTypography variant="body2" fontWeight="bold" className="mx-3 p-0 my-0">
          Instagram
        </DoctTypography>
      </a>
      <div className="share_menu_sepration_line w-100" />
      <div onClick={copyLinkHandler} className="d-flex align-items-center p-3 cursor-pointer">
        <DoctIcon name="link" width="25" className="m-0 p-0" />
        <DoctTypography variant="body2" fontWeight="bold" className="mx-3 p-0 my-0">
          Copy Link
        </DoctTypography>
      </div>
    </div>
  );
};

export default ShareComponent;
