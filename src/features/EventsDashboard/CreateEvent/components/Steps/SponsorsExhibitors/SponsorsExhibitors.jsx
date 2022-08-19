import { DoctButton, DoctCol, DoctIcon, DoctTypography } from '@doct-react/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedPanel, Tost } from '../../../../../../shared/ui';
import {
  selectBasicInfoDetails,
  selectCurrentStep,
  selectLoading,
  selectShowError,
  setCurrentStep,
  setShowError,
} from '../../../createEvent.slice';
import CurrentAndTotalSteps from '../../CurrentAndTotalSteps';
import { Exhibitors, Sponsors } from './Components';
import useFormSponsorsExhibitors from './Form.SponsorsExhibitors';
import './SponsorsExhibitors.scss';

export default function SponsorsExhibitors() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const [erorFormSubmit, setErrorFormSubmit] = useState(null);
  const [showTost, setShowTost] = useState(false);

  const {
    handleFormSubmit,
    formName,
    touched,
    setExhibitors,
    exhibitors,
    setSponsors,
    sponsors,
    exhibitorLayout,
    setExhibitorLayout,
  } = useFormSponsorsExhibitors();

  const basicInfo = useSelector(selectBasicInfoDetails);
  const loading = useSelector(selectLoading);

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
        <DoctCol xs={8} className="mx-auto">
          {showError && (
            <div className="position-fixed tost-container">
              <Tost
                variant={'error'}
                text={erorFormSubmit?.Title || 'Oops! something went wrong'}
                onPressedClose={onTostCloseHandler}
              />
            </div>
          )}
          <Sponsors setSponsors={setSponsors} sponsors={sponsors} />
          <Exhibitors
            setExhibitors={setExhibitors}
            exhibitors={exhibitors}
            exhibitorLayout={exhibitorLayout}
            setExhibitorLayout={setExhibitorLayout}
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
            if (Object.keys(basicInfo).length) {
              if (basicInfo.RegistrationType == 'Free') {
                dispatch(setCurrentStep(currentStep - 2));
              } else {
                dispatch(setCurrentStep(currentStep - 1));
              }
            }
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
