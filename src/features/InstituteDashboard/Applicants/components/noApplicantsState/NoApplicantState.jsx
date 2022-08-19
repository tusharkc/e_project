import { DoctTypography } from '@doct-react/core';
import React from 'react';
import noApplicantIllustration from '../../../../../assets/images/courses/no_applicant.svg';

const NoApplicantState = () => {
  return (
    <div className="text-center py-3 text-grey-600">
      <img src={noApplicantIllustration} alt="no_applicants_yet" />
      <DoctTypography variant="body1" className="my-2" fontWeight="bold">
        No applicants yet!
      </DoctTypography>
      <DoctTypography variant="body2" className="my-0">
        Selected course has not received
        <br /> applications yet.
      </DoctTypography>
    </div>
  );
};

export default NoApplicantState;
