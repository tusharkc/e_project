import { DoctActionMenu } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React, { useState } from 'react';
import EditFacultyModal from './EditFacultyModal';

const FacultiesCard = ({
  facultyName,
  handleFacultyDelete,
  control,
  error,
  watch,
  facultyArr,
  currentIteration,
}) => {
  const [openEdit, setOpenEdit] = useState(false);

  const editedValue = watch('editFacultyName');

  return (
    <>
      <div className="mt-2 d-flex align-items-center justify-content-between px-2 bg-white">
        <DoctTypography variant="textLabel1">{facultyName}</DoctTypography>
        <DoctActionMenu
          options={[{ title: 'Edit' }, { title: 'Delete' }]}
          onClick={(option) => {
            if (option.title == 'Delete') {
              handleFacultyDelete();
            } else if (option.title == 'Edit') {
              setOpenEdit(true);
            }
          }}
        />
      </div>
      <EditFacultyModal
        openEdit={openEdit}
        defaultValue={facultyName}
        control={control}
        error={error}
        handleClose={(event) => {
          event.preventDefault();
          setOpenEdit(false);
        }}
        handleSave={(e) => {
          e.preventDefault();
          if (editedValue) {
            facultyArr[currentIteration] = editedValue;
          }
          setOpenEdit(false);
        }}
      />
    </>
  );
};

export default FacultiesCard;
