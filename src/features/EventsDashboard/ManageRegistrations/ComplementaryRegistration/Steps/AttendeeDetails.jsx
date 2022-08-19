import { useEffect, useState } from 'react';

import { DoctForm } from '@doct-react/app';
import { DoctButton, DoctTypography } from '@doct-react/core';
import { useDispatch, useSelector } from 'react-redux';

import { EventRegistrationLayoutFooter } from '../../../../../layout';
import { AttendeeForm } from '../../../../../shared';

import {
  saveAttendeeDetails,
  selectAttendeeDetails,
  selectOnGoingPriceCategory,
  selectSelectedTickets,
  setActiveStep,
} from '../complementaryRegistration.slice';

const attendeeDefaultValue = {
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

export default function AttendeeDetails() {
  const selectedTickets = useSelector(selectSelectedTickets);
  const onGoingPriceCategory = useSelector(selectOnGoingPriceCategory);
  const attendeeDetails = useSelector(selectAttendeeDetails);

  const [activePriceTypeOfSelectedTicket, setActivePriceTypeOfSelectedTicket] = useState({});
  const { handleSubmit, control, errors, formState, reset, touched, watch, setValue, clearErrors } =
    DoctForm({
      mode: 'onChange',
      defaultValues: attendeeDefaultValue,
    });

  useEffect(() => {
    reset({ ...attendeeDefaultValue, ...attendeeDetails });
  }, []);

  useEffect(() => {
    const findOnGoingPriceOfSelectedTicket = selectedTickets?.prices?.find(({ category }) => {
      return category == onGoingPriceCategory;
    });

    setActivePriceTypeOfSelectedTicket(findOnGoingPriceOfSelectedTicket);
  }, [onGoingPriceCategory]);

  const handleFormSubmit = handleSubmit((values) => {
    dispatch(saveAttendeeDetails(values));
    dispatch(setActiveStep(2));
  });

  const dispatch = useDispatch();

  return (
    <>
      <DoctTypography variant="h6" className="mb-3 mt-4">
        Fill attendee details
      </DoctTypography>
      <div className="selection-panel-container">
        <div className="bg-grey-100 registration-form-box border-radius box-shadow">
          <DoctTypography variant="subtitle2" className="my-0">
            {selectedTickets?.name} Attendee
          </DoctTypography>
          <DoctTypography variant="textLabel2" className="my-0 text-grey-600 text-uppercase">
            {activePriceTypeOfSelectedTicket?.category}: {selectedTickets?.currency}{' '}
            {activePriceTypeOfSelectedTicket?.amount}
          </DoctTypography>
          <div className="line-divider bg-grey-200 mt-3 registration-form-gap-bottom"></div>
          <form onSubmit={handleFormSubmit}>
            <AttendeeForm
              control={control}
              errors={errors}
              touched={touched}
              watch={watch}
              setValue={setValue}
              clearErrors={clearErrors}
              savedValue={attendeeDetails}
            />
          </form>
        </div>
      </div>

      <EventRegistrationLayoutFooter>
        <DoctButton
          variant="outline"
          text="Back"
          className="ml-auto mr-12px"
          onButtonClickHandler={() => {
            dispatch(setActiveStep(0));
          }}
        />
        <DoctButton
          icon="right"
          iconPosition="right"
          text="Continue"
          onButtonClickHandler={() => {
            handleFormSubmit();
          }}
        />
      </EventRegistrationLayoutFooter>
    </>
  );
}
