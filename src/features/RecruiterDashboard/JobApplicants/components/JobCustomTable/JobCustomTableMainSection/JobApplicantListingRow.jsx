import { DoctDropdownSelect } from '@doct-react/app';
import { DoctButton, DoctIcon, DoctTypography } from '@doct-react/core';
import React, { useState } from 'react';
import { useUpdateStatusMutation } from '../../../service/recruiterApplicants.service';
import JobApplicantCollapsibleEl from './JobApplicantCollapsibleEl';

const JobApplicantListingRow = ({ tableRowData = {}, id, selectedId, setSelectedId, jobId }) => {
  const { userName, createdDate, mobileNumber, email, resume, status, userId } = tableRowData;

  const date = new Date(createdDate);

  const menuItems = [
    { title: 'Shortlisted', value: 'Shortlisted' },
    { title: 'Reviewed', value: 'Reviewed' },
    { title: 'SavedForLater ', value: 'SavedForLater' },
    { title: 'Rejected', value: 'Rejected' },
    { title: 'UnRead', value: 'UnRead' },
  ];

  const [value, setValue] = useState(status);

  const returnStatusClassName = () => {
    if (value == 'UnRead' || value == 'Reviewed') {
      return 'applicant_status_select_status_default';
    } else if (value == 'Shortlisted') {
      return 'applicant_status_select_status_shortlist';
    } else if (value == 'SavedForLater') {
      return 'applicant_status_select_status_save';
    } else if (value == 'Reject') {
      return 'applicant_status_select_status_reject';
    }
  };

  const [updateApplicantStatus] = useUpdateStatusMutation();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedId(id);
        if (selectedId == id) {
          setSelectedId(null);
        }
      }}
      className="p-2 my-1 bg-white border-radius cursor-pointer"
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="my-1">
          <DoctTypography variant="subtitle2" className="my-0 p-0" fontWeight="medium">
            {userName}
          </DoctTypography>

          <div className="my-2 d-flex align-items-center">
            <DoctTypography variant="textLabel2" className="m-0 text-grey-600">
              Applied {date.toLocaleDateString('en-US')}
            </DoctTypography>

            <DoctTypography
              variant="textLabel2"
              className="text-grey-600 mx-2 d-flex align-items-center m-0"
            >
              <DoctIcon name="phone" width="20" /> &nbsp;{mobileNumber}
            </DoctTypography>

            <DoctTypography
              variant="textLabel2"
              className="text-grey-600 d-flex align-items-center m-0"
            >
              <DoctIcon name="emailOutline" width="20" /> &nbsp;{email}
            </DoctTypography>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <DoctButton
            text="Resume"
            icon="downloadOne"
            iconPosition="left"
            variant="text"
            type="secondary"
            onButtonClickHandler={(e) => {
              window.open(resume, '_blank');
              e.stopPropagation();
            }}
          />

          <span
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={returnStatusClassName()}
          >
            <DoctDropdownSelect
              value={value}
              handleChange={(e) => {
                e.stopPropagation();
                updateApplicantStatus({
                  id: jobId,
                  userId: userId,
                  updatedStatus: `"${e.target.value}"`,
                });
                setValue(e.target.value);
              }}
              menuItems={menuItems}
            />
          </span>
        </div>
      </div>
      {id == selectedId && (
        <div className="bg-grey-100 border-radius p-2">
          <JobApplicantCollapsibleEl tableCollapsibleDetailEl={tableRowData} />
        </div>
      )}
    </div>
  );
};

export default JobApplicantListingRow;
