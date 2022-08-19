import { DoctTypography } from '@doct-react/core';
import React from 'react';

const StepTitle = React.memo(function FormHeading({ children }) {
  return (
    <DoctTypography variant="h6" className="mb-4">
      {children}
    </DoctTypography>
  );
});

const FormHeading = React.memo(function FormHeading({ children }) {
  return (
    <DoctTypography variant="subtitle2" className="pb-12px my-0">
      {children}
    </DoctTypography>
  );
});

export { FormHeading, StepTitle };
