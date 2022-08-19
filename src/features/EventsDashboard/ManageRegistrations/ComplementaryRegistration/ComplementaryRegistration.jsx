import { useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { EventRegistrationLayout } from '../../../../layout';
import { SelectTicket, Confirmation, Finish, AttendeeDetails } from './Steps';

import {
  selectActiveStep,
  selectEventDetails,
  setDefaultState,
} from './complementaryRegistration.slice';

import { fetchEventDetails } from '../manageRegistration.services';

import './ComplementaryRegistration.scss';

export default function ComplementaryRegistration() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(setDefaultState());
  }, []);

  const { code } = useParams();

  useEffect(() => {
    dispatch(fetchEventDetails(code));
  }, [code]);

  const eventDetails = useSelector(selectEventDetails);

  const activeStep = useSelector(selectActiveStep);

  const steps = ['Select Tickets', 'Attendee Details', 'Confirmation', 'Finish'];

  const stepsList = {
    0: <SelectTicket response={eventDetails} />,
    1: <AttendeeDetails />,
    2: <Confirmation />,
    3: <Finish />,
  };

  return (
    <EventRegistrationLayout
      title={`Add Complimentary Registration`}
      steps={steps}
      steperMaxWidth={'600px'}
      activeStep={activeStep}
      eventDetails={eventDetails}
      showEventDetails={activeStep != 3}
    >
      {stepsList[activeStep]}
    </EventRegistrationLayout>
  );
}
