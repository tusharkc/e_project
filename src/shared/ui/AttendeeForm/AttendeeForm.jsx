import { DoctAutoComplete, DoctFormCheckbox, DoctRadioGroup, DoctTextField } from '@doct-react/app';
import { DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import { useEffect } from 'react';
import LocationField from '../LocationField';
import MobileWhatsAppForm from '../MobileWhatsAppForm/MobileWhatsAppForm';
import { FORM_NAMES_STEPS } from './attendeeForm.constants';

export default function AttendeeForm({
  control,
  errors,
  touched,
  watch,
  setValue,
  savedValue,
  clearErrors,
}) {
  return (
    <DoctRow>
      <DoctCol xs={6} className="mx-auto">
        <DoctTypography variant="subtitle3" className="mb-3 mt-0">
          PERSONAL DETAILS
        </DoctTypography>
        <DoctTypography variant="subtitle2" className="my-0">
          Gender
        </DoctTypography>
        <div className="mx-n2 mb-2">
          <DoctRadioGroup
            name={FORM_NAMES_STEPS.gender}
            id="radio1"
            control={control}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
            validationRules={{
              required: "It's Required Field",
            }}
            isErrors={errors}
          />
        </div>
        <DoctTextField
          showStar
          name={FORM_NAMES_STEPS.fullName}
          label="Full name"
          id="fullName"
          control={control}
          isErrors={errors}
          defaultValue=""
          validationRules={{
            required: "It's Required Field",
          }}
          touched={touched}
        />
        <DoctTypography variant="caption2" className="text-initial mb-3 d-block mt-1">
          This name will be shown in Event Certificate.
        </DoctTypography>
        <LocationField
          savedValue={savedValue}
          control={control}
          errors={errors}
          touched={touched}
          watch={watch}
          setValue={setValue}
          inputProps={{
            country: {
              disabled: true,
            },
          }}
        />
        <DoctTypography variant="subtitle3" className="registration-form-gap-top">
          CONTACT DETAILS
        </DoctTypography>
        <MobileWhatsAppForm
          control={control}
          errors={errors}
          touched={touched}
          watch={watch}
          setValue={setValue}
          clearErrors={clearErrors}
          className={'d-flex input-column mx-n2'}
        />
        <DoctTextField
          showStar
          name={FORM_NAMES_STEPS.email}
          label="Email address"
          id="email"
          control={control}
          isErrors={errors}
          touched={touched}
          validationRules={{
            required: "It's Required Field",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          }}
        />
        <DoctTypography variant="subtitle3" className="registration-form-gap-top">
          OTHER DETAILS (OPTIONAL)
        </DoctTypography>
        <DoctTextField
          name={FORM_NAMES_STEPS.practiceLicenseNumber}
          label="Practice License Number"
          id="practiceLicenseNumber"
          control={control}
          isErrors={errors}
          touched={touched}
          validationRules={{}}
          className="mb-3"
        />
        <DoctTextField
          name={FORM_NAMES_STEPS.membershipID}
          label="Membership ID"
          id="membershipID"
          control={control}
          isErrors={errors}
          touched={touched}
          validationRules={{}}
          className="mb-4"
        />
      </DoctCol>
    </DoctRow>
  );
}
