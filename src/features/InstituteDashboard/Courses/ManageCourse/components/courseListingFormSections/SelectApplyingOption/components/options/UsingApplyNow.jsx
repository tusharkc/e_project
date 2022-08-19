import { DoctTextField } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../../../../../../components';

const UsingApplyNow = ({ control, errors, setValue }) => {
  const user = useSelector(userSelector);

  useEffect(() => {
    setValue('emailAddress', user?.tenant?.email);
  }, [user?.tenant?.email]);

  return (
    <div className="p-4">
      <DoctTypography variant="textLabel1" fontWeight="medium">
        Get Email notification to
      </DoctTypography>

      <DoctTextField
        name={'emailAddress'}
        id={'emailAddress'}
        label={'Email address'}
        validationRules={{}}
        control={control}
        isErrors={errors}
        readOnly={true}
      />
    </div>
  );
};

export default UsingApplyNow;
