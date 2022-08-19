import { DoctButton, DoctContainer, DoctTypography } from '@doct-react/core';
import React from 'react';
import { useNavigate } from 'react-router';
import * as ROUTE from '../../../../../routes/constant';
import courseFailureIcon from '../../../../../assets/icons/institute-dashboard/course_failure_icon.svg';
import TalentAcquisitionCTA from './TalentAcquisitionCTA';

const JobPostFailure = () => {
  const navigate = useNavigate();

  return (
    <>
      <DoctContainer>
        <div className="my-5 status_container_failure">
          <div className="w-100 p-3 border-radius text-center">
            <div className="w-50 mx-auto">
              <img src={courseFailureIcon} alt="course_fail_icon" />
              <DoctTypography variant="h4">
                Your job post submission failed, Try again!
              </DoctTypography>
              <DoctTypography variant="textLabel2" fontWeight="regular" className="text-grey-600">
                Do not worry, you can try posting for the job again. For any further assistance
                please reach out to our support team at jobs@docthub.com
              </DoctTypography>
              <div className="my-3 d-flex align-items-center justify-content-center">
                <DoctButton
                  onButtonClickHandler={() => {
                    navigate(`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.POST_A_JOB}`);
                  }}
                  type="semantic-success"
                  text="Try Again"
                  size="medium"
                  className="m-1"
                />
                <DoctButton
                  onButtonClickHandler={() => {
                    navigate(`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.POSTING}`);
                  }}
                  variant="outlined"
                  text="Go to Dashboard"
                  size="medium"
                  className="m-1"
                />
              </div>
            </div>
          </div>
        </div>
      </DoctContainer>
      <TalentAcquisitionCTA />
    </>
  );
};

export default JobPostFailure;
