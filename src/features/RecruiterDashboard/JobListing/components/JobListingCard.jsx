import { DoctActionMenu } from '@doct-react/app';
import { DoctButton, DoctIcon, DoctIconButton, DoctTypography } from '@doct-react/core';
import React, { useState } from 'react';
import CustomToaster from '../../../../shared/ui/CustomToaster/CurstomToaster';
import PublishedIcon from '../../../../assets/icons/publish_icon.svg';
import { getOptionsFromStatus } from '../utils/getOptionsFromStatus';
import { statusBgStyles } from '../utils/getStatusBgStyles';
import ShareComponent from './ShareComponent';
import {
  useChangeJobStatusMutation,
  useDeleteJobPostMutation,
  useRefreshJobMutation,
} from '../services/jobs.services';
import { useNavigate } from 'react-router';
import {
  DASHBOARD,
  EDIT_JOB,
  JOB_APPLICANTS,
  JOB_PREVIEW,
  POST_A_JOB,
  RECRUITER,
} from '../../../../routes/constant';
import CloseJobModal from './CloseJobModal';

const JobListingCard = ({ jobDetail }) => {
  const {
    title,
    status,
    views,
    jobApplicantCount,
    rejectionReason,
    publishedDate,
    startYear,
    endYear,
    jobId,
    closedDate,
    city,
    id,
    state,
    newApplicantCount,
  } = jobDetail;

  const navigate = useNavigate();

  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showClipBoardSuccessToaster, setShowClipBoardSuccessToaster] = useState(false);
  const [openCloseJobModal, setOpenCloseJobModal] = useState(false);
  const [closeJobReason, setCloseJobReason] = useState('');

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_RECRUITMENT_WEB_APP_LINK}/`);
    setShowClipBoardSuccessToaster(true);
  };

  const [deleteJobPost] = useDeleteJobPostMutation();
  const [changeStatus] = useChangeJobStatusMutation();
  const [refreshJob] = useRefreshJobMutation();

  const optionClickHandler = (val) => {
    if (val.title.includes('Delete')) {
      deleteJobPost({ id });
    } else if (val.title == 'Cancel Post') {
      changeStatus({ id, status: 'Cancelled' });
    } else if (val.title == 'Preview Job') {
      navigate(`/${DASHBOARD}/${RECRUITER}/${JOB_PREVIEW}/${id}`);
    } else if (val.title.includes('Duplicate')) {
      navigate(`/${DASHBOARD}/${RECRUITER}/${POST_A_JOB}?duplicateId=${id}`);
    } else if (val.title.includes('Edit')) {
      navigate(`/${DASHBOARD}/${RECRUITER}/${id}/${EDIT_JOB}`);
    } else if (val.title == 'Close Job') {
      setOpenCloseJobModal(true);
    }
  };

  return (
    <div className="position-relative">
      <div
        className={`${
          status != 'Draft' && status != 'Cancelled' ? 'bg-white' : 'bg-grey-100'
        } border-radius p-2 my-2`}
      >
        {status == 'Rejected' && (
          <>
            <div className="d-flex justify-content-between card_status card_status_rejected mt-1 ml-0">
              <div className="d-flex">
                <DoctIcon width="14" className="ml-2" name="cancelOutline" fill="#EA4335" />
                <DoctTypography
                  variant="subtitle3"
                  className="px-2 text-grey-800 font-weight-medium"
                >
                  Your job post for this title is rejected.
                </DoctTypography>
              </div>
              <DoctButton
                variant="text"
                className="doct-medium-button text-grey-500"
                text="Learn why?"
                type="inverse"
              />
            </div>
          </>
        )}

        {status == 'Active' && (
          <>
            <div className="d-flex justify-content-between card_status card_status_published mt-1 ml-0">
              <div className="d-flex">
                <img width={16} src={PublishedIcon} className="ml-2" />
                <DoctTypography
                  variant="subtitle3"
                  className="px-2 text-grey-800 font-weight-medium"
                >
                  {newApplicantCount} New Applicants!
                </DoctTypography>
              </div>
              <DoctButton
                variant="text"
                className="mt-n1"
                text="View"
                icon="right"
                iconPosition="right"
                type="inverse"
                onButtonClickHandler={() => {
                  navigate(`/${DASHBOARD}/${RECRUITER}/${JOB_APPLICANTS}?jobId=${id}`);
                }}
              />
            </div>
          </>
        )}

        {status == 'ActivationRequested' && (
          <>
            <div className="d-flex card_status card_status_approval mt-1 ml-0">
              <DoctIcon width="14" className=" mt-12px ml-2" name="timerOutline" fill="#FFB200" />
              <DoctTypography variant="subtitle3" className="px-2 text-grey-800 font-weight-medium">
                It takes 48 hours for approval from Docthub.
              </DoctTypography>
            </div>
          </>
        )}
        <DoctTypography variant="subtitle1" fontWeight="medium" className="my-2">
          {title}
        </DoctTypography>
        <div className="d-flex align-items-center">
          <DoctTypography
            variant="textLabel2"
            className={`${statusBgStyles(status)} d-inline-block p-1 text-white m-0`}
          >
            {status != 'ActivationRequested' ? status?.toUpperCase() : 'UNDER REVIEW'}
          </DoctTypography>

          <DoctTypography variant="textLabel2" className="mx-2 text-grey-600">
            {status == 'Active' || status == 'Closed' ? <span>ID: {jobId} </span> : null}
          </DoctTypography>

          {status != 'Draft' && status != 'Cancelled' && (
            <DoctTypography variant="textLabel2" className="text-grey-600">
              {status != 'Rejected' && status != 'ActivationRequested' ? (
                <>&bull;&nbsp;&nbsp;</>
              ) : null}
              Posted {new Date(publishedDate)?.toLocaleDateString()}
            </DoctTypography>
          )}

          {status != 'Closed' && status != 'Draft' && status != 'Cancelled' && (
            <>
              <DoctTypography
                variant="textLabel2"
                className="text-grey-600 mx-3 d-flex align-items-center"
              >
                <DoctIcon name="location" width="18" className="m-0 p-0" />
                &nbsp; {city?.name}, {state?.name}
              </DoctTypography>
              <DoctTypography
                variant="textLabel2"
                className="text-grey-600 mx-1 d-flex align-items-center"
              >
                <DoctIcon name="workOutline" width="20" className="m-0 p-0" />
                &nbsp; {startYear} - {endYear} Years
              </DoctTypography>
            </>
          )}

          {status == 'Closed' && (
            <DoctTypography
              variant="textLabel2"
              className="text-grey-600 mx-3 d-flex align-items-center"
            >
              &bull;&nbsp; Unpublished {new Date(closedDate)?.toLocaleDateString()}
            </DoctTypography>
          )}
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <DoctTypography
            variant="textLabel2"
            className={`${
              status != 'Draft' && status != 'Rejected' && status != 'Cancelled'
                ? 'text-grey-600'
                : 'text-grey-300'
            }`}
          >
            {views} Views &nbsp;&bull;&nbsp;&nbsp;
            <span
              className={`${
                status != 'Draft' && status != 'Rejected' && status != 'Cancelled'
                  ? 'text-primary'
                  : 'text-grey-300'
              }`}
            >
              {jobApplicantCount} Applicants
            </span>
          </DoctTypography>

          <div>
            <span className="d-flex align-items-center">
              {status == 'Active' && (
                <>
                  <DoctButton
                    text="Refresh"
                    type="semantic-success"
                    variant="text"
                    size="medium"
                    onButtonClickHandler={() => {
                      refreshJob({ id });
                    }}
                  />
                  <DoctIconButton
                    variant="text"
                    onButtonClickHandler={() => {
                      !showShareMenu ? setShowShareMenu(true) : setShowShareMenu(false);
                    }}
                    type="inverse"
                    icon="share"
                    className="mx-2"
                  />
                </>
              )}
              {status == 'Rejected' ? (
                <DoctButton
                  type="semantic-danger"
                  variant="text"
                  text="Delete Job"
                  className="text-danger"
                  size="medium"
                />
              ) : (
                <DoctActionMenu
                  onClick={(val) => {
                    optionClickHandler(val);
                  }}
                  className="card_action_menu_options"
                  options={getOptionsFromStatus(status)}
                />
              )}
            </span>
          </div>
        </div>
      </div>

      {showShareMenu && <ShareComponent copyLinkHandler={copyLinkHandler} />}

      {showClipBoardSuccessToaster && (
        <CustomToaster
          text={'Link Copied!'}
          handleRemoval={() => setShowClipBoardSuccessToaster(false)}
          bgColor={'#4B4B4B'}
          top="80%"
          right="35%"
        />
      )}

      <CloseJobModal
        openCloseJobModal={openCloseJobModal}
        handleClose={() => setOpenCloseJobModal(false)}
        setCloseJobReason={setCloseJobReason}
        onCloseJobClick={() => {
          changeStatus({
            id: id,
            status: 'Closed',
            closedReason: closeJobReason,
          });
        }}
      />
    </div>
  );
};

export default JobListingCard;
