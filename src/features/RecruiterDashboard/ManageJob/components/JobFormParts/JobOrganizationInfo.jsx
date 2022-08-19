import { DoctTextArea, DoctTextField } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../../components';

const JobOrganizationInfo = ({ control, errors, setValue }) => {
  const user = useSelector(userSelector);

  useEffect(() => {
    user && setValue('organizationName', user?.tenant?.organizationName);
  }, [user?.tenant]);

  return (
    <>
      <DoctTypography variant="subtitle2">Organization Name</DoctTypography>
      <DoctTextField
        control={control}
        isErrors={errors}
        name="organizationName"
        id="organizationName"
        label=""
        readOnly
        validationRules={{}}
      />

      <DoctTypography variant="subtitle2">Organization Profile (optional)</DoctTypography>

      <DoctTextArea
        control={control}
        isErrors={errors}
        label={'About Organization'}
        name="aboutOrganization"
        id="aboutOrganization"
        validationRules={{}}
      />
      <div className="my-2">
        <DoctTextArea
          control={control}
          isErrors={errors}
          label={'Organization’s Contact Info, Address details'}
          name="organizationContactAndAddressDetails"
          id="organizationContactAndAddressDetails"
          validationRules={{}}
        />
      </div>
    </>
  );
};

export default JobOrganizationInfo;
