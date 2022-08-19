import { DoctDropdownSelect, DoctModal } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React, { useState } from 'react';
import { putMemberStatus } from '../services/members.services';

const ChangeStatusModal = ({ value, setValue, open, handleClose, membershipId, memberId }) => {
  const [errMsg, setErrMsg] = useState();

  const [choosingInactive, setChoosingInactive] = useState(false);
  const handleStatusChange = (e) => {
    setValue(e?.target.value);
  };

  return (
    <>
      <DoctModal
        open={open}
        handleClose={handleClose}
        primaryBtnText="Submit"
        secondaryBtnText="Cancel"
        iconName=""
        title="Change Status"
        className="change_status_modal"
        width={328}
        handlePrimaryButtonClick={() => {
          if (value) {
            if (value != 'Inactive') {
              putMemberStatus(membershipId, memberId, value).catch(() => {
                setErrMsg("You cannot convert a member's status from Active or Inactive to Draft");
              });
            } else {
              setChoosingInactive(true);
            }
          }
        }}
      >
        <DoctModal
          primaryBtnText="Submit"
          secondaryBtnText="Cancel"
          iconName=""
          width={328}
          open={choosingInactive}
          handleClose={() => {
            setChoosingInactive(false);
          }}
          handlePrimaryButtonClick={() => {
            putMemberStatus(membershipId, memberId, value);
          }}
        >
          <DoctTypography variant="h6">Are you sure you want to Inactive a member?</DoctTypography>
          <DoctTypography variant="subtitle3" className="text-grey-600">
            You can active a member again from the listing.
          </DoctTypography>
        </DoctModal>

        <DoctDropdownSelect
          label="Change Status"
          width={295}
          value={value}
          handleChange={handleStatusChange}
          menuItems={[
            { title: 'Active', value: 'Active' },
            { title: 'Draft', value: 'Draft' },
            { title: 'Inactive', value: 'Inactive' },
            { title: 'Renewal Pending', value: 'RenewalPending' },
          ]}
        />
        <DoctTypography variant="subtitle3" className="text-danger">
          {errMsg && errMsg}
        </DoctTypography>
      </DoctModal>
    </>
  );
};

export default ChangeStatusModal;
