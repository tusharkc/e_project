import { useEffect } from 'react';

import { DoctAutoComplete, DoctTextField } from '@doct-react/app';

import { useLocationsPlaces } from '../../hooks';
import { DoctCol, DoctRow } from '@doct-react/core';

export const FORM_EL_COUNTRY_CODE = {
  Country: {
    name: 'country',
    label: 'Country',
    validationRules: {
      required: "It's required",
    },
  },
  ['State / Province']: {
    name: 'state',
    label: 'State / Province',
    validationRules: {
      required: "It's required",
    },
  },
  City: {
    name: 'city',
    label: 'City',
    validationRules: {
      required: "It's required",
    },
  },
  ['Postal code']: {
    name: 'pincode',
    label: 'Postal code',
    validationRules: {
      required: "It's required",
      minLength: {
        value: 3,
        message: 'Postal code is not valid',
      },
      maxLength: {
        value: 6,
        message: 'Postal code is not valid',
      },
    },
  },
};

export default function LocationField({
  savedValue,
  control,
  errors,
  touched,
  watch,
  setValue,
  showPinCode,
  className = '',
  columnLayout,
  valueAccessBy,
  inputProps: { country: countryProps, showStar: showStarProps } = {},
}) {
  const { country, states, setSelectedStateId, cities } = useLocationsPlaces({
    valueAccessBy,
  });

  const watchStates = watch(FORM_EL_COUNTRY_CODE['State / Province'].name);

  useEffect(() => {
    if (!watchStates?.value) {
      setValue(FORM_EL_COUNTRY_CODE['City'].name, '');
      setSelectedStateId(null);
      return;
    }

    setSelectedStateId(watchStates?.value);
    if (savedValue?.state?.value == watchStates?.value) return;
    setValue(FORM_EL_COUNTRY_CODE['City'].name, '');
  }, [watchStates?.value]);

  const countryEl = () => {
    return (
      <DoctAutoComplete
        name={FORM_EL_COUNTRY_CODE.Country.name}
        id={FORM_EL_COUNTRY_CODE.Country.name}
        label={FORM_EL_COUNTRY_CODE.Country.label}
        validationRules={FORM_EL_COUNTRY_CODE.Country.validationRules}
        control={control}
        isErrors={errors}
        options={country?.filter(({ label }) => label == 'India') || []}
        touched={touched}
        onEndScroll={() => null}
        {...countryProps}
      />
    );
  };

  const stateEl = () => {
    return (
      <DoctAutoComplete
        {...showStarProps}
        name={FORM_EL_COUNTRY_CODE['State / Province'].name}
        id={FORM_EL_COUNTRY_CODE['State / Province'].name}
        label={FORM_EL_COUNTRY_CODE['State / Province'].label}
        validationRules={FORM_EL_COUNTRY_CODE['State / Province'].validationRules}
        control={control}
        isErrors={errors}
        options={states || []}
        touched={touched}
        onEndScroll={() => null}
      />
    );
  };

  const cityEl = () => {
    return (
      <DoctAutoComplete
        {...showStarProps}
        name={FORM_EL_COUNTRY_CODE.City.name}
        id={FORM_EL_COUNTRY_CODE.City.name}
        label={FORM_EL_COUNTRY_CODE.City.label}
        validationRules={FORM_EL_COUNTRY_CODE['City'].validationRules}
        control={control}
        isErrors={errors}
        options={cities || []}
        touched={touched}
        onEndScroll={() => null}
      />
    );
  };

  const pincodeEl = () => {
    return (
      <DoctTextField
        name={FORM_EL_COUNTRY_CODE['Postal code'].name}
        id={FORM_EL_COUNTRY_CODE['Postal code'].name}
        label={FORM_EL_COUNTRY_CODE['Postal code'].label}
        validationRules={FORM_EL_COUNTRY_CODE['Postal code'].validationRules}
        control={control}
        isErrors={errors}
        touched={touched}
      />
    );
  };

  if (columnLayout && typeof columnLayout == 'object' && Object.keys(columnLayout)?.length) {
    return (
      <DoctRow>
        <DoctCol md={columnLayout?.country || 6}>
          <div className={className ?? 'form_el form_el_gap_bottom'}>{countryEl()}</div>
        </DoctCol>
        <DoctCol md={columnLayout?.state || 6}>
          <div className={className ?? 'form_el form_el_gap_bottom'}>{stateEl()}</div>
        </DoctCol>
        <DoctCol md={columnLayout?.city || 6}>
          <div className={className ?? 'form_el form_el_gap_bottom'}>{cityEl()}</div>
        </DoctCol>
        {showPinCode && (
          <DoctCol md={columnLayout?.pincode || 6}>
            <div className={className ?? 'form_el form_el_gap_bottom'}>{pincodeEl()}</div>
          </DoctCol>
        )}
      </DoctRow>
    );
  }

  if (showPinCode) {
    return (
      <>
        <div className={`input-column input-column-half-size-row ${className}`}>
          <div className="input-column-half-size">{countryEl()}</div>
          <div className="input-column-half-size">{stateEl()}</div>
        </div>
        <div className="input-column input-column-half-size-row">
          <div className="input-column-half-size">{cityEl()}</div>
          <div className="input-column-half-size">{pincodeEl()}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`d-flex mx-n2 ${className}`}>
        <div className="flex-1 px-2">{countryEl()}</div>
        <div className="flex-1 px-2">{stateEl()}</div>
        <div className="flex-1 px-2">{cityEl()}</div>
      </div>
    </>
  );
}
