import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetCountryQuery } from './useLocations.services';

function prepareLabelVal(array = [], selectLabel, selectValue) {
  return array.reduce((prevVal, currentVal) => {
    const obj = {};
    obj['label'] = currentVal[selectLabel];
    obj['value'] = currentVal[selectValue];
    return [...prevVal, obj];
  }, []);
}

export default function useLocationsPlaces({ valueAccessBy = 'id' }) {
  const { data, isLoading } = useGetCountryQuery('');

  const [country, setCountry] = useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState(null);

  const [states, setStates] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (isLoading) return;
    if (!data?.length) return;
    const prepareCountry = prepareLabelVal(data, 'name', valueAccessBy);
    setCountry(prepareCountry);
  }, [isLoading]);

  useEffect(() => {
    if (!country.length) return;
    const defaultStateArray = country.find(({ label }) => label == 'India');
    const { value } = defaultStateArray;
    setSelectedCountryID(value);

    const findStatesOfDefaultCountry = data.find(
      ({ [valueAccessBy]: destructBy }) => destructBy == value,
    );
    setStates(prepareLabelVal(findStatesOfDefaultCountry?.states, 'name', valueAccessBy));
  }, [country]);

  useEffect(() => {
    if (!data?.length) return;
    if (!selectedStateId) {
      setCities([]);
      return;
    }
    onChangeState();
  }, [selectedStateId, states?.length]);

  const statesOfDefaultCountry = useMemo(() => {
    if (!data?.length) return;
    if (!selectedCountryID) return;
    const { states = [] } =
      data.find(({ [valueAccessBy]: destructBy }) => destructBy == selectedCountryID) || {};
    return states;
  }, [selectedCountryID, data?.length]);

  const onChangeState = useCallback(() => {
    if (!statesOfDefaultCountry) return;
    setCities([]);
    const findCities =
      statesOfDefaultCountry.find(
        ({ [valueAccessBy]: destructBy }) => destructBy == selectedStateId,
      ) || {};
    setCities(prepareLabelVal(findCities?.cities, 'name', valueAccessBy));
  }, [selectedStateId, statesOfDefaultCountry]);

  return { country, states, setSelectedStateId, cities };
}
