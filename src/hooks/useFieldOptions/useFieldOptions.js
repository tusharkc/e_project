import { useCallback, useMemo, useState } from 'react';
import { useGetDropDownOptionsQuery } from './useFieldOption.service';

const useFieldOptions = ({ apiRoute, searchText, optionObjectKey = 'label' }) => {
  const { data } = useGetDropDownOptionsQuery({ apiRoute, searchText });

  const [optionsArray, setOptionsArray] = useState([]);

  const mutateOptions = useCallback(() => {
    data?.map((option) => {
      setOptionsArray((prevState) => [
        ...prevState,
        { [optionObjectKey]: option?.name, id: option?.id, value: option?.id },
      ]);
    });
  }, [data, searchText]);

  useMemo(() => {
    setOptionsArray([]);
    mutateOptions();
  }, [data, searchText]);

  return { optionsArray };
};

export default useFieldOptions;
