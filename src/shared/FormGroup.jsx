import React from 'react';
import { DoctTypography } from '@doct-react/core';

const FormGroup = ({ title, description, rightContent, className = '', children }) => {
  return (
    <div className={`${className} mb-4`}>
      <div className="d-flex justify-content-between w-100">
        <DoctTypography
          variant="subtitle2"
          className={`mt-0 text-grey-800 ${description ? 'mb-0' : 'mb-3'}`}
        >
          {title}
        </DoctTypography>
        {rightContent && (
          <DoctTypography variant="textLabel2" className="text-grey-600 m-0">
            {rightContent}
          </DoctTypography>
        )}
      </div>
      {description && (
        <DoctTypography variant="body2" className={`mt-12px mb-3 text-grey-600`}>
          {description}
        </DoctTypography>
      )}

      {children}
    </div>
  );
};

export default FormGroup;
