import { DoctIcon, DoctTypography } from '@doct-react/core';
import React from 'react';
import './CustomToaster.scss';

const CustomToaster = ({
  text,
  top = '16px',
  right = '16px',
  left,
  bottom,
  bgColor,
  handleRemoval,
}) => {
  return (
    <>
      <div
        style={{ background: bgColor, top: top, right: right, left: left, bottom: bottom }}
        className={`custom-toster d-flex text-white align-items-center justify-content-between`}
      >
        <DoctTypography variant="body2">{text}</DoctTypography>
        <span onClick={handleRemoval} className="cursor-pointer">
          <DoctIcon width="24" height="24" name={'close'} />
        </span>
      </div>
    </>
  );
};

export default CustomToaster;
