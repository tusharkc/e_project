import React, { useEffect } from 'react';
import JobOverview from './components/JobOverview';
import JobDetail from './components/JobDetail';
import './previewJobs.styles.scss';
import { DoctContainer, DoctIcon, DoctTypography } from '@doct-react/core';
import { useLocation, useNavigate } from 'react-router';
import { useGetJobByIdQuery } from '../ManageJob/services/manageJob.services';

const PreviewJob = ({ addBgGrey = true, jobDetails = {}, showClosPreviewHeader = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const jobId = pathname.replace(/[^0-9]/g, '');
  const { data: jobDetailFromId } = useGetJobByIdQuery({ id: jobId });

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
        <JobOverview
          jobPreviewDetail={
            jobDetails && Object.keys(jobDetails)?.length > 0 ? jobDetails : jobDetailFromId
          }
        />
        <JobDetail
          jobPreviewDetail={
            jobDetails && Object.keys(jobDetails)?.length > 0 ? jobDetails : jobDetailFromId
          }
        />
      </div>
    </>
  );
};

export default PreviewJob;
