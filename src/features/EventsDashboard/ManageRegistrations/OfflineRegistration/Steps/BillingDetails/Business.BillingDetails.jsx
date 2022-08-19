import { DoctTextField } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';

import { LocationField, MobileWhatsAppForm } from '../../../../../../shared';

import { BUSINESS_BILLING_FORM } from './constants.billingDetails';

export default function BusinessBillingDetails({
  errors,
  control,
  touched,
  watch,
  setValue,
  savedValue,
  clearErrors,
  columnLayoutLocationField = null,
  columnLayoutMobileField = null,
  classes,
  locationValueAccessesBy,
}) {
  return (
    <>
      <DoctTypography variant="subtitle3" className="mt-0 mb-3">
        BUSINESS DETAILS
      </DoctTypography>
      <div className="input-column">
        <DoctTextField
          name={BUSINESS_BILLING_FORM['Organisation name'].name}
          id={BUSINESS_BILLING_FORM['Organisation name'].name}
          label={BUSINESS_BILLING_FORM['Organisation name'].label}
          validationRules={BUSINESS_BILLING_FORM['Organisation name'].validationRules}
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
      <div className={classes?.taxField ?? 'input-column'}>
        <DoctTextField
          name={BUSINESS_BILLING_FORM['Taxation'].name}
          id={BUSINESS_BILLING_FORM['Taxation'].name}
          label={BUSINESS_BILLING_FORM['Taxation'].label}
          validationRules={BUSINESS_BILLING_FORM['Taxation'].validationRules}
          control={control}
          isErrors={errors}
        />
      </div>
      <DoctTypography variant="subtitle3" className="mt-4 mb-3">
        CONTACT DETAILS
      </DoctTypography>
      <MobileWhatsAppForm
        control={control}
        errors={errors}
        touched={touched}
        watch={watch}
        setValue={setValue}
        clearErrors={clearErrors}
        columnLayout={columnLayoutMobileField}
        className={classes?.mobileField ?? 'input-column input-column-half-size-row'}
      />
      <div className="input-column">
        <DoctTextField
          name={BUSINESS_BILLING_FORM['Email Address'].name}
          id={BUSINESS_BILLING_FORM['Email Address'].name}
          label={BUSINESS_BILLING_FORM['Email Address'].label}
          validationRules={BUSINESS_BILLING_FORM['Email Address'].validationRules}
          control={control}
          isErrors={errors}
        />
      </div>
      <DoctTypography variant="subtitle3" className="mt-4 mb-3">
        OTHER DETAILS
      </DoctTypography>
      <div className="input-column input-column-half-size-row">
        <div className="input-column-half-size">
          <DoctTextField
            name={BUSINESS_BILLING_FORM['Cost Center'].name}
            id={BUSINESS_BILLING_FORM['Cost Center'].name}
            label={BUSINESS_BILLING_FORM['Cost Center'].label}
            validationRules={BUSINESS_BILLING_FORM['Cost Center'].validationRules}
            control={control}
            isErrors={errors}
          />
        </div>
        <div className="input-column-half-size">
          <DoctTextField
            name={BUSINESS_BILLING_FORM['PO number'].name}
            id={BUSINESS_BILLING_FORM['PO number'].name}
            label={BUSINESS_BILLING_FORM['PO number'].label}
            validationRules={BUSINESS_BILLING_FORM['PO number'].validationRules}
            control={control}
            isErrors={errors}
          />
        </div>
      </div>
      <div className="input-column">
        <DoctTextField
          name={BUSINESS_BILLING_FORM['Department'].name}
          id={BUSINESS_BILLING_FORM['Department'].name}
          label={BUSINESS_BILLING_FORM['Department'].label}
          validationRules={BUSINESS_BILLING_FORM['Department'].validationRules}
          control={control}
          isErrors={errors}
        />
      </div>
      <div className="input-column">
        <DoctTextField
          name={BUSINESS_BILLING_FORM['Purchase note'].name}
          id={BUSINESS_BILLING_FORM['Purchase note'].name}
          label={BUSINESS_BILLING_FORM['Purchase note'].label}
          validationRules={BUSINESS_BILLING_FORM['Purchase note'].validationRules}
          control={control}
          isErrors={errors}
        />
      </div>
    </>
  );
}
