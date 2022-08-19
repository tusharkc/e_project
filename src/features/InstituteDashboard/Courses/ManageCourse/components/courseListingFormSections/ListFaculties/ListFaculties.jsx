import { DoctTextField } from '@doct-react/app';
import { DoctButton, DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React, { useState } from 'react';
import FacultiesCard from './components/FacultiesCard';

const ListFaculties = ({ control, error, watch, facultiesArr, setFacultiesArr, setValue }) => {
  const [totalFaculties, setTotalFaculties] = useState(0);

  const watchFullName = watch('fullName');

  const onAddFacultyClickHandler = () => {
    if (watchFullName) {
      setFacultiesArr((prevState) => [...prevState, watchFullName]);
      setTotalFaculties(facultiesArr?.length + 1);
    }
  };

  const handleFacultyDelete = (facultyToRemove) => {
    setFacultiesArr(facultiesArr.filter((faculty) => faculty != facultyToRemove));
    setTotalFaculties(totalFaculties - 1);
  };

  return (
    <>
      <DoctTypography variant="subtitle1" className="text-grey-800" fontWeight="bold">
        Add Teaching Faculty (optional)
      </DoctTypography>

      <DoctTypography variant="body2" className="text-grey-600">
        Add Professors/ Teachers name.
      </DoctTypography>

      <div className="title_dashed_underline w-100" />

      <div className="input-column my-3">
        <DoctTextField
          className="w-50"
          control={control}
          isErrors={error}
          id={'fullName'}
          label={'Full Name'}
          name={'fullName'}
          showStar={false}
          validationRules={''}
        />
      </div>

      <div className="input-column">
        <DoctButton
          onButtonClickHandler={(e) => {
            e.preventDefault();
            onAddFacultyClickHandler();
          }}
          type="semantic-info"
          text="Add Faculty"
          size="medium"
          disabled={totalFaculties >= 5 ? true : false}
        />
      </div>
      <div className="title_dashed_underline w-100 mt-3" />

      <div className="input-column">
        <DoctTypography variant="body3" className={'text-grey-400'}>
          {totalFaculties > 0 ? totalFaculties : 0} Faculties Added
        </DoctTypography>
      </div>
      <DoctRow>
        {facultiesArr?.map((faculty, i) => {
          return (
            <DoctCol key={i} sm={6}>
              <FacultiesCard
                facultyArr={facultiesArr}
                currentIteration={i}
                watch={watch}
                control={control}
                error={error}
                handleFacultyDelete={() => {
                  handleFacultyDelete(faculty);
                }}
                handleFacultyUpdate={() => {}}
                facultyName={faculty}
              />
            </DoctCol>
          );
        })}
      </DoctRow>
      {facultiesArr?.length > 0 && (
        <DoctTypography variant="body3" className="text-grey-400">
          This information will be shown in course page.
        </DoctTypography>
      )}
    </>
  );
};

export default ListFaculties;
