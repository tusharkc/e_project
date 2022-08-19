import { DoctCol, DoctContainer, DoctIcon, DoctTypography } from '@doct-react/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../../components';
import timerSvg from '../../../../../assets/icons/institute-dashboard/timer_watch_icon.svg';
import seatsSvg from '../../../../../assets/icons/institute-dashboard/icon_chair.svg';
import intrestedIcon from '../../../../../assets/icons/institute-dashboard/intrestedIcon.PNG';
const TenentCourseOverview = ({ courseDetails }) => {
  const user = useSelector(userSelector);

  const { tenant } = user || {};

  const { courseTitle, durationType, duration, totalSeats } = courseDetails || {};

  return (
    <div className="my-3">
      <DoctContainer>
        <div className="bg-white border-radius">
          <div className="p-3">
            {user?.image && (
              <img
                src={user?.image || ''}
                className="preview_institute_image border-radius"
                alt="instituteImage"
              />
            )}
            <DoctTypography variant="h6" className="my-2">
              {typeof courseTitle == 'string' ? courseTitle : courseTitle?.name}
            </DoctTypography>

            <div className="d-flex align-items-center">
              <span className="d-flex align-items-center">
                <img src={timerSvg} alt="timer_img" />
                <DoctTypography variant="textLabel2" className="ml-1 mr-0 my-0">
                  Duration: {durationType && duration ? `${duration} ${durationType}` : '-'}
                </DoctTypography>
              </span>
              <span className="d-flex align-items-center ml-2">
                <img src={seatsSvg} alt="timer_img" />
                <DoctTypography variant="textLabel2" className="ml-1 mr-0 my-0">
                  Total Seats: {totalSeats ? totalSeats : '-'}
                </DoctTypography>
              </span>
            </div>

            <DoctTypography variant="textLabel1" fontWeight="medium">
              {tenant?.organizationName}
            </DoctTypography>

            <DoctTypography variant="textLabel2" className="d-flex align-items-center m-0">
              <span className="bg-primary-500 course_verified_button p-1 text-white">
                &#10004; verified
              </span>
              <span className="ml-2 d-flex align-items-center">
                <DoctIcon name="location" fill="gray" width="20"></DoctIcon>
                <span className="text-grey-600">
                  {user?.city}, {user?.state}, {user?.country}
                </span>
              </span>
            </DoctTypography>

            <DoctTypography variant="textLabel2" className="d-flex align-items-center my-4">
              <span className="text-grey-600">0 Views</span>
              <span className="ml-2 d-flex align-items-center ml-5">
                <img src={intrestedIcon} width={32} />
                <span className="text-grey-600">0 Interested</span>
              </span>
            </DoctTypography>
          </div>
        </div>
      </DoctContainer>
    </div>
  );
};

export default TenentCourseOverview;
