import { DoctButton, DoctContainer, DoctTypography } from '@doct-react/core';
import React from 'react';
import courseSuccessTick from '../../../../../../assets/icons/institute-dashboard/course_success_tick.svg';
import CounsellingCTA from '../static/CounsellingCta/CounsellingCTA';
import * as ROUTE from '../../../../../../routes/constant';
import { useNavigate } from 'react-router-dom';

const CourseSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <DoctContainer>
      <div className="my-5">
        <div className="w-100 text-center">
          <div className="w-50 mx-auto">
            <img src={courseSuccessTick} />
            <DoctTypography variant="h4">
              Your course has been submitted successfully.
            </DoctTypography>
            <DoctTypography variant="textLabel2" fontWeight="regular" className="text-grey-600">
              Upon approval, your course will be published on our platform and you will receive a
              confirmation email. Once your course goes live, you will start receiving applications
              and inquiries from students.
            </DoctTypography>
            <div className="my-3 d-flex align-items-center justify-content-center">
              <DoctButton
                onButtonClickHandler={() => {
                  navigate(`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_COURSES}`);
                }}
                variant="outlined"
                text="Go to Dashboard"
                size="medium"
                className="m-1"
              />
              <DoctButton
                onButtonClickHandler={() => {
                  navigate(`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_ADD_COURSE}`);
                }}
                text="List more Courses"
                size="medium"
                className="m-1"
              />
            </div>
          </div>
        </div>
        <CounsellingCTA />
      </div>
    </DoctContainer>
  );
};

export default CourseSuccessPage;
