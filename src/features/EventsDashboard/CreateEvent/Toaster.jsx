import { DoctIcon } from '@doct-react/core';
import React from 'react';
import './Toaster.scss';

const Toaster = ({ text }) => {
  return (
    <>
      <div className={`custom-toster custom-toster-failed`}>
        <div className="custom-toster-icon">
          <DoctIcon width="24" height="24" name={'exclamation'} />
        </div>
        {text}
      </div>
    </>
  );
};

export default Toaster;
