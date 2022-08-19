import { DoctAutoComplete, DoctTextField } from '@doct-react/app';
import { DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React from 'react';
import { FormHeading } from '../../../UiHelper';
import '../../Registration/RegistrationStyle.scss';

function ContactInfoSection({ control, errors, touched, countryCode, setValue }) {
  setValue('mobileCountryCode', countryCode);
  return (
    <>
      <DoctRow>
        <DoctCol sm={10}>
          <div className="hr_line_grey position-absolute"></div>
          <div className="pb-5 mt-4">
            <DoctTypography variant="h6" className="text-grey-800">
              Contact Info
            </DoctTypography>
            <DoctTextField
              name="personName"
              label="Contact Person Name"
              className="mt-3"
              id="personName"
              control={control}
              isErrors={errors}
              defaultValue=""
              validationRules={{
                required: "It's Required Field",
              }}
              touched={touched}
              showStar={false}
            />
            <div className="d-flex">
              <div className="input-column-tiny mt-2 w-25 mr-12px">
                <DoctTextField
                  name="mobileCountryCode"
                  label="Code"
                  id="mobileCountryCode"
                  control={control}
                  isErrors={errors}
                  touched={touched}
                  validationRules={{}}
                  onEndScroll={() => null}
                  defaultValue={countryCode ? countryCode : '+91'}
                  disabled
                />
              </div>
              <DoctTextField
                name="mobileNo"
                className="mt-2"
                label="Mobile Number"
                id="mobileNumber"
                control={control}
                isErrors={errors}
                defaultValue=""
                validationRules={{
                  required: "It's Required Field",
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
                showStar={false}
                touched={touched}
              />
            </div>
            <DoctTextField
              name="phoneNo"
              className="mt-2 telephone_number"
              label="Telephone Number (optional)"
              showStar={false}
              id="phoneNumber"
              control={control}
              isErrors={errors}
              defaultValue=""
              validationRules={{
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  message: 'Mobile No is not valid',
                },
              }}
              touched={touched}
            />
            <DoctTextField
              showStar={false}
              name="email"
              label="Email Address"
              className="mt-2"
              id="email"
              control={control}
              isErrors={errors}
              defaultValue=""
              validationRules={{
                required: "It's required",

                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email is not valid',
                },
              }}
              touched={touched}
            />
          </div>
        </DoctCol>
      </DoctRow>
    </>
  );
}

export default ContactInfoSection;
