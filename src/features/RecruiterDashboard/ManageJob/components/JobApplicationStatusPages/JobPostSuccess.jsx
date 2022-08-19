import { DoctButton, DoctContainer, DoctTypography } from '@doct-react/core';
import React from 'react';
import { useNavigate } from 'react-router';
import jobSuccessTick from '../../../../../assets/icons/institute-dashboard/course_success_tick.svg';
import * as ROUTE from '../../../../../routes/constant';
import './JobApplicationStatus.style.scss';
import TalentAcquisitionCTA from './TalentAcquisitionCTA';

const JobPostSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <DoctContainer>
        <div className="my-5 status_container_success">
          <div className="w-100 p-3 border-radius text-center">
            <div className="w-50 mx-auto">
              <img src={jobSuccessTick} />
              <DoctTypography variant="h4">
                Your job has been submitted successfully.
              </DoctTypography>
              <DoctTypography variant="textLabel2" fontWeight="regular" className="text-grey-600">
                Upon approval, your job will be published on our platform and you will receive a
                confirmation email. Once your job goes live, you will start receiving applications
                from relevant candidates.
              </DoctTypography>
              <div className="my-3 d-flex align-items-center justify-content-center">
                <DoctButton
                  onButtonClickHandler={() => {
                    navigate(`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.POSTING}`);
                  }}
                  variant="outlined"
                  text="Go to Dashboard"
                  size="medium"
                  className="m-1"
                />
                <DoctButton
                  onButtonClickHandler={() => {
                    navigate(`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.POST_A_JOB}`);
                  }}
                  text="Post more Jobs"
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

export default JobPostSuccess;
