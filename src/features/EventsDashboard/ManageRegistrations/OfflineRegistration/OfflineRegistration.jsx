import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { EventRegistrationLayout } from '../../../../layout';
import { AttendeeDetails, BillingDetails, Confirmation, Payment, Register } from './Steps';

import {
  selectActiveStep,
  selectEventDetails,
  selectIsEventLoading,
  setDefaultState,
} from './offlineRegistration.slice';

import { fetchEventDetails } from '../manageRegistration.services';

import './OfflineRegistration.scss';

const finalStepNumber = 4;

export default function OfflineRegistration() {
  const dispatch = useDispatch();
  const { code } = useParams();

  const activeStep = useSelector(selectActiveStep);
  const isEventLoading = useSelector(selectIsEventLoading);
  const eventDetails = useSelector(selectEventDetails);

  useEffect(() => {
    dispatch(fetchEventDetails(code));

    return () => {
      dispatch(setDefaultState());
    };
  }, [code]);

  const steps = ['Register', 'Attendee Details', 'Billing Details', 'Payment', 'Confirmation'];

  const stepsList = {
    0: <Register response={eventDetails} />,
    1: <AttendeeDetails />,
    2: <BillingDetails />,
    3: <Payment />,
    4: <Confirmation />,
  };

  return (
    <EventRegistrationLayout
      title={`Add Offline Registration`}
      steps={steps}
      steperMaxWidth={'700px'}
      activeStep={activeStep}
      showEventDetails={activeStep != finalStepNumber}
      loading={isEventLoading}
      eventDetails={eventDetails}
    >
      {stepsList[activeStep]}
    </EventRegistrationLayout>
  );
}
