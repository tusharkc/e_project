import { DoctForm } from '@doct-react/app';
import {
  useEditAttendeeMutation,
  useUpdateAttendeeMutation,
} from '../services/manageAttendess.services';

const defaultValues = {
  mobileCountryCode: {
    label: '+91',
  },
  whatsappCountryCode: {
    label: '+91',
  },
};

export const useManageAttendeeForm = (attendeeObj, setAttendeeObj) => {
  const [
    updateAttendee, // This is the mutation trigger
    { isLoading: isUpdating, isError, isSuccess }, // This is the destructured mutation result
  ] = useUpdateAttendeeMutation();

  const {
    handleSubmit,
    control,
    errors,
    register,
    watch,
    setValue,
    touched,
    clearErrors,
    reset,
    formState,
  } = DoctForm({
    mode: 'onChange',
    defaultValues: { defaultValues },
  });

  const { isDirty } = formState;

  const handleFormSubmit = handleSubmit((values, attendeeObj) => {
    if (!isDirty) {
      setAttendeeObj(null);
      return;
    }
    const transformObj = {
      ...attendeeObj,
      ...values,
      country: values.country?.label,
      state: values.state?.label,
      city: values.city?.label,
      phoneNo: {
        countryCode: values.mobileCountryCode?.label,
        number: values.mobileNumber,
      },
      whatsAppNumber: {
        countryCode: values.whatsappCountryCode?.label,
        number: values.whatsAppNumber,
      },
    };
    updateAttendee(transformObj);
  });

  return {
    handleFormSubmit,
    control,
    errors,
    register,
    watch,
    setValue,
    touched,
    clearErrors,
    reset,
    isUpdating,
    isError,
    isSuccess,
  };
};
