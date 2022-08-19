import { DoctTypography } from '@doct-react/core';
import React from 'react';
import rocketIllustration from '../../../../../../../assets/icons/institute-dashboard/counselling_rocket_illustration.svg';
import counsellingIllustration from '../../../../../../../assets/images/counselling_illustration.svg';
import './CounsellingCta.scss';

const CounsellingCTA = () => {
  return (
    <div className="w-100 my-5">
      <div className="product_objective_text border-radius d-flex p-2">
        <img src={rocketIllustration} alt="rocket_illustration" />

        <span className="mx-2">
          <DoctTypography variant="body2">
            <span className="font-weight-bold">
              Become a premium subscriber to boost inquiries & to enhance your experience
            </span>
            <br /> kindly contact our Sales Team at{' '}
            <a href="mailto:courses@docthub.com">courses@docthub.com</a>
          </DoctTypography>
        </span>
      </div>

      <div className="d-flex w-75 mx-auto mt-5 align-items-center justify-content-between">
        <div className="w-50">
          <DoctTypography variant="h4">
            <span className="text-primary-400">Counselling</span> for Business
          </DoctTypography>
          <DoctTypography variant="body2" className="text-grey-600">
            We can be your official career counselling partner!!!!
          </DoctTypography>
          <DoctTypography variant="body1" fontWeight="regular">
            Docthub is open to career counselling partnerships with Institutes, Schools & Coaching
            Classes.
          </DoctTypography>
          <DoctTypography variant="body2" className="text-grey-600">
            For More information reach us at, <br /> Email:
            <a href="mailto:counselling@docthub.com"> counselling@docthub.com </a>
            OR <br /> Call on: (+91) 8320876298
          </DoctTypography>
        </div>

        <img src={counsellingIllustration} />
      </div>
    </div>
  );
};

export default CounsellingCTA;
