import { DoctAutoComplete, DoctTextField } from '@doct-react/app';
import { DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React from 'react';
import useGetLocationOptions from '../../utils/useGetLocationOptions';
import WorkExperience from './components/WorkExperience';
import BasicInfoSalaryComponent from './components/BasicInfoSalaryComponent';
import JobOverviewAdditionalInfo from './components/JobOverviewAdditionalInfo';

const JobBasicInfo = ({ control, errors, watch, setQualificationArray, qualificationArray }) => {
  const { locationStateOptions, locationCitiesOption } = useGetLocationOptions({
    watch: watch,
  });

  return (
    <>
      <div className="input-column">
        <DoctTypography variant="subtitle2">Job Title</DoctTypography>
        <DoctTextField
          name="title"
          id="title"
          label="Enter Job Title here"
          control={control}
          isErrors={errors}
          validationRules={{ required: 'Job Title is required field' }}
          showStar={false}
        />
      </div>

      <div className="input-column">
        <DoctTypography variant="subtitle2">Job Location</DoctTypography>
        <DoctRow>
          <DoctCol sm={4}>
            <DoctAutoComplete
              control={control}
              isErrors={errors}
              options={[]}
              name="countryId"
              disabled
              defaultValue={{ label: 'India', value: 1 }}
              id="countryId"
              label="Country"
            />
          </DoctCol>
          <DoctCol sm={4}>
            <DoctAutoComplete
              control={control}
              isErrors={errors}
              options={locationStateOptions || []}
              name="stateId"
              id="stateId"
              label="State"
            />
          </DoctCol>
          <DoctCol sm={4}>
            <DoctAutoComplete
              control={control}
              isErrors={errors}
              options={locationCitiesOption || []}
              name="cityId"
              id="cityId"
              label="City"
            />
          </DoctCol>
        </DoctRow>
      </div>

      <div className="input-column">
        <WorkExperience control={control} errors={errors} watch={watch} />
      </div>

      <div className="input-column">
        <BasicInfoSalaryComponent control={control} errors={errors} watch={watch} />
      </div>

      <JobOverviewAdditionalInfo
        qualificationArray={qualificationArray}
        setQualificationArray={setQualificationArray}
        control={control}
        errors={errors}
        watch={watch}
      />
    </>
  );
};

export default JobBasicInfo;
