import { DoctModal, DoctTextField } from '@doct-react/app';
import React, { useEffect } from 'react';

const EditFacultyModal = ({ control, error, openEdit, handleClose, handleSave, defaultValue }) => {
  return (
    <>
      <DoctModal
        handlePrimaryButtonClick={handleSave}
        iconName=""
        primaryBtnText="Save"
        open={openEdit}
        handleClose={handleClose}
      >
        <DoctTextField
          defaultValue={defaultValue}
          control={control}
          isErrors={error}
          label="Edit Faculty Name"
          name="editFacultyName"
          id="editFacultyName"
          validationRules={{}}
        />
      </DoctModal>
    </>
  );
};

export default EditFacultyModal;
