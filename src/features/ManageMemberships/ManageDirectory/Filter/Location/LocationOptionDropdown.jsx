import { DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { DoctAutoComplete, DoctCheckbox } from '@doct-react/app';

import useQueryHooks from '../../../../../hooks/useQueryHooks';

const LocationOptionDropdown = ({
  control,
  errors,
  dropdownOptions,
  watch,
  filterObj,
  setFilterObj,
  defaultValue,
}) => {
  // const [countries, setCountries] = useState([]);
  // const [states, setStates] = useState([]);
  // const [cities, setCities] = useState([]);
  // const query = useQueryHooks();
  const [userSearchedCountry, setUserSearchedCountry] = useState();
  const [userSearchedState, setUserSearchedState] = useState();
  const [userSearchedCities, setUserSearchedCities] = useState();

  const countriesSearchOptions = [];
  const statesSearchOption = [];
  const citiesSearchOption = [];

  dropdownOptions?.countries?.map((option) => {
    countriesSearchOptions.push({ label: option.value });
  });

  dropdownOptions?.states?.map((option) => {
    statesSearchOption.push({ label: option.value });
  });

  dropdownOptions?.cities?.map((option) => {
    citiesSearchOption.push({ label: option.value });
  });

  const watchSearchCountriesOptions = watch('searchCountriesOptions');
  const watchSearchStatesOptions = watch('searchStatesOptions');
  const watchSearchCitiesOptions = watch('searchCitiesOptions');

  useEffect(() => {
    if (watchSearchCountriesOptions) {
      const countriesSearchedByUser = dropdownOptions?.countries?.find((country) => {
        return watchSearchCountriesOptions.label == country.value;
      });
      setUserSearchedCountry(countriesSearchedByUser);
    }

    if (watchSearchStatesOptions) {
      const statesSearchedByUser = dropdownOptions?.states?.find((state) => {
        return watchSearchStatesOptions.label == state.value;
      });
      setUserSearchedState(statesSearchedByUser);
    }

    if (watchSearchCitiesOptions) {
      const citiesSearchedByUser = dropdownOptions?.cities?.find((city) => {
        return watchSearchCitiesOptions.label == city.value;
      });
      setUserSearchedCities(citiesSearchedByUser);
    }
  }, [watchSearchCountriesOptions, watchSearchStatesOptions, watchSearchCitiesOptions]);

  return (
    <>
      <div>
        <DoctTypography variant="subtitle2" className="mt-4 form-heading-mb">
          Country
        </DoctTypography>

        {dropdownOptions?.countries?.length > 5 && (
          <DoctAutoComplete
            name={'searchCountriesOptions'}
            label={'Search'}
            id={'search'}
            control={control}
            isErrors={errors}
            onClearInput={() => {
              setUserSearchedCountry();
            }}
            className={'filter_search_input'}
            options={countriesSearchOptions}
            onEndScroll={() => null}
          />
        )}

        {userSearchedCountry ? (
          <>
            <DoctCheckbox
              onChange={(e) => {
                let obj = { ...filterObj };
                if (e.target.checked) {
                  obj.countries = [...obj.countries, e.target.value];
                  // setCountries((prevState) => [...prevState, userSearchedCountry.id]);
                } else {
                  obj.countries = obj.countries.filter((value) => {
                    return value != e.target.value;
                  });
                  // setCountries(countries.filter((item) => item != userSearchedCountry.id));
                }
                setFilterObj(obj);
              }}
              checkboxProps={{ value: userSearchedCountry.value }}
              name={`${userSearchedCountry.value}`}
              label={`${userSearchedCountry.value}`}
              id="checkbox"
              control={control}
              isErrors={errors}
              validationRules={{}}
              className="d-block"
              isChecked={defaultValue?.['countries']?.find((val) => {
                return val == userSearchedCountry.value;
              })}
            />
          </>
        ) : (
          dropdownOptions?.countries?.map((countriesFromApi, index) => (
            <>
              <DoctCheckbox
                onChange={(e) => {
                  let obj = { ...filterObj };
                  if (e.target.checked) {
                    obj.countries = [...obj.countries, e.target.value];
                    // setCountries((prevState) => [...prevState, countriesFromApi.id]);
                  } else {
                    obj.countries = obj.countries.filter((value) => {
                      return value != e.target.value;
                    });
                    // setCountries(countries.filter((item) => item != countriesFromApi.id));
                  }
                  setFilterObj(obj);
                }}
                key={index}
                checkboxProps={{ value: countriesFromApi.value }}
                name={`${countriesFromApi.value}`}
                label={`${countriesFromApi.value}`}
                id="checkbox"
                control={control}
                isErrors={errors}
                validationRules={{}}
                className="d-block"
                isChecked={defaultValue?.['countries']?.find((val) => {
                  return val == countriesFromApi.value;
                })}
              />
            </>
          ))
        )}
      </div>

      <div>
        <DoctTypography variant="subtitle2" className="mt-4 form-heading-mb">
          State/Province
        </DoctTypography>

        {dropdownOptions?.states?.length > 4 && (
          <DoctAutoComplete
            name={'searchStatesOptions'}
            label={'Search'}
            id={'search'}
            control={control}
            isErrors={errors}
            onClearInput={() => {
              setUserSearchedState();
            }}
            className={'filter_search_input'}
            options={statesSearchOption}
            onEndScroll={() => null}
          />
        )}

        {userSearchedState ? (
          <DoctCheckbox
            onChange={(e) => {
              let obj = { ...filterObj };
              if (e.target.checked) {
                obj.states = [...obj.states, e.target.value];
                // setStates((prevState) => [...prevState, userSearchedState.id]);
              } else {
                obj.states = obj.states.filter((value) => {
                  return value != e.target.value;
                });
                // setStates(states.filter((item) => item != userSearchedState.id));
              }
              setFilterObj(obj);
            }}
            checkboxProps={{ value: userSearchedState.value }}
            name={`${userSearchedState.value}`}
            label={`${userSearchedState.value}`}
            id="checkbox"
            control={control}
            isErrors={errors}
            validationRules={{}}
            className="d-block"
            isChecked={defaultValue?.['states']?.find((val) => {
              return val == userSearchedState.value;
            })}
          />
        ) : (
          dropdownOptions?.states?.map((statesFromApi, index) => (
            <DoctCheckbox
              onChange={(e) => {
                let obj = { ...filterObj };
                if (e.target.checked) {
                  obj.states = [...obj.states, e.target.value];
                  // setStates((prevState) => [...prevState, statesFromApi.id]);
                } else {
                  obj.states = obj.states.filter((value) => {
                    return value != e.target.value;
                  });
                  // setStates(states.filter((item) => item != statesFromApi.id));
                }
                setFilterObj(obj);
              }}
              checkboxProps={{ value: statesFromApi.value }}
              key={index}
              name={`${statesFromApi.value}`}
              label={`${statesFromApi.value}`}
              id="checkbox"
              control={control}
              isErrors={errors}
              validationRules={{}}
              className="d-block"
              isChecked={defaultValue?.['states']?.find((val) => {
                return val == statesFromApi.value;
              })}
            />
          ))
        )}
      </div>

      <div>
        <DoctTypography variant="subtitle2" className="mt-4 form-heading-mb">
          City
        </DoctTypography>

        {dropdownOptions?.cities?.length > 4 && (
          <DoctAutoComplete
            name={'searchCitiesOptions'}
            label={'Search'}
            id={'search'}
            control={control}
            isErrors={errors}
            onClearInput={() => {
              setUserSearchedCities();
            }}
            className={'filter_search_input'}
            options={citiesSearchOption}
            onEndScroll={() => null}
          />
        )}

        {userSearchedCities ? (
          <DoctCheckbox
            onChange={(e) => {
              let obj = { ...filterObj };
              if (e.target.checked) {
                obj.cities = [...obj.cities, e.target.value];
                // setCities((prevState) => [...prevState, userSearchedCities.id]);
              } else {
                obj.cities = obj.cities.filter((value) => {
                  return value != e.target.value;
                });
                // setCities(cities.filter((item) => item != userSearchedCities.id));
              }
              setFilterObj(obj);
            }}
            checkboxProps={{ value: userSearchedCities.value }}
            name={`${userSearchedCities.value}`}
            label={`${userSearchedCities.value}`}
            id="checkbox"
            control={control}
            isErrors={errors}
            validationRules={{}}
            className="d-block"
            isChecked={defaultValue?.['cities']?.find((val) => {
              return val == userSearchedCities.value;
            })}
          />
        ) : (
          dropdownOptions?.cities?.map((citiesFromApi, index) => (
            <DoctCheckbox
              onChange={(e) => {
                let obj = { ...filterObj };
                if (e.target.checked) {
                  obj.cities = [...obj.cities, e.target.value];
                  // setCities((prevState) => [...prevState, citiesFromApi.id]);
                } else {
                  obj.cities = obj.cities.filter((value) => {
                    return value != e.target.value;
                  });
                  // setCities(cities.filter((item) => item != citiesFromApi.id));
                }
                setFilterObj(obj);
              }}
              key={index}
              checkboxProps={{ value: citiesFromApi.value }}
              name={`${citiesFromApi.value}`}
              label={`${citiesFromApi.value}`}
              id="checkbox"
              control={control}
              isErrors={errors}
              validationRules={{}}
              className="d-block"
              isChecked={defaultValue?.['cities']?.find((val) => {
                return val == citiesFromApi.value;
              })}
            />
          ))
        )}
      </div>
    </>
  );
};

export default LocationOptionDropdown;
