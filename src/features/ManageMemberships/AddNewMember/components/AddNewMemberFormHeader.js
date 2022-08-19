import { DoctButton, DoctIcon, DoctTypography } from '@doct-react/core';
import React, { useState } from 'react';
import { SaveAsDraftModal } from './SaveAsDraftModal';
import { useNavigate } from 'react-router-dom';
import '../addNewMember.scss';
const AddNewMemberFormHeader = ({ setStatus }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="add_new_member_header bg-grey-100 d-flex align-items-center justify-content-between py-3 px-4">
        <div className="d-flex align-items-center">
          <span
            className="cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <DoctIcon name="close" fill="grey" width="24" />
          </span>
          <DoctTypography variant="body2" fontWeight="bold" className="px-3">
            Add New Member
          </DoctTypography>
        </div>
        <div
          type="submit"
          onClick={() => {
            setStatus('Draft');
          }}
        >
          <DoctButton text="Save Draft" variant="outlined" size="medium" />
        </div>
      </div>

      <SaveAsDraftModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default AddNewMemberFormHeader;
