import { DoctModal } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React from 'react';
import './rejectionReasonModal.scss';

const RejectionReasonModal = ({
  openRejectionReasonModal,
  handleClose,
  rejectionReason,
  handlePrimaryButtonClick,
}) => {
  return (
    <DoctModal
      title=""
      handlePrimaryButtonClick={handlePrimaryButtonClick}
      handleClose={handleClose}
      open={openRejectionReasonModal}
      iconName=""
      primaryBtnText="ok, Got it"
      className="rejection_reason_modal"
    >
      <DoctTypography variant="h6" fontWeight="bold" className="text-danger">
        Why rejection?
      </DoctTypography>
      <DoctTypography variant="body2" fontWeight="regular" className="text-grey-600">
        {rejectionReason}
      </DoctTypography>
      <DoctTypography variant="body2" fontWeight="regular" className="text-grey-600">
        For queries or help contact at: <a href="mailto:courses@docthub.com">courses@docthub.com</a>
      </DoctTypography>
    </DoctModal>
  );
};

export default RejectionReasonModal;
