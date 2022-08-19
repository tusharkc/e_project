import { DoctContainer, DoctIcon, DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetCourseDetalsByIdQuery } from '../ManageCourse/services/manageCourse.services';
import { TenentCourseDetail } from './component/TenentCourseDetail';
import TenentCourseOverview from './component/TenentCourseOverview';
import './previewCourseStyles.scss';

const PreviewCourse = ({ addBgGrey = true, courseDetails = {}, showClosPreviewHeader = false }) => {
  const location = useLocation();
  const { pathname } = location;
  const courseId = pathname.replace(/[^0-9]/g, '');
  const { data: courseData } = useGetCourseDetalsByIdQuery({ id: courseId });
  const [courseDataFromId, setCourseDataFromId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (courseData) {
      setCourseDataFromId(courseData);
    }
  }, [courseData]);

  return (
    <>
      {showClosPreviewHeader && (
        <div className="bg-info">
          <DoctContainer>
            <div className="d-flex align-items-center text-white">
              <span
                className="cursor-pointer"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <DoctIcon name="close" width="30" />
              </span>
              <DoctTypography variant="body2" className="mx-3">
                Close Preview
              </DoctTypography>
            </div>
          </DoctContainer>
        </div>
      )}
      <div className={`${addBgGrey && 'bg-grey-200'} py-2`}>
        <TenentCourseOverview
          courseDetails={
            courseDetails && Object.keys(courseDetails)?.length > 0
              ? courseDetails
              : courseDataFromId
          }
        />
        <TenentCourseDetail
          courseDetails={
            courseDetails && Object.keys(courseDetails)?.length > 0
              ? courseDetails
              : courseDataFromId
          }
        />
      </div>
    </>
  );
};

export default PreviewCourse;
