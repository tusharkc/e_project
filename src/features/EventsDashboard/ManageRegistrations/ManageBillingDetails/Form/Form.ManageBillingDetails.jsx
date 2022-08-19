import { memo } from 'react';
import { transformManageBillingInfoToFromValue } from '../../helperFunction.ManageRegistration';
import BillingTypeSelection from '../../OfflineRegistration/Steps/BillingDetails/BillingTypeSelection';
import BusinessBillingDetails from '../../OfflineRegistration/Steps/BillingDetails/Business.BillingDetails';
import IndividualBillingDetails from '../../OfflineRegistration/Steps/BillingDetails/Individual.BillingDetails';

function FormEditBillingDetails({
  control,
  errors,
  touched,
  setValue,
  watch,
  clearErrors,
  defaultValue,
}) {
  const watchType = watch('type');

  const commonProps = {
    savedValue: transformManageBillingInfoToFromValue(defaultValue),
    columnLayoutLocationField: { country: 12, city: 12, state: 12, pincode: 12 },
    columnLayoutMobileField: { mobile: 12, whatsapp: 12 },
    classes: {
      mobileField: 'input-column mr-n3 form_el form_el_gap_top',
      locationField: 'form_el form_el_gap_top',
      taxField: 'form_el form_el_gap_top',
    },
    locationValueAccessesBy: 'name',
  };

  const formProps = { errors, control, touched, watch, setValue, clearErrors };

  return (
    <form>
      <>
        <BillingTypeSelection
          errors={errors}
          control={control}
          className={'mb-3'}
          defaultValue={defaultValue?.billingType}
          classNameRadioGroup={'ml-n2'}
        />
        {watchType == 'Individual' && <IndividualBillingDetails {...formProps} {...commonProps} />}
        {watchType == 'Business' && <BusinessBillingDetails {...formProps} {...commonProps} />}
      </>
    </form>
  );
}

export default memo(FormEditBillingDetails);
