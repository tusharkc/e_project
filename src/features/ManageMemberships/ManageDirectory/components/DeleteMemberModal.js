import { DoctModal } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React from 'react';

const DeleteMemberModal = ({ open, handleClose, handlePrimaryButtonClick }) => {
  return (
    <>
      <DoctModal
        open={open}
        handleClose={handleClose}
        primaryBtnText="Delete"
        secondaryBtnText="Cancel"
        iconName=""
        className="delete_member_modal"
        width={328}
        handlePrimaryButtonClick={handlePrimaryButtonClick}
      >
        <DoctTypography variant="h6">Are you sure you want to delete?</DoctTypography>

        <DoctTypography variant="subtitle3" className="text-grey-600">
          It won&#39;t be possible to recover the data once it has been deleted.
        </DoctTypography>
      </DoctModal>
    </>
  );
};

export default DeleteMemberModal;
