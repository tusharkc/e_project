import { DoctAutoComplete, DoctFileUpload, DoctTextField } from '@doct-react/app';
import { DoctButton, DoctCol, DoctIcon, DoctTypography } from '@doct-react/core';
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
import useFormScheduleSpeakers from './Form.ScheduleSpeakers';
import { Schedule, Speaker } from './Components';
import './ScheduleSpeaker.scss';
import FormGroup from '../../../../../../shared/FormGroup';
import { useEffect, useState } from 'react';

export default function ScheduleSpeakers() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const loading = useSelector(selectLoading);
  const [erorFormSubmit, setErrorFormSubmit] = useState(null);
  const [showTost, setShowTost] = useState(false);

  const { handleFormSubmit, setSpeakers, speakers, setUploadedFiles, uploadedFiles } =
    useFormScheduleSpeakers();

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
        <DoctCol xs={10} className="mx-auto mb-5">
          {showError && (
            <div className="position-fixed tost-container">
              <Tost
                variant={'error'}
                text={erorFormSubmit?.Title || 'Oops! something went wrong'}
                onPressedClose={onTostCloseHandler}
              />
            </div>
          )}
          <Schedule uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
          <Speaker setSpeakers={setSpeakers} speakers={speakers} />
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
