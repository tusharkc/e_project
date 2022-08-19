import { DoctTextField } from '@doct-react/app';
import { DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React from 'react';

const UsingViewContactDetails = ({ control, errors, watch }) => {
  const watchMobileNumber = watch('mobileNumber');
  const watchTeliphoneNumber = watch('teliphoneNumber');
  const watchEmailAddress = watch('emailAddress');

  return (
    <div className="p-4">
      <DoctTypography variant="subtitle3" className="font-italic">
        Adding one of below three contact information is mandatory.
      </DoctTypography>

      <DoctTypography variant="textLabel1" fontWeight="medium">
        Mobile
      </DoctTypography>

      <DoctRow>
        <DoctCol sm={2}>
          <DoctTextField
            name={'code'}
            id={'code'}
            label={'Code'}
            validationRules={{}}
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
            name={'mobileNumber'}
            id={'mobileNumber'}
            label={'Add mobile number'}
            validationRules={{
              required: !watchEmailAddress && !watchMobileNumber ? 'it is required' : false,
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
            showStar={false}
          />
        </DoctCol>
      </DoctRow>

      <DoctTypography variant="textLabel1" fontWeight="medium">
        Telephone
      </DoctTypography>

      <DoctRow>
        <DoctCol sm={2}>
          <DoctTextField
            name={'code'}
            id={'code'}
            label={'Code'}
            validationRules={{}}
            control={control}
            isErrors={errors}
            showStar={false}
            defaultValue={'+91'}
            disabled
            variant="filled"
          />
        </DoctCol>
        <DoctCol sm={10}>
          <DoctTextField
            name={'telephoneNumber'}
            id={'telephoneNumber'}
            label={'Add mobile number'}
            validationRules={{
              required: !watchEmailAddress && !watchMobileNumber ? 'it is required' : false,
              minLength: {
                value: 10,
                message: 'Mobile No is not valid',
              },
              maxLength: {
                value: 10,
                message: 'Mobile No is not valid',
              },
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                message: 'Mobile No is not valid',
              },
            }}
            control={control}
            isErrors={errors}
            showStar={false}
          />
        </DoctCol>
      </DoctRow>

      <DoctTypography variant="textLabel1" fontWeight="medium">
        Email
      </DoctTypography>

      <DoctTextField
        name={'emailAddress'}
        id={'emailAddress'}
        label={'Email address'}
        validationRules={{
          required: !watchMobileNumber && !watchTeliphoneNumber ? 'it is required' : false,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email is not valid',
          },
        }}
        control={control}
        isErrors={errors}
        showStar={false}
      />
    </div>
  );
};

export default UsingViewContactDetails;
