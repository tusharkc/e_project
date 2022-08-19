import { DoctButton, DoctCol, DoctIcon, DoctTypography } from '@doct-react/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextEditor, FixedPanel, Tost } from '../../../../../../shared';
import {
  selectCurrentStep,
  selectLoading,
  selectShowError,
  setCurrentStep,
  setShowError,
} from '../../../createEvent.slice';
import CurrentAndTotalSteps from '../../CurrentAndTotalSteps';
import { StepTitle } from '../../UiHelper';
import stepsName from '../stepsName';
import useFormTermsPolicies from './Form.TermsPolicies';
import './TermsPolicies.scss';
import './TermsPolicies.scss';

export default function TermsPolicies() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const loading = useSelector(selectLoading);
  const [erorFormSubmit, setErrorFormSubmit] = useState(null);
  const [showTost, setShowTost] = useState(false);

  const { handleFormSubmit, formName } = useFormTermsPolicies();

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
        <DoctCol xs={6} className="mx-auto mb-5 mb-5">
          {showError && (
            <div className="position-fixed tost-container">
              <Tost
                variant={'error'}
                text={erorFormSubmit?.Title || 'Oops! something went wrong'}
                onPressedClose={onTostCloseHandler}
              />
            </div>
          )}
          <DoctTypography variant="h6" fontWeight="bold" className="mb-1 text-grey-800">
            Terms & Conditions
          </DoctTypography>
          <DoctTypography variant="body2" className="text-grey-600 mb-1">
            Define terms and conditions as for this event.
          </DoctTypography>
          <span className="text_overview_description">
            <TextEditor {...formName.termsAndCondition} />
          </span>
          <div className="horizontal_line position-relative mt-5"></div>
          <DoctTypography variant="h6" fontWeight="bold" className="mb-1 mt-5 text-grey-800">
            Cancellation & Refund Policy
          </DoctTypography>
          <span className="text_overview_description">
            <TextEditor {...formName.cancellationAndRefundPolicy} />
          </span>
          <div className="horizontal_line position-relative mt-5"></div>
          <DoctTypography variant="h6" fontWeight="bold" className="mb-1 mt-5 text-grey-800">
            Remarks
          </DoctTypography>
          <span className="text_overview_description">
            <TextEditor {...formName.remarks} />
          </span>
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
          onButtonClickHandler={() => {
            handleFormSubmit();
          }}
        />
      </FixedPanel>
    </>
  );
}
