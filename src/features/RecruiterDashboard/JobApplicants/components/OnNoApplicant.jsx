import { DoctTypography } from '@doct-react/core';
import React from 'react';
import OnNoApplicantImg from '../../../../assets/images/onNoApplicantFound.svg';

const OnNoApplicant = () => {
  return (
    <div className="text-center py-5">
      <img src={OnNoApplicantImg} />
      <DoctTypography variant="subtitle1">No applicants yet!</DoctTypography>
      <DoctTypography variant="subtitle2" className="no_applicant_text mx-auto text-grey-600">
        Selected job has not received applications <br /> yet.
      </DoctTypography>
    </div>
  );
};

export default OnNoApplicant;
