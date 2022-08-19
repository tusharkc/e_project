import { DoctModal } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React from 'react';

const DeleteMembershipModal = ({ isErrorInDeleting, handlePrimaryButtonClick }) => {
  return (
    <div>
      <DoctModal
        open={isErrorInDeleting}
        className="success_member_modal"
        iconName=""
        width={328}
        handlePrimaryButtonClick={handlePrimaryButtonClick}
        primaryBtnText="OK"
      >
        <DoctTypography variant="h5">Can not delete this membership.</DoctTypography>
        <DoctTypography variant="subtitle3" className="text-grey-600">
          Error while deleting this membership because there are members enroled with this
          membership.
        </DoctTypography>
      </DoctModal>
    </div>
  );
};

export default DeleteMembershipModal;
