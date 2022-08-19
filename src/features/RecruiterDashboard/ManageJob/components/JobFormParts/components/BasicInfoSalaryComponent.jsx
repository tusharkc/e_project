import { DoctAutoComplete, DoctTextField } from '@doct-react/app';
import { DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React from 'react';
import salaryCurrencyOption from '../../../static/salaryCurrencyOption';

const BasicInfoSalaryComponent = ({ control, errors }) => {
  return (
    <>
      <DoctTypography variant="subtitle2">Salary</DoctTypography>
      <DoctTypography variant="body2" className="text-grey-600">
        Specify salary range between minimum to maximum amount per month/year.
      </DoctTypography>

      <DoctRow>
        <DoctCol sm={6}>
          <DoctAutoComplete
            control={control}
            isErrors={errors}
            name="currency"
            id="currency"
            label="Currency"
            validationRules={{}}
            options={salaryCurrencyOption}
          />
        </DoctCol>
        <DoctCol sm={6}>
          <DoctAutoComplete
            control={control}
            isErrors={errors}
            name="salaryType"
            id="salaryType"
            label="Salary Type"
            validationRules={{ required: 'it is required' }}
            options={[]}
            defaultValue={{ label: 'Yearly', value: 'Yearly' }}
            disabled
          />
        </DoctCol>
      </DoctRow>

      <div className="my-3">
        <DoctRow>
          <DoctCol sm={5}>
            <DoctTextField
              control={control}
              isErrors={errors}
              name="minAmount"
              id="minAmount"
              label="Min Amount"
              showStar={false}
              validationRules={{
                required: 'it is required',
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  message: 'Number is not valid',
                },
              }}
            />
          </DoctCol>
          <DoctCol sm={2}>
            <DoctTypography variant="textLabel1" className="text-grey-600 text-center">
              To
            </DoctTypography>
          </DoctCol>
          <DoctCol sm={5}>
            <DoctTextField
              control={control}
              isErrors={errors}
              name="maxAmount"
              id="maxAmount"
              label="Max Amount"
              showStar={false}
              validationRules={{
                required: 'it is required',
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  message: 'Number is not valid',
                },
              }}
            />
          </DoctCol>
        </DoctRow>
      </div>
    </>
  );
};

export default BasicInfoSalaryComponent;
