import { DoctAutoComplete, DoctFormCheckbox, DoctTextField } from '@doct-react/app';
import { DoctCol, DoctRow } from '@doct-react/core';
import { useEffect } from 'react';

export const FORM_NAME_CONTACT_INFO = {
  mobileCountryCode: 'mobileCountryCode',
  mobileNumber: 'mobileNumber',
  whatsappCountryCode: 'whatsappCountryCode',
  whatsAppNumber: 'whatsAppNumber',
  mobileNumberAsWhatsApp: 'mobileNumberAsWhatsApp',
};

export default function MobileWhatsAppForm({
  control,
  errors,
  touched,
  watch,
  setValue,
  className,
  clearErrors,
  showWhatsappValidation,
  columnLayout,
}) {
  const whatsappNumberValidation = {
    minLength: {
      value: 10,
      message: 'WhatsApp No is not valid',
    },
    maxLength: {
      value: 10,
      message: 'WhatsApp No is not valid',
    },
    pattern: {
      value: /^(0|[1-9]\d*)(\.\d+)?$/,
      message: 'WhatsApp No is not valid',
    },
  };

  if (showWhatsappValidation) {
    whatsappNumberValidation.required = "It's Required Field";
  }

  // Mobile number as WhatsApp number logic

  const watchMobileNumberAsWhatsApp = watch('mobileNumberAsWhatsApp');
  const watchMobileNumber = watch('mobileNumber');
  const watchWhatsAppNumber = watch('whatsAppNumber');

  useEffect(() => {
    if (watchMobileNumberAsWhatsApp) {
      if (watchMobileNumber) {
        setValue('whatsAppNumber', watchMobileNumber);
        clearErrors([FORM_NAME_CONTACT_INFO.whatsAppNumber]);
      }
    } else if (watchWhatsAppNumber) {
      setValue('whatsAppNumber', watchWhatsAppNumber);
      clearErrors([FORM_NAME_CONTACT_INFO.whatsAppNumber]);
    }
  }, [watchMobileNumberAsWhatsApp, watchMobileNumber]);

  const countryCodeEl = () => {
    return (
      <DoctAutoComplete
        name={FORM_NAME_CONTACT_INFO.mobileCountryCode}
        label="Code"
        id="mobileCountryCode"
        control={control}
        isErrors={errors}
        options={[{ label: '+91', value: '+91' }]}
        touched={touched}
        validationRules={{}}
        disabled={true}
        onEndScroll={() => null}
      />
    );
  };

  const mobileNumberEl = () => {
    return (
      <DoctTextField
        name={FORM_NAME_CONTACT_INFO.mobileNumber}
        label="Mobile Number"
        id={FORM_NAME_CONTACT_INFO.mobileNumber}
        control={control}
        isErrors={errors}
        touched={touched}
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
      />
    );
  };

  const whatsappCountryCode = () => {
    return (
      <DoctAutoComplete
        name={FORM_NAME_CONTACT_INFO.whatsappCountryCode}
        label="Code"
        id="whatsappCountryCode"
        control={control}
        isErrors={errors}
        options={[{ label: '+91', value: '+91' }]}
        touched={touched}
        validationRules={{}}
        disabled={true}
        onEndScroll={() => null}
      />
    );
  };

  const whatsappCodeEl = () => {
    return (
      <DoctTextField
        showStar={false}
        name={FORM_NAME_CONTACT_INFO.whatsAppNumber}
        label="WhatsApp Number"
        id="whatsappNo"
        control={control}
        isErrors={errors}
        touched={touched}
        validationRules={whatsappNumberValidation}
        disabled={watchMobileNumberAsWhatsApp}
      />
    );
  };

  const whatsAppAsMobile = () => {
    return (
      <DoctFormCheckbox
        label="Using Mobile number as WhatsApp number"
        control={control}
        name={FORM_NAME_CONTACT_INFO.mobileNumberAsWhatsApp}
        id="mobileNumberAsWhatsApp"
        disabled={!watchMobileNumber}
        className="mb-3"
      />
    );
  };

  if (columnLayout && typeof columnLayout == 'object' && Object.keys(columnLayout)?.length) {
    return (
      <div className={className}>
        <DoctRow>
          <DoctCol md={columnLayout?.mobile || 6}>
            <div className="narrow-gutter">
              <DoctRow>
                <DoctCol sm={3}>{countryCodeEl()}</DoctCol>
                <DoctCol sm={9}> {mobileNumberEl()}</DoctCol>
              </DoctRow>
            </div>
          </DoctCol>
          {columnLayout?.mobile == 12 && whatsAppAsMobile()}
          <DoctCol md={columnLayout?.whatsapp || 6}>
            <div className="narrow-gutter">
              <DoctRow>
                <DoctCol sm={3}>{whatsappCountryCode()}</DoctCol>
                <DoctCol sm={9}>{whatsappCodeEl()}</DoctCol>
              </DoctRow>
            </div>
          </DoctCol>
        </DoctRow>
      </div>
    );
  }

  return (
    <>
      <div className={className}>
        <div className="input-column-half-size d-flex">
          <div className="input-column-tiny">
            <DoctAutoComplete
              name={FORM_NAME_CONTACT_INFO.mobileCountryCode}
              label="Code"
              id="mobileCountryCode"
              control={control}
              isErrors={errors}
              options={[{ label: '+91', value: '+91' }]}
              touched={touched}
              validationRules={{}}
              disabled={true}
              onEndScroll={() => null}
            />
          </div>
          <DoctTextField
            name={FORM_NAME_CONTACT_INFO.mobileNumber}
            label="Mobile Number"
            id={FORM_NAME_CONTACT_INFO.mobileNumber}
            control={control}
            isErrors={errors}
            touched={touched}
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
          />
        </div>
        <div className="input-column-half-size d-flex px-2">
          <div className="input-column-tiny">
            <DoctAutoComplete
              name={FORM_NAME_CONTACT_INFO.whatsappCountryCode}
              label="Code"
              id="whatsappCountryCode"
              control={control}
              isErrors={errors}
              options={[{ label: '+91', value: '+91' }]}
              touched={touched}
              validationRules={{}}
              disabled={true}
              onEndScroll={() => null}
            />
          </div>
          <DoctTextField
            showStar={false}
            name={FORM_NAME_CONTACT_INFO.whatsAppNumber}
            label="WhatsApp Number"
            id="whatsappNo"
            control={control}
            isErrors={errors}
            touched={touched}
            validationRules={whatsappNumberValidation}
            disabled={watchMobileNumberAsWhatsApp}
          />
        </div>
      </div>
      <DoctFormCheckbox
        label="Using Mobile number as WhatsApp number"
        control={control}
        name={FORM_NAME_CONTACT_INFO.mobileNumberAsWhatsApp}
        id="mobileNumberAsWhatsApp"
        disabled={!watchMobileNumber}
        className="mb-3"
      />
    </>
  );
}
