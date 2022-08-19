import { DoctButton, DoctContainer, DoctTypography } from '@doct-react/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import courseFailureIcon from '../../../../../../assets/icons/institute-dashboard/course_failure_icon.svg';
import CounsellingCTA from '../static/CounsellingCta/CounsellingCTA';
import * as ROUTE from '../../../../../../routes/constant';

const CourseFailurePage = () => {
  const navigate = useNavigate();
  return (
    <DoctContainer>
      <div className="my-5">
        <div className="w-100 text-center">
          <div className="w-50 mx-auto">
            <img src={courseFailureIcon} alt="course_fail_icon" />
            <DoctTypography variant="h4">Your course submission failed, Try again! </DoctTypography>
            <DoctTypography variant="textLabel2" fontWeight="regular" className="text-grey-600">
              Do not worry, you can try listing for the course again. For any further assistance
              please reach out to our support team at courses@docthub.com
            </DoctTypography>
            <div className="my-3 d-flex align-items-center justify-content-center">
              <DoctButton
                onButtonClickHandler={() => {
                  navigate(`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_ADD_COURSE}`);
                }}
                type="semantic-success"
                text="Try Again"
                size="medium"
                className="m-1"
              />
              <DoctButton
                onButtonClickHandler={() => {
                  navigate(`/${ROUTE.DASHBOARD}`);
                }}
                variant="outlined"
                text="Go to Dashboard"
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

export default CourseFailurePage;
