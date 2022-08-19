import { DoctForm } from '@doct-react/app';
import dayjs from 'dayjs';
import qs from 'qs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { transformStatus } from './constants.customTable';

export default function useFormFilter(defaultValue) {
  let navigate = useNavigate();

  const { handleSubmit, control, errors, formState, reset, register, watch, setValue } = DoctForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {},
  });

  const { touched, isDirty } = formState;

  const dateRange = watch('dateRange'); // date range
  const online = watch('online'); // Registration Type
  const offline = watch('offline'); // Registration Type
  const complementary = watch('complementary'); // Registration Type
  const confirmed = watch('confirmed'); // Order Status
  const pending = watch(transformStatus['pending']); // Order Status
  const cancelled = watch('cancelled'); // Order Status
  const fromDate = watch('fromDate'); // Order Status
  const toDate = watch('toDate'); // Order Status

  useEffect(() => {
    if (!isDirty) return;

    const obj = {
      ...defaultValue,
      pageNumber: 1,
      registrationType: [
        online ? 'online' : null,
        offline ? 'offline' : null,
        complementary ? 'complementary' : null,
      ],
      status: [
        confirmed ? 'confirmed' : null,
        pending ? transformStatus['pending'] : null,
        cancelled ? 'cancelled' : null,
      ],
    };

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

    let queryString = `${qs.stringify(obj, {
      encode: false,
      arrayFormat: 'repeat',
      indices: false,
      skipNulls: true,
    })}`;

    navigate(`?${queryString}`);
  }, [online, offline, complementary, confirmed, pending, cancelled, fromDate, toDate]);

  return {
    reset,
    handleSubmit,
    control,
    errors,
    touched,
    register,
    watch,
    fromDate,
    setValue,
  };
}
