import { DoctAutoComplete } from '@doct-react/app';
import React, { useEffect, useState } from 'react';
import { useGetCountryQuery } from '../../hooks/useLocation/useLocations.services';

function UserLocation({
  control,
  errors,
  watch,
  setValue,
  countryName,
  stateName,
  cityName,
  defaultCountryVal,
  defaultStateVal,
  paymentStep = false,
  setCountryCode,
}) {
  const { data: countryData } = useGetCountryQuery();
  const countryEntry = watch(countryName);
  const stateEntry = watch(stateName);

  const countryNamesArray = [];
  const stateNamesArray = [];
  const cityNamesArray = [];

  countryData?.map((countries) => {
    if (countryEntry) {
      setCountryCode(countryEntry.countryCode);
    }
    countryNamesArray.push({
      label: countries.name,
      value: countries.name,
      countryCode: countries.numericCode,
    });
  });

  const StatesBasedOnCountry = countryData?.find((el) => {
    if (countryEntry?.label) {
      return el.name == countryEntry?.label;
    } else {
      return el.name == 'India';
    }
  });

  StatesBasedOnCountry?.states.map((states) => {
    stateNamesArray.push({
      label: states.name,
      cities: states.cities,
      value: states.name,
    });
  });

  const CitiesBasedOnStates = stateNamesArray?.find((el) => {
    return el.label == stateEntry?.label;
  });

  CitiesBasedOnStates?.cities.map((cities) => {
    cityNamesArray.push({ label: cities.name, value: cities.name });
  });

  useEffect(() => {
    if (defaultStateVal == stateEntry?.label) return;
    setValue(cityName, '');
  }, [stateEntry]);

  useEffect(() => {
    if (defaultCountryVal == countryEntry?.label) return;
    setValue(stateName, '');
    setValue(cityName, '');
  }, [countryEntry]);

  return (
    <>
      {paymentStep ? (
        ''
      ) : (
        <div className="mb-2">
          <DoctAutoComplete
            name={countryName}
            label="Country"
            id="country"
            variant="standard"
            control={control}
            options={countryNamesArray}
            validationRules={{
              required: "It's required",
            }}
            onEndScroll={() => null}
            isErrors={errors}
            defaultValue=""
          />
        </div>
      )}

      <div className="mb-2">
        <DoctAutoComplete
          name={stateName}
          label={paymentStep ? 'State/UT' : 'State'}
          id="state"
          variant="standard"
          control={control}
          options={stateNamesArray}
          validationRules={{
            required: "It's required",
          }}
          onEndScroll={() => null}
          isErrors={errors}
          defaultValue=""
        />
      </div>
      <div className="mb-2">
        <DoctAutoComplete
          name={cityName}
          label="City"
          id="city"
          variant="standard"
          control={control}
          options={cityNamesArray}
          validationRules={{
            required: "It's required",
          }}
          onEndScroll={() => null}
          isErrors={errors}
          defaultValue=""
        />
      </div>
    </>
  );
}

export default UserLocation;
