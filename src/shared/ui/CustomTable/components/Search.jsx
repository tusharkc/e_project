import { DoctFreeSoloSearchInput } from '@doct-react/app';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useQueryHooks from '../../../../hooks/useQueryHooks';
import qs from 'qs';

export default function Search({ searchPlaceholder, searchOptions }) {
  const query = useQueryHooks();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(query?.searchText || '');
  }, [query?.searchText]);

  const onChangeHandler = (searchValue) => {
    setSearchValue([searchValue]);
  };

  const inputChangeHandler = useCallback(
    (val) => {
      setInputValue(val);
      if (val) {
        const queryObj = { ...query };
        queryObj.pageNumber = 1;
        queryObj.searchText = val;
        navigate(`?${qs.stringify(queryObj, { indices: false })}`);
      } else {
        const queryObj = { ...query };
        queryObj.pageNumber = 1;

        delete queryObj.searchText;
        navigate(`?${qs.stringify(queryObj, { indices: false })}`);
      }
    },
    [searchValue, qs.stringify(query)],
  );

  return (
    <div className="container-2xx ml-auto d-none d-sm-block">
      <DoctFreeSoloSearchInput
        name="searchText"
        placeholder={searchPlaceholder}
        options={searchOptions}
        onInputChangeHandler={(val) => {
          inputChangeHandler(val);
        }}
        onChangeHandler={(val) => {
          onChangeHandler(val);
        }}
        inputValue={inputValue}
        value={searchValue || null}
        noRadial
      />
    </div>
  );
}
