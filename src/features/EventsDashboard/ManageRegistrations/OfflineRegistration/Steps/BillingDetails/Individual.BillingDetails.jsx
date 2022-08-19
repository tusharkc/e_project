import { DoctTextField } from '@doct-react/app';

import { LocationField, MobileWhatsAppForm } from '../../../../../../shared';

import { BILLING_DETAILS_FORM } from './constants.billingDetails';

export default function IndividualBillingDetails({
  errors,
  control,
  touched,
  watch,
  setValue,
  savedValue,
  clearErrors,
  columnLayoutLocationField,
  columnLayoutMobileField,
  classes,
  locationValueAccessesBy,
  showPinCode,
}) {
  return (
    <>
      <div className="input-column">
        <DoctTextField
          defaultValue=""
          name={BILLING_DETAILS_FORM['Billing name'].name}
          id={BILLING_DETAILS_FORM['Billing name'].name}
          label={BILLING_DETAILS_FORM['Billing name'].label}
          validationRules={BILLING_DETAILS_FORM['Billing name'].validationRules}
          control={control}
          isErrors={errors}
        />
      </div>

      <LocationField
        control={control}
        errors={errors}
        touched={touched}
        watch={watch}
        setValue={setValue}
        showPinCode
        inputProps={{
          country: {
            disabled: true,
          },
        }}
        savedValue={savedValue}
        columnLayout={columnLayoutLocationField}
        className={classes?.locationField ?? ''}
        valueAccessBy={locationValueAccessesBy}
      />

      <MobileWhatsAppForm
        control={control}
        errors={errors}
        touched={touched}
        watch={watch}
        setValue={setValue}
        clearErrors={clearErrors}
        className={classes?.mobileField ?? 'input-column input-column-half-size-row'}
        columnLayout={columnLayoutMobileField}
      />
      <div className="input-column">
        <DoctTextField
          name={BILLING_DETAILS_FORM['Email Address'].name}
          id={BILLING_DETAILS_FORM['Email Address'].name}
          label={BILLING_DETAILS_FORM['Email Address'].label}
          validationRules={BILLING_DETAILS_FORM['Email Address'].validationRules}
          control={control}
          isErrors={errors}
        />
      </div>
    </>
  );
}
