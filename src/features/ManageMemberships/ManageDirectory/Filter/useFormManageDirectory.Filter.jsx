import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { DoctForm } from '@doct-react/app';

const useFormManageDirectoryFilter = (isLoading, defaultValue) => {
  let navigate = useNavigate();

  const [skipRouteNavigation, setSkipRouteNavigation] = useState(true);

  const [filterObj, setFilterObj] = useState({
    ...{
      memberStatuses: [],
      memberships: [],
      membershipNames: [],
      countries: [],
      states: [],
      cities: [],
    },
    ...defaultValue,
  });
  const [filterObjForm, setFilterObjForm] = useState({});

  const { handleSubmit, control, errors, formState, reset, register, watch, setValue } = DoctForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { touched, isDirty } = formState;
  const fromDate = watch('fromDate');
  const toDate = watch('toDate');
  const typeOfDate = watch('typeOfDate');

  useEffect(() => {
    if (skipRouteNavigation) {
      // On modal render skip to navigate
      setSkipRouteNavigation(false);
      return;
    }
    // Navigation will be continue when user change filter
    navigate(
      `?${qs.stringify({ ...filterObj, ...filterObjForm, pageNumber: 1 }, { indices: false })}`,
    );
  }, [filterObj]);

  useEffect(() => {
    if (!isDirty) return;
    let obj = { ...filterObj, ...defaultValue, pageNumber: 1 };

    if (fromDate && toDate) {
      obj.fromDate = dayjs(fromDate).format('YYYY/MM/DD').split('T')[0];
      obj.toDate = dayjs(toDate).format('YYYY/MM/DD').split('T')[0];
    } else {
      obj.fromDate = null;
      obj.toDate = null;
    }

    if (!fromDate) {
      setValue('toDate', null);
    }

    if (typeOfDate == 0) {
      setValue('fromDate', null);
      setValue('toDate', null);
      delete obj.fromDate;
      delete obj.toDate;
    }

    let queryString = `${qs.stringify(obj, {
      encode: false,
      arrayFormat: 'repeat',
      indices: false,
      skipNulls: true,
    })}`;

    setFilterObjForm(obj);

    navigate(`?${queryString}`);
  }, [fromDate, toDate, typeOfDate]);

  const handleFormSubmit = handleSubmit((values) => {});

  return {
    reset,
    handleFormSubmit,
    control,
    errors,
    touched,
    register,
    watch,
    fromDate,
    filterObj,
    setFilterObj,
  };
};

export default useFormManageDirectoryFilter;
