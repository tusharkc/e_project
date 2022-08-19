import { DoctAutoComplete, DoctTextField } from '@doct-react/app';
import { DoctButton, DoctCol, DoctTypography, DoctIcon } from '@doct-react/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FixedPanel, Tost } from '../../../../../../shared/ui';
import {
  selectCurrentStep,
  selectLoading,
  selectShowError,
  setCurrentStep,
  setShowError,
} from '../../../createEvent.slice';
import CurrentAndTotalSteps from '../../CurrentAndTotalSteps';
import { FormHeading, StepTitle } from '../../UiHelper';
import stepsName from '../stepsName';
import { InvoiceDetails, PaymentSettlement, PayoutCountryAndCurrency } from './Components';
import useFormPaymentsInvoice from './Form.PaymentsInvoice';

export default function PaymentsInvoice() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const loading = useSelector(selectLoading);
  const [erorFormSubmit, setErrorFormSubmit] = useState(null);
  const [showTost, setShowTost] = useState(false);

  const {
    formName,
    handleFormSubmit,
    touched,
    uploadSignature,
    setUploadSignature,
    uploadRegistration,
    setUploadRegistration,
    watch,
    setValue,
    control,
    errors,
    defaultStateValue,
  } = useFormPaymentsInvoice();

  const showError = useSelector(selectShowError);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowError(false));
    }, 2000);
  }, [showError]);

  useEffect(() => {
    if (showTost) {
      setTimeout(() => {
        onTostCloseHandler();
      }, 2000);
    }
  }, [showTost]);

  const onTostCloseHandler = () => {
    setShowTost(false);
    setErrorFormSubmit(null);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <DoctCol xs={6} className="mx-auto">
          {showError && (
            <div className="position-fixed tost-container">
              <Tost
                variant={'error'}
                text={erorFormSubmit?.Title || 'Oops! something went wrong'}
                onPressedClose={onTostCloseHandler}
              />
            </div>
          )}
          <PayoutCountryAndCurrency formName={formName} />
          <div className="horizontal_line_grey position-relative mt-4 mb-4"></div>
          <PaymentSettlement formName={formName} touched={touched} />
          <div className="horizontal_line_grey position-relative mb-4"></div>
          <InvoiceDetails
            formName={formName}
            touched={touched}
            uploadSignature={uploadSignature}
            setUploadSignature={setUploadSignature}
            uploadRegistration={uploadRegistration}
            setUploadRegistration={setUploadRegistration}
            watch={watch}
            control={control}
            errors={errors}
            setValue={setValue}
            defaultStateValue={defaultStateValue}
          />
        </DoctCol>
      </form>
      <FixedPanel
        container
        className="backdrop-filter"
        contentClassName="d-flex align-items-center py-12px"
      >
        <CurrentAndTotalSteps />
        <DoctButton
          text="Back"
          variant="outline"
          className="mr-2"
          onButtonClickHandler={() => {
            dispatch(setCurrentStep(currentStep - 1));
          }}
        />
        <DoctButton
          disabled={loading}
          text="Save & Next"
          className=""
          onButtonClickHandler={() => {
            handleFormSubmit();
          }}
        />
      </FixedPanel>
    </>
  );
}
