import { DoctTextField } from '@doct-react/app';
import { DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React from 'react';

const UsingInstituteWebsite = ({ control, errors }) => {
  return (
    <div className="p-3">
      <div>
        <DoctTypography variant="textLabel1" fontWeight="medium">
          Institute Website Link
        </DoctTypography>
        <DoctTextField
          name={'applyLink'}
          id={'applyLink'}
          label={'Enter or Paste your Institute website URL'}
          validationRules={{
            required: 'it is required',
          }}
          control={control}
          isErrors={errors}
          showStar={false}
        />
      </div>

      <div className="bg-white p-2 my-2">
        <DoctTypography variant="textLabel1" fontWeight="medium" className="text-primary">
          To use this feature docthub will require to contact you, provide your contact number here,
          soon after submitting this course you will receive a call from docthub course team.
        </DoctTypography>

        <div className="my-3">
          <DoctRow>
            <DoctCol sm={2}>
              <DoctTextField
                name={'code'}
                id={'code'}
                label={'Code'}
                control={control}
                isErrors={errors}
                defaultValue={'+91'}
                disabled
                variant="filled"
                showStar={false}
              />
            </DoctCol>
            <DoctCol sm={10}>
              <DoctTextField
                name={'telephoneNumber'}
                id={'telephoneNumber'}
                label={'Add mobile number'}
                showStar={false}
                validationRules={{
                  required: 'it is required',
                  minLength: {
                    value: 10,
                    message: 'Mobile No is not valid',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Mobile No is not valid',
                  },
                }}
                control={control}
                isErrors={errors}
              />
            </DoctCol>
          </DoctRow>
        </div>
      </div>
    </div>
  );
};

export default UsingInstituteWebsite;
