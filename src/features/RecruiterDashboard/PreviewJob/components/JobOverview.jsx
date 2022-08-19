import { DoctContainer, DoctIcon, DoctTypography } from '@doct-react/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../components';

const JobOverview = ({ jobPreviewDetail = {} }) => {
  const user = useSelector(userSelector);
  const {
    title: jobTitle,
    startYear,
    endYear,
    minAmount,
    maxAmount,
    employementType,
    views,
    noOfVacancy,
    jobApplicantCount,
  } = jobPreviewDetail;

  return (
    <div className="my-3">
      <DoctContainer>
        <div className="bg-white border-radius">
          <div className="p-3">
            {user?.image && (
              <img
                src={user?.image}
                className="preview_jobs_image border-radius"
                alt="organizationImage"
              />
            )}
            {jobTitle && (
              <DoctTypography variant="h6" className="my-2">
                {jobTitle}
              </DoctTypography>
            )}

            <div className="d-flex align-items-center mb-4">
              <span className="bg-primary-500 job_verified_button p-1 text-white">
                &#10004; verified
              </span>

              <DoctTypography
                variant="textLabel2"
                className="d-flex align-items-center text-grey-600 mx-2 my-0"
              >
                <DoctIcon name="workOutline" fill="grey" width="15" height="15" className="mx-1" />
                {startYear || 0} - {endYear || 0} Years of Experience
              </DoctTypography>

              <DoctTypography className="text-grey-600 mx-1 my-0" variant="textLabel2">
                &#8377; {minAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0} -{' '}
                {maxAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || 0} Per Annum
              </DoctTypography>

              {employementType && (
                <DoctTypography
                  className="text-grey-600 mx-2 my-0 d-flex align-items-center justify-content-center"
                  variant="textLabel2"
                >
                  <DoctIcon
                    name="timerOutline"
                    width="15"
                    height="15"
                    fill="grey"
                    className="mx-1"
                  />{' '}
                  {employementType?.replace(/([A-Z])/g, ' $1').trim()}
                </DoctTypography>
              )}
            </div>

            {user?.tenant?.organizationName && (
              <DoctTypography className="my-1" variant="textLabel1" fontWeight="medium">
                {user?.tenant?.organizationName}
              </DoctTypography>
            )}

            <span className="d-flex align-items-center">
              <DoctIcon name="location" fill="gray" width="15" />
              <DoctTypography variant="textLabel2" className="my-0 mx-1 text-grey-600">
                {user?.city}, {user?.state}, {user?.country}
              </DoctTypography>
            </span>

            <DoctTypography variant="textLabel2" className="text-grey-600">
              {views || 0} Views &nbsp;&bull;
              <span className="mx-2">{noOfVacancy || 0} Vacancies</span>&bull;&nbsp;{' '}
              {jobApplicantCount || 0} Applicants
            </DoctTypography>
          </div>
        </div>
      </DoctContainer>
    </div>
  );
};

export default JobOverview;
