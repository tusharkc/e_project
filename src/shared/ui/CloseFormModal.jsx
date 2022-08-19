import { DoctModal } from '@doct-react/app';
import { DoctButton, DoctTypography } from '@doct-react/core';
import React from 'react';

const CloseFormModal = ({ open, handleClose, onConfirmExit = () => {} }) => {
  return (
    <div>
      <DoctModal open={open} handleClose={handleClose} iconName="" showFooter={false}>
        <DoctTypography variant="h6">Are you sure you want to close?</DoctTypography>
        <DoctTypography variant="body3" className="text-grey-600">
          You can save draft to continue later from where you left or discard all the progress.
        </DoctTypography>

        <DoctButton
          className="float-right mx-2 discard_btn "
          text="Yes"
          variant="contained"
          size="medium"
          onButtonClickHandler={onConfirmExit}
        />
        <DoctButton
          className="float-right save_draft_btn text-grey-600"
          text="No"
          variant="contained"
          size="medium"
          onButtonClickHandler={handleClose}
        />
      </DoctModal>
    </div>
  );
};

export default CloseFormModal;
