import { DoctAutoComplete, DoctRadioGroup } from '@doct-react/app';
import { DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React from 'react';

const WorkExperience = ({ control, errors, watch }) => {
  const watchExperienceRadio = watch('experience');
  const watchStartYear = watch('startYear');

  const yearsExperince = [...Array(30).keys()].map((i) => {
    return { label: `${i + 1}`, value: i + 1 };
  });

  return (
    <>
      <DoctTypography variant="subtitle2">Work Experience</DoctTypography>
      <DoctTypography variant="body2" className="text-grey-600">
        Specify required experience range between minimum to maximum in years.
      </DoctTypography>
      <div className="input-column">
        <DoctRadioGroup
          name="experience"
          className="justify-content-between"
          id="experience"
          control={control}
          options={[
            { value: 'Experienced', label: 'Experienced' },
            { value: 'Freshers', label: 'Fresher/ Trainee' },
          ]}
          errors={{}}
          validationRules={{ required: 'this field is required' }}
          isErrors={errors}
        />

        {watchExperienceRadio == 'Experienced' && (
          <div className="input-column">
            <DoctRow>
              <DoctCol sm={5}>
                <DoctAutoComplete
                  control={control}
                  isErrors={errors}
                  name={'startYear'}
                  id={'startYear'}
                  label={'Min Years'}
                  validationRules={{ required: 'this field is required' }}
                  options={yearsExperince}
                />
              </DoctCol>
              <DoctCol sm={2}>
                <DoctTypography variant="textLabel1" className="text-grey-600 text-center">
                  To
                </DoctTypography>
              </DoctCol>
              <DoctCol sm={5}>
                <DoctAutoComplete
                  control={control}
                  isErrors={errors}
                  name={'endYear'}
                  id={'endYear'}
                  label={'Max Years'}
                  validationRules={{ required: 'this field is required' }}
                  options={yearsExperince}
                  getOptionDisabled={(option) => option?.value <= watchStartYear?.value}
                />
              </DoctCol>
            </DoctRow>
          </div>
        )}
      </div>
    </>
  );
};

export default WorkExperience;
