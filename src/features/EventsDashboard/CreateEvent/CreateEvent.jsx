import { useDispatch, useSelector } from 'react-redux';

import { createEventSteps, Header, StepsContainer } from './components';
import { selectCurrentStep, setStepsFormData } from './createEvent.slice';

import './CreateEvent.scss';

export default function CreateEvent() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);

  dispatch(setStepsFormData({}));

  return (
    <>
      <Header />
      <main className="bg-grey-200 pt-3x vh-without-header">
        <StepsContainer steps={createEventSteps} currentStep={currentStep} />
      </main>
    </>
  );
}
