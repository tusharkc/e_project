import { DoctForm } from '@doct-react/app';
import { transformManageBillingInfoFormValueToApiDataBody } from '../../helperFunction.ManageRegistration';
import { useUpdateBillingDetailsMutation } from '../../manageRegistration.services';

const defaultValues = {
  mobileCountryCode: {
    label: '+91',
  },
  whatsappCountryCode: {
    label: '+91',
  },
};

export const useManageBillingDetails = (editBillingDetailObj, setEditBillingDetailObj) => {
  const [updateBillingDetails, { isLoading: isUpdating, isError, isSuccess }] =
    useUpdateBillingDetailsMutation();

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

  const handleFormSubmit = handleSubmit((values, editBillingDetailObj) => {
    const { id: billingId, eventId } = editBillingDetailObj;
    if (!isDirty) {
      setEditBillingDetailObj(null);
      return;
    }
    updateBillingDetails({
      eventId,
      billingId,
      body: transformManageBillingInfoFormValueToApiDataBody(values),
    });
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
