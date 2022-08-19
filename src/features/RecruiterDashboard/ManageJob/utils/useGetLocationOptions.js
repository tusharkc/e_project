import { useCallback, useEffect, useState } from 'react';
import { useGetCountryQuery } from '../../../../hooks/useLocation/useLocations.services';

const useGetLocationOptions = ({ watch }) => {
  const [locationStateOptions, setLocationStateOptions] = useState([]);
  const [locationCitiesOption, setLocationCitiesOption] = useState([]);

  const { data: countryData } = useGetCountryQuery();

  const watchStateInput = watch('stateId');

  useEffect(() => {
    if (countryData) {
      countryData[0]?.states?.map((state) => {
        setLocationStateOptions((prevState) => [
          ...prevState,
          { label: state?.name, id: state?.id, value: state?.id },
        ]);
      });
    }
  }, [countryData]);

  useEffect(() => {
    findCityFromStateId();
  }, [watchStateInput]);

  const findCityFromStateId = useCallback(() => {
    if (countryData && watchStateInput?.id) {
      const foundStateWithSelectedStateId = countryData[0]?.states?.find(
        (state) => state.id == watchStateInput.id,
      );

      foundStateWithSelectedStateId?.cities?.map((city) => {
        setLocationCitiesOption((prevState) => [
          ...prevState,
          { label: city.name, id: city.id, value: city?.id },
        ]);
      });
    }
  }, [watchStateInput?.id]);

  return { locationStateOptions, locationCitiesOption };
};

export default useGetLocationOptions;
