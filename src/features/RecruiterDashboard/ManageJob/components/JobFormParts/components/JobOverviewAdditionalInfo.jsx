import { DoctAutoComplete, DoctChip, DoctTextField } from '@doct-react/app';
import { DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React, { useCallback, useEffect } from 'react';
import useFieldOptions from '../../../../../../hooks/useFieldOptions/useFieldOptions';
import employmentTypeOption from '../../../static/employmentTypeOptions';
import industryOption from '../../../static/industryOption';

const JobOverviewAdditionalInfo = ({
  control,
  errors,
  qualificationArray,
  setQualificationArray,
  watch,
}) => {
  const { optionsArray: qualificationOptions } = useFieldOptions({
    apiRoute: '/qualifications/names',
  });

  const qualificationEntry = watch('qualificationId');

  useEffect(() => {
    onQualificationValueChange();
  }, [qualificationEntry]);

  const onQualificationValueChange = useCallback(() => {
    qualificationEntry && setQualificationArray((prevState) => [...prevState, qualificationEntry]);
  }, [qualificationEntry]);

  const disableSelectedQualification = (qualification) => {
    return qualificationArray?.includes(qualification) ? true : false;
  };

  const removeQualification = (qualification) => {
    setQualificationArray(
      qualificationArray?.filter((existingQualification) => existingQualification != qualification),
    );
  };

  return (
    <>
      <DoctRow>
        <DoctCol sm={6}>
          <DoctTypography variant="subtitle2">Employment Type</DoctTypography>
          <DoctAutoComplete
            control={control}
            isErrors={errors}
            options={employmentTypeOption}
            validationRules={{ required: 'it is a required field' }}
            name="employementType"
            id="employementType"
            label="Select"
          />
        </DoctCol>
        <DoctCol sm={6}>
          <DoctTypography variant="subtitle2">No. of Vacancies</DoctTypography>
          <DoctTextField
            name="noOfVacancy"
            id="noOfVacancy"
            label="Enter Number"
            validationRules={{
              required: 'it is required field',
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                message: 'Number is not valid',
              },
            }}
            control={control}
            isErrors={errors}
            showStar={false}
          />
        </DoctCol>
      </DoctRow>

      <DoctTypography variant="subtitle2">Industry</DoctTypography>
      <DoctAutoComplete
        options={industryOption}
        control={control}
        isErrors={errors}
        name={'industry'}
        id={'industry'}
        label={'Select'}
        validationRules={{ required: 'It is required field' }}
      />

      <DoctTypography variant="subtitle2">Preferred Education</DoctTypography>
      <DoctTypography variant="body2">Select from the list or add custom.</DoctTypography>
      <DoctAutoComplete
        name="qualificationId"
        validationRules={{}}
        options={qualificationOptions}
        control={control}
        isErrors={errors}
        id="qualificationId"
        label="Select"
        getOptionDisabled={(option) => {
          return disableSelectedQualification(option);
        }}
      />

      {qualificationArray?.length > 0 && (
        <>
          <div className="d-flex flex-sm-wrap">
            {qualificationArray?.map((qualification, i) => (
              <div className="m-1" key={i}>
                <DoctChip
                  title={qualification?.label}
                  onCloseHandler={() => removeQualification(qualification)}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default JobOverviewAdditionalInfo;
