import { DoctForm, DoctModal, DoctRadioGroup } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React from 'react';
import './closeJobModal.styles.scss';
const CloseJobModal = ({
  openCloseJobModal,
  handleClose,
  setCloseJobReason,
  onCloseJobClick = () => {},
}) => {
  const { control, errors, handleSubmit } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const handleFormSubmit = handleSubmit((values) => {
    setCloseJobReason(values.closeJobReason);
    onCloseJobClick();
    handleClose();
  });
  return (
    <>
      <DoctModal
        iconName=""
        className="close_job_modal"
        open={openCloseJobModal}
        title=""
        handlePrimaryButtonClick={handleFormSubmit}
        primaryBtnText="Close Job"
        handleClose={handleClose}
      >
        <form onSubmit={handleFormSubmit}>
          <DoctTypography variant="h6" fontWeight="medium">
            Why closing job?
          </DoctTypography>
          <DoctRadioGroup
            name="closeJobReason"
            id="closeJobReason"
            control={control}
            options={[
              {
                value: 'This position has been closed via DocthubJobs.',
                label: 'This position has been closed via DocthubJobs.',
              },
              {
                value: 'This position has been closed via other channel.',
                label: 'This position has been closed via other channel.',
              },
              {
                value: 'This position has gone on hold.',
                label: 'This position has gone on hold.',
              },
              {
                value: 'We have received enough responses for this position.',
                label: 'We have received enough responses for this position.',
              },
            ]}
            errors={{}}
            isErrors={errors}
          />
        </form>
      </DoctModal>
    </>
  );
};

export default CloseJobModal;
