import { DoctForm, DoctModal, DoctRadioGroup } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React from 'react';
import './unPublishCourseModal.scss';

const UnPublishCourseModal = ({
  openUnPublisheModal,
  handleClose,
  setUnPublishReason,
  onUnPublishClick = () => {},
}) => {
  const { control, errors, handleSubmit } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const handleFormSubmit = handleSubmit((values) => {
    setUnPublishReason(values.unPublishReason);
    onUnPublishClick();
    handleClose();
  });

  return (
    <>
      <DoctModal
        iconName=""
        className="unpublish_course_modal"
        open={openUnPublisheModal}
        title=""
        handlePrimaryButtonClick={handleFormSubmit}
        primaryBtnText="Unpublish"
        handleClose={handleClose}
      >
        <form onSubmit={handleFormSubmit}>
          <DoctTypography variant="h6" fontWeight="medium">
            Why unpublish this course?
          </DoctTypography>
          <DoctRadioGroup
            name="unPublishReason"
            id="unPublishReason"
            control={control}
            options={[
              { value: 'Course is going to closedown', label: 'Course is going to closedown' },
              { value: 'Admission closed', label: 'Admission closed' },
              {
                value: 'Approval pending from Authority/ Government',
                label: 'Approval pending from Authority/ Government',
              },
              { value: 'Wrong Data', label: 'Wrong Data' },
              { value: 'Not longer needed', label: 'Not longer needed' },
            ]}
            errors={{}}
            isErrors={errors}
          />
        </form>
      </DoctModal>
    </>
  );
};

export default UnPublishCourseModal;
