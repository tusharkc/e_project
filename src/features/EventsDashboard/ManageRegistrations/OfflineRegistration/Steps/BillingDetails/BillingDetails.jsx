import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DoctForm, DoctRadioGroup } from '@doct-react/app';
import {
  DoctButton,
  DoctCol,
  DoctContainer,
  DoctIcon,
  DoctRow,
  DoctTypography,
} from '@doct-react/core';

import { EventRegistrationLayoutFooter } from '../../../../../../layout';

import BusinessBillingDetails from './Business.BillingDetails';
import IndividualBillingDetails from './Individual.BillingDetails';

import {
  saveBillingDetails,
  selectAmount,
  selectBillingDetails,
  selectErrorValidateRegistration,
  selectLoadingValidateRegistration,
  setActiveStep,
  setValidateRegistrationError,
} from '../../offlineRegistration.slice';
import { validateRegistration } from '../../offlineRegistration.services';
import BillingTypeSelection from './BillingTypeSelection';

const billingDetailsDefaultValue = {
  type: 'Individual',
  country: {
    label: 'India',
  },
  mobileCountryCode: {
    label: '+91',
  },
  whatsappCountryCode: {
    label: '+91',
  },
};

export default function BillingDetails() {
  const dispatch = useDispatch();

  const { handleSubmit, control, errors, reset, watch, touched, setValue, clearErrors } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const billingDetails = useSelector(selectBillingDetails);
  const { totalAmount, currency } = useSelector(selectAmount);
  const errorValidateRegistration = useSelector(selectErrorValidateRegistration);
  const loadingValidateRegistration = useSelector(selectLoadingValidateRegistration);

  const handleFormSubmit = handleSubmit((values) => {
    dispatch(saveBillingDetails(values));
    dispatch(validateRegistration());
    // dispatch(setActiveStep(3));
  });

  useEffect(() => {
    reset({ ...billingDetailsDefaultValue, ...billingDetails });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setValidateRegistrationError(false));
    }, 2000);
  }, [errorValidateRegistration]);

  const watchType = watch('type');

  return (
    <DoctContainer>
      <form onSubmit={handleFormSubmit}>
        <DoctTypography variant="h6" className="mb-3 mt-4">
          Fill billing information
        </DoctTypography>

        <div className="border-radius box-shadow overflow-hidden">
          <div className="bg-white">
            <DoctRow>
              <DoctCol xs={6} className="mx-auto">
                <BillingTypeSelection
                  errors={errors}
                  control={control}
                  className={'d-flex px-3 pt-12px pb-12px'}
                />
              </DoctCol>
            </DoctRow>
          </div>
          <div className="bg-grey-100 p-4 py-5">
            <DoctRow>
              <DoctCol md={6} className="mx-auto">
                {watchType == 'Individual' && (
                  <IndividualBillingDetails
                    errors={errors}
                    control={control}
                    touched={touched}
                    watch={watch}
                    setValue={setValue}
                    clearErrors={clearErrors}
                    savedValue={billingDetails}
                  />
                )}
                {watchType == 'Business' && (
                  <BusinessBillingDetails
                    errors={errors}
                    control={control}
                    touched={touched}
                    watch={watch}
                    setValue={setValue}
                    clearErrors={clearErrors}
                    savedValue={billingDetails}
                  />
                )}
              </DoctCol>
            </DoctRow>
          </div>
        </div>
      </form>

      <EventRegistrationLayoutFooter>
        <DoctTypography variant="textLabel1" fontWeight="medium">
          Total Amount:{' '}
        </DoctTypography>
        <DoctTypography variant="textLabel1" className="pl-1">
          {currency} {totalAmount}
        </DoctTypography>
        <DoctButton
          text="Back"
          variant="outline"
          type="secondary"
          className="ml-auto mr-2"
          onButtonClickHandler={() => {
            dispatch(setActiveStep(1));
          }}
        />
        <DoctButton
          disabled={loadingValidateRegistration}
          iconPosition="right"
          text="Continue"
          onButtonClickHandler={() => {
            handleFormSubmit();
          }}
        />
      </EventRegistrationLayoutFooter>
      {errorValidateRegistration && (
        <div className={`custom-toster custom-toster-failed`}>
          <div className="custom-toster-icon">
            <DoctIcon width="24" height="24" name={'exclamation'} />
          </div>
          Oops! something went wrong
        </div>
      )}
    </DoctContainer>
  );
}
