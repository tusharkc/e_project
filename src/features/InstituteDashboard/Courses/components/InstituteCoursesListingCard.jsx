import { DoctIcon, DoctTypography, DoctButton, DoctIconButton } from '@doct-react/core';
import React, { useState } from 'react';
import DurationIcon from '../../../../assets/icons/institute-dashboard/timer_watch_icon.svg';
import ChairIcon from '../../../../assets/icons/institute-dashboard/icon_chair.svg';
import PublishedIcon from '../../../../assets/icons/publish_icon.svg';
import './CourseStatusStyle.scss';
import '../../../InstituteDashboard/Courses/InstituteCourseListingStyle.scss';
import { DoctActionMenu } from '@doct-react/app';
import { useUpdateCourseStatusMutation, useDeleteCourseMutation } from '../services/course.service';
import { useNavigate } from 'react-router-dom';
import * as ROUTE from '../../../../routes/constant';
import UnPublishCourseModal from './UnPublishCourseModal/UnPublishCourseModal';
import RejectionReasonModal from './RejectionReasonModal/RejectionReasonModal';
import CustomToaster from '../../../../shared/ui/CustomToaster/CurstomToaster';

const InstituteCoursesListingCard = ({ courseDetails }) => {
  const [updateStatus] = useUpdateCourseStatusMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const navigate = useNavigate();
  const [openUnPublisheModal, setOpenUnPublisheModal] = useState(false);
  const [unPublishReason, setUnPublishReason] = useState();
  const [openRejectionReasonModal, setOpenRejectionReasonModal] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showClipBoardSuccessToaster, setShowClipBoardSuccessToaster] = useState(false);
  const [showUnPublishedToaster, setShowUnPublishedToaster] = useState(false);

  const {
    courseTitle: { name },
    status,
    id,
    applyType,
    courseType: { name: courseTypeName },
    duration,
    durationType,
    courseApplicantCount,
    totalSeats,
    newApplicantCount,
    rejectionReason,
    route,
  } = courseDetails;

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_COURSES_WEB_APP}/${route}`);
    setShowClipBoardSuccessToaster(true);
  };

  const optionClickHandler = (option) => {
    if (option.title.includes('Delete')) {
      deleteCourse({ id: id });
    } else if (option.title == 'Unpublish Course') {
      setOpenUnPublisheModal(true);
    } else if (option.title == 'Cancel Listing Request') {
      updateStatus({ id: id, status: 'Draft' });
    } else if (option.title.includes('Edit')) {
      navigate(`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${id}/${ROUTE.INSTITUTE_EDIT_COURSE}`);
    } else if (option.title.includes('Preview')) {
      navigate(`/${ROUTE.DASHBOARD}/${ROUTE.INSTITIUTE}/${id}/${ROUTE.PREVIEW_COURSE}`);
    }
  };

  let options;

  const returnApplyType = (applyTypeFromApi) => {
    if (applyTypeFromApi == 0) {
      return 'Through Docthub';
    } else if (applyTypeFromApi == 1) {
      return 'Institute Website';
    } else if (applyTypeFromApi == 2) {
      return 'View Contact Details';
    }
  };

  switch (status?.toString()) {
    case 'Published':
      options = [
        { title: 'Edit/Update Course' },
        { title: 'Unpublish Course' },
        { title: 'Preview Course' },
      ];
      break;

    case 'Draft':
      options = [
        { title: 'Edit/Publish Course' },
        { title: 'Delete Draft', className: 'text-danger' },
      ];
      break;

    case 'ActivationRequested':
      options = [{ title: 'Cancel Listing Request' }, { title: 'Preview Course' }];
      break;

    case 'UnPublished':
      options = [
        { title: 'Edit/Republish Course' },
        { title: 'Delete Course', className: 'text-danger' },
      ];
      break;

    default:
      break;
  }

  const badgeClassName = `badge ${
    status == 'Rejected'
      ? 'bg-danger'
      : status == 'ActivationRequested'
      ? 'bg-warning'
      : status == 'Published'
      ? 'bg-success'
      : status == 'UnPublished'
      ? 'bg-grey-600'
      : status == 'Draft'
      ? 'bg-info'
      : ''
  } text-white text-center mt-sm-3 mr-3 font-weight-regular`;

  return (
    <div className="position-relative">
      <div
        className={`my-2 institute_course_listing_card_body border-radius box-shadow ${
          status != 'Draft' ? 'bg-white' : 'bg-grey-100'
        } py-1 px-2`}
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
                  Your listing request for this course is Rejected.
                </DoctTypography>
              </div>
              <DoctButton
                variant="text"
                className="doct-medium-button text-grey-500"
                text="Learn how?"
                type="inverse"
                onButtonClickHandler={() => setOpenRejectionReasonModal(true)}
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

        {status == 'Published' && (
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
                  navigate(
                    `/${ROUTE.DASHBOARD}/${ROUTE.INSTITIUTE}/${ROUTE.INSTITUTE_APPLICANTS}?id=${id}`,
                  );
                }}
              />
            </div>
          </>
        )}

        <DoctTypography variant="subtitle1" className="mt-1 text-grey-800 font-weight-bold">
          {name}
        </DoctTypography>

        <div className="d-flex mt-n4">
          <DoctTypography variant="textLabel2" className={badgeClassName}>
            {status != 'ActivationRequested' ? status.toString().toUpperCase() : 'PENDING APPROVAL'}
          </DoctTypography>
          {status != 'Draft' && (
            <>
              <DoctTypography
                variant="textLabel2"
                className="text-grey-600 mt-sm-3 font-weight-regular"
              >
                ID: {id} |&nbsp;
              </DoctTypography>
              <DoctTypography
                variant="textLabel2"
                className="text-grey-600 mt-3 font-weight-regular"
              >
                Apply action: {returnApplyType(applyType)}
              </DoctTypography>
            </>
          )}
        </div>
        {status != 'Draft' && (
          <DoctTypography
            variant="subtitle3"
            className="d-flex mt-0 text-grey-600 font-weight-medium"
          >
            {courseTypeName} <img src={DurationIcon} className="px-2" />
            Duration: {`${duration || ''} ${durationType || ''}`}
            <img src={ChairIcon} className="px-2" />
            Total Seats: {totalSeats}
          </DoctTypography>
        )}
        <div className="d-flex align-items-center justify-content-between">
          <DoctTypography variant="textLabel2" className="font-weight-regular">
            {/* {views || 0} Views <span className="text-grey-400">&nbsp; &bull; &nbsp;</span> */}
            {/* {interests || 0} Interests <span className="text-grey-400">&nbsp; &bull; &nbsp;</span> */}
            <span
              className={`${
                status == 'ActivationRequested' || status == 'Rejected' || status == 'Draft'
                  ? 'text-grey-400'
                  : 'text-primary'
              } font-weight-regular`}
            >
              {courseApplicantCount || 0} Applicants
            </span>
          </DoctTypography>
          {status != 'Rejected' && (
            <div className="d-flex align-items-center">
              {status == 'Published' && (
                <DoctIconButton
                  variant="text"
                  onButtonClickHandler={() =>
                    !showShareMenu ? setShowShareMenu(true) : setShowShareMenu(false)
                  }
                  type="inverse"
                  icon="share"
                  className="mx-2"
                />
              )}

              <DoctActionMenu
                className="card_action_menu_options"
                onClick={(option) => {
                  optionClickHandler(option);
                }}
                options={options}
              />
            </div>
          )}
          {status == 'Rejected' && (
            <div className="Rejected_buttons d-flex">
              <DoctButton
                size="medium"
                text="Delete Course"
                className="px-2 delete_course_btn"
                type="inverse"
                onButtonClickHandler={() => {
                  deleteCourse({ id: id });
                }}
              />
              <DoctButton
                size="medium"
                text="Keep as Draft"
                className="keep_Draft_btn"
                type="inverse"
                onButtonClickHandler={() => {
                  updateStatus({ id: id, status: 'Draft' });
                }}
              />
            </div>
          )}
        </div>
      </div>

      <UnPublishCourseModal
        openUnPublisheModal={openUnPublisheModal}
        handleClose={() => setOpenUnPublisheModal(false)}
        setUnPublishReason={setUnPublishReason}
        onUnPublishClick={() => {
          updateStatus({
            id: id,
            status: 'UnPublished',
            unPublishedReason: unPublishReason,
            unPublishedDate: new Date().toISOString(),
          });
          setShowUnPublishedToaster(true);
        }}
      />

      <RejectionReasonModal
        openRejectionReasonModal={openRejectionReasonModal}
        handleClose={() => setOpenRejectionReasonModal(false)}
        rejectionReason={rejectionReason}
        handlePrimaryButtonClick={() => setOpenRejectionReasonModal(false)}
      />

      {showShareMenu && (
        <div className="box-shadow share_options_menu position-absolute border-radius">
          <a
            href="https://www.facebook.com/"
            target={'_blank'}
            rel="noreferrer"
            className="d-flex align-items-center p-3 cursor-pointer"
          >
            <DoctIcon name="facebook" width="25" className="m-0 p-0" />
            <DoctTypography variant="body2" fontWeight="bold" className="mx-3 p-0 my-0">
              Facebook
            </DoctTypography>
          </a>
          <a
            href="https://twitter.com/"
            target={'_blank'}
            rel="noreferrer"
            className="d-flex align-items-center p-3 cursor-pointer"
          >
            <DoctIcon name="twitter" width="25" className="m-0 p-0" />
            <DoctTypography variant="body2" fontWeight="bold" className="mx-3 p-0 my-0">
              Twitter
            </DoctTypography>
          </a>
          <a
            href="https://linkedin.com/"
            target={'_blank'}
            rel="noreferrer"
            className="d-flex align-items-center p-3 cursor-pointer"
          >
            <DoctIcon name="linkedColour" width="25" className="m-0 p-0" />
            <DoctTypography variant="body2" fontWeight="bold" className="mx-3 p-0 my-0">
              Linkdin
            </DoctTypography>
          </a>
          <a
            href="https://instagram.com/"
            target={'_blank'}
            rel="noreferrer"
            className="d-flex align-items-center p-3 cursor-pointer"
          >
            <DoctIcon name="instagram" width="25" className="m-0 p-0" />
            <DoctTypography variant="body2" fontWeight="bold" className="mx-3 p-0 my-0">
              Instagram
            </DoctTypography>
          </a>
          <div className="share_menu_sepration_line w-100" />
          <div onClick={copyLinkHandler} className="d-flex align-items-center p-3 cursor-pointer">
            <DoctIcon name="link" width="25" className="m-0 p-0" />
            <DoctTypography variant="body2" fontWeight="bold" className="mx-3 p-0 my-0">
              Copy Link
            </DoctTypography>
          </div>
        </div>
      )}

      {showClipBoardSuccessToaster && (
        <CustomToaster
          text={'Link Copied!'}
          handleRemoval={() => setShowClipBoardSuccessToaster(false)}
          bgColor={'#4B4B4B'}
          top="80%"
          right="35%"
        />
      )}

      {showUnPublishedToaster && (
        <CustomToaster
          text={'Your course unpublished successfully!'}
          handleRemoval={() => setShowUnPublishedToaster(false)}
          bgColor={'#4B4B4B'}
          top="80%"
          right="35%"
        />
      )}
    </div>
  );
};

export default InstituteCoursesListingCard;
