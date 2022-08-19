import React, { useEffect } from 'react';
import {
  DoctAutoComplete,
  DoctDatePicker,
  DoctFormCheckbox,
  DoctPhoneCodeDropdown,
  DoctTextField,
} from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import '../../addNewMember.scss';
import { MobileWhatsAppForm } from '../../../../../shared';
import { useGetCountryQuery } from '../../../../../hooks/useLocation/useLocations.services';

const FORM_NAME = {
  correspondenceAddress: 'correspondenceAddress',
  correspondencePostalCode: 'correspondencePostalCode',
  correspondenceCountry: 'correspondenceCountry',
  correspondenceState: 'correspondenceState',
  correspondenceCity: 'correspondenceCity',
  correspondenceAddressasPermanentAddress: 'correspondenceAddressasPermanentAddress',
  permanentAddress: 'permanentAddress',
  permanentPostalCode: 'permanentPostalCode',
  permanentCountry: 'permanentCountry',
  permanentState: 'permanentState',
  permanentCity: 'permanentCity',
};

const ContactAndLocationInformation = ({
  control,
  errors,
  watch,
  setValue,
  touched,
  clearErrors,
}) => {
  const { data: countryData } = useGetCountryQuery();

  let countryDataOption = [];
  let correspondenceStatesDataOptions = [];
  let correspondenceCitiesDataOptions = [];
  let permanentstatesDataOptions = [];
  let permanentcitiesDataOptions = [];

  countryData?.map((countries) => {
    countryDataOption.push({ label: countries.name });
  });

  const watchCorrespondenceCountryInput = watch('correspondenceCountry');
  const watchCorrespondenceStateInput = watch('correspondenceState');
  const watchPermanentCountryInput = watch('permanentCountry');
  const watchPermanentStateInput = watch('permanentState');

  const correspondenceStatesBasedOnCountry = countryData?.find((el) => {
    return el.name == watchCorrespondenceCountryInput?.label;
  });

  correspondenceStatesBasedOnCountry?.states.map((states) => {
    correspondenceStatesDataOptions.push({
      label: states.name,
      cities: states.cities,
    });
  });

  const correspondenceCitiesBasedOnStates = correspondenceStatesDataOptions?.find((el) => {
    return el.label == watchCorrespondenceStateInput?.label;
  });

  correspondenceCitiesBasedOnStates?.cities.map((cities) => {
    correspondenceCitiesDataOptions.push({ label: cities.name });
  });

  const permanentstatesBasedOnCountry = countryData?.find((el) => {
    return el.name == watchPermanentCountryInput?.label;
  });

  permanentstatesBasedOnCountry?.states.map((states) => {
    permanentstatesDataOptions.push({ label: states.name, cities: states.cities });
  });

  const permanentcitiesBasedOnStates = permanentstatesDataOptions?.find((el) => {
    return el.label == watchPermanentStateInput?.label;
  });

  permanentcitiesBasedOnStates?.cities.map((cities) => {
    permanentcitiesDataOptions.push({ label: cities.name });
  });

  const WatchCorrespondenceAddress = watch('correspondenceAddress');
  const watchCorrespondencePostalCode = watch('correspondencePostalCode');
  const watchCorrespondenceCountry = watch('correspondenceCountry');
  const watchCorrespondenceState = watch('correspondenceState');
  const watchCorrespondenceCity = watch('correspondenceCity');
  const watchCorrespondenceAddressasPermanentAddress = watch(
    'correspondenceAddressasPermanentAddress',
  );
  const WatchPermanentAddress = watch('permanentAddress');
  const watchPermanentPostalCode = watch('permanentPostalCode');
  const watchPermanentCountry = watch('permanentCountry');
  const watchPermanentState = watch('permanentState');
  const watchPermanentCity = watch('permanentCity');

  useEffect(() => {
    if (watchCorrespondenceAddressasPermanentAddress) {
      if (WatchCorrespondenceAddress) {
        setValue('permanentAddress', WatchCorrespondenceAddress);
        clearErrors([FORM_NAME.permanentAddress]);
      }
      if (watchCorrespondencePostalCode) {
        setValue('permanentPostalCode', watchCorrespondencePostalCode);
        clearErrors([FORM_NAME.permanentPostalCode]);
      }
      if (watchCorrespondenceCountry) {
        setValue('permanentCountry', watchCorrespondenceCountry);
        clearErrors([FORM_NAME.permanentCountry]);
      }
      if (watchCorrespondenceState) {
        setValue('permanentState', watchCorrespondenceState);
        clearErrors([FORM_NAME.permanentState]);
      }
      if (watchCorrespondenceCity) {
        setValue('permanentCity', watchCorrespondenceCity);
        clearErrors([FORM_NAME.permanentCity]);
      }
    } else {
      if (WatchPermanentAddress) {
        setValue('permanentAddress', WatchCorrespondenceAddress);
        clearErrors([FORM_NAME.permanentAddress]);
      }
      if (watchPermanentPostalCode) {
        setValue('permanentPostalCode', watchPermanentPostalCode);
        clearErrors([FORM_NAME.permanentPostalCode]);
      }
      if (watchPermanentCountry) {
        setValue('permanentCountry', watchPermanentCountry);
        clearErrors([FORM_NAME.permanentCountry]);
      }
      if (watchPermanentState) {
        setValue('permanentState', watchPermanentState);
        clearErrors([FORM_NAME.permanentState]);
      }
      if (watchPermanentCity) {
        setValue('permanentCity', watchPermanentCity);
        clearErrors([FORM_NAME.permanentCity]);
      }
    }
  }, [watchCorrespondenceAddressasPermanentAddress]);

  return (
    <div className=" my-3">
      <DoctTypography
        variant="h6"
        className="contact_location_info_title_border p-3 font-weight-regular text-grey-600 bg-white"
      >
        Contact &#38; Location Information
      </DoctTypography>
      <div className="d-flex justify-content-center pt-5 bg-grey-100 mobile_whtsapp_number_section">
        <DoctTypography variant="subtitle2" className="px-2 text-grey-800 mobile_number_title">
          Mobile Number *
        </DoctTypography>
        <DoctTypography variant="subtitle2" className="whatsapp_number_title text-grey-800">
          WhatsApp Number *
        </DoctTypography>
      </div>

      <div className="contact_location_info_contents py-5 bg-grey-100 d-flex align-items-center justify-content-center">
        <div className="form_container_body">
          <MobileWhatsAppForm
            control={control}
            errors={errors}
            touched={touched}
            setValue={setValue}
            watch={watch}
            clearErrors={clearErrors}
            className={'input-column input-column-half-size-row'}
            showWhatsappValidation
          />
          <DoctTypography variant="subtitle2" className="text-grey-800 font-weight-medium">
            Email *
          </DoctTypography>

          <DoctTextField
            label="Email"
            control={control}
            id="email"
            name="email"
            isErrors={errors}
            className={''}
            validationRules={{
              required: "It's Required Field",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            }}
          />

          <DoctTypography variant="subtitle1" className="">
            Correspondence Address
          </DoctTypography>

          <div className="my-2">
            <DoctTypography variant="subtitle2">Address</DoctTypography>

            <DoctTextField
              label="Address"
              control={control}
              id="correspondenceAddress"
              name={FORM_NAME.correspondenceAddress}
              isErrors={errors}
              className={''}
              validationRules={{}}
            />

            <div className="d-flex">
              <div className="w-50">
                <DoctTypography variant="subtitle2" className="">
                  Postal Code
                </DoctTypography>
                <DoctTextField
                  label="Postal Code"
                  control={control}
                  id="correspondencePostalCode"
                  name={FORM_NAME.correspondencePostalCode}
                  isErrors={errors}
                  className={''}
                  validationRules={{}}
                />
              </div>

              <div className="w-50 pl-3">
                <DoctTypography variant="subtitle2" className="">
                  Country *
                </DoctTypography>
                <div className="w-100">
                  <DoctAutoComplete
                    name={FORM_NAME.correspondenceCountry}
                    label="Select Country"
                    id="correspondenceCountry"
                    control={control}
                    isErrors={errors}
                    variant="standard"
                    options={countryDataOption}
                    onEndScroll={() => null}
                    validationRules={{
                      required: "It's Required Field",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="w-50">
                <DoctTypography variant="subtitle2" className="">
                  State/ Province *
                </DoctTypography>
                <div className="w-100">
                  <DoctAutoComplete
                    name={FORM_NAME.correspondenceState}
                    label="Select State/ Province"
                    id="correspondenceState"
                    control={control}
                    isErrors={errors}
                    variant="standard"
                    options={correspondenceStatesDataOptions}
                    onEndScroll={() => null}
                    validationRules={{
                      required: "It's Required Field",
                    }}
                  />
                </div>
              </div>

              <div className="w-50 pl-3">
                <DoctTypography variant="subtitle2" className="">
                  City *
                </DoctTypography>
                <div className="w-100">
                  <DoctAutoComplete
                    name={FORM_NAME.correspondenceCity}
                    label="Select City"
                    id="correspondenceCity"
                    control={control}
                    isErrors={errors}
                    variant="standard"
                    options={correspondenceCitiesDataOptions}
                    onEndScroll={() => null}
                    validationRules={{
                      required: "It's Required Field",
                    }}
                  />
                </div>
              </div>
            </div>
            <DoctFormCheckbox
              label="Using Correspondence Address as Permanent Address"
              control={control}
              name={FORM_NAME.correspondenceAddressasPermanentAddress}
              id="correspondenceAddressasPermanentAddress"
              disabled={!watchCorrespondenceCity}
              className="mb-3"
            />

            <DoctTypography variant="subtitle1" className="">
              Permanent Address
            </DoctTypography>

            <div className="my-2">
              <DoctTypography variant="subtitle2">Address</DoctTypography>

              <DoctTextField
                label="Address"
                control={control}
                id="permanentAddress"
                name={FORM_NAME.permanentAddress}
                isErrors={errors}
                className={''}
                validationRules={{}}
                disabled={watchCorrespondenceAddressasPermanentAddress}
              />

              <div className="d-flex">
                <div className="w-50">
                  <DoctTypography variant="subtitle2" className="">
                    Postal Code
                  </DoctTypography>
                  <DoctTextField
                    label="Postal Code"
                    control={control}
                    id="permanentPostalCode"
                    name={FORM_NAME.permanentPostalCode}
                    isErrors={errors}
                    className={''}
                    validationRules={{}}
                    disabled={watchCorrespondenceAddressasPermanentAddress}
                  />
                </div>

                <div className="w-50 pl-3">
                  <DoctTypography variant="subtitle2" className="">
                    Country *
                  </DoctTypography>
                  <div className="w-100">
                    <DoctAutoComplete
                      name={FORM_NAME.permanentCountry}
                      label="Select Country"
                      id="permanentCountry"
                      variant="standard"
                      control={control}
                      isErrors={errors}
                      options={countryDataOption}
                      onEndScroll={() => null}
                      validationRules={{
                        required: "It's Required Field",
                      }}
                      disabled={watchCorrespondenceAddressasPermanentAddress}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex">
                <div className="w-50">
                  <DoctTypography variant="subtitle2" className="">
                    State/ Province *
                  </DoctTypography>
                  <div className="w-100">
                    <DoctAutoComplete
                      name={FORM_NAME.permanentState}
                      label="Select State/ Province"
                      id="permanentState"
                      variant="standard"
                      control={control}
                      isErrors={errors}
                      options={permanentstatesDataOptions}
                      onEndScroll={() => null}
                      validationRules={{
                        required: "It's Required Field",
                      }}
                      disabled={watchCorrespondenceAddressasPermanentAddress}
                    />
                  </div>
                </div>

                <div className="w-50 pl-3">
                  <DoctTypography variant="subtitle2" className="">
                    City *
                  </DoctTypography>
                  <div className="w-100">
                    <DoctAutoComplete
                      name={FORM_NAME.permanentCity}
                      label="Select City"
                      id="permanentCity"
                      variant="standard"
                      control={control}
                      isErrors={errors}
                      options={permanentcitiesDataOptions}
                      onEndScroll={() => null}
                      validationRules={{
                        required: "It's Required Field",
                      }}
                      disabled={watchCorrespondenceAddressasPermanentAddress}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactAndLocationInformation;
