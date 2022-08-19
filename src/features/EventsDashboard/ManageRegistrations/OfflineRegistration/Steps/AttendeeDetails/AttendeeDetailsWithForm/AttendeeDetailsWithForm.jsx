import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { DoctActionMenu, DoctForm } from '@doct-react/app';
import { DoctButton, DoctCol, DoctRow, DoctTypography } from '@doct-react/core';

import { AttendeeForm } from '../../../../../../../shared';

import useAttendeeAccordionUiState from './useAttendeeAccordionUiState';

import './AttendeeDetailsWithForm.scss';
import {
  selectLoadingTotalAmount,
  selectOnGoingPriceCategory,
} from '../../../offlineRegistration.slice';
import { useSelector } from 'react-redux';

import StatusCompleted from '../../../../../../../assets/icons/StatusCompleted.svg';
import StatusInPending from '../../../../../../../assets/icons/StatusInPending.svg';
import StatusProgress from '../../../../../../../assets/icons/StatusProgress.svg';

const options = [
  {
    title: 'Remove this Attendee',
  },
];

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

function FilledDetails({ details }) {
  const { name, mobileCountryCode, mobileNumber, city, state, country, emailId, membershipID } =
    details;

  return (
    <div className="mt-3 d-flex flex-column">
      <div className="d-flex align-items-center">
        <DoctTypography
          variant="subtitle2"
          className="my-0 attendee_details_with_form_detail_info  mr-3"
        >
          {name}
        </DoctTypography>
        <DoctTypography variant="textLabel1" className="my-0 text-grey-600">
          Phone: {mobileCountryCode?.label} {mobileNumber}
        </DoctTypography>
      </div>
      <div className="d-flex align-items-center">
        <DoctTypography
          variant="textLabel1"
          className="my-0 attendee_details_with_form_detail_info mr-3"
        >
          Location: {city?.label}, {state?.label}, {country?.label}
        </DoctTypography>
        <DoctTypography
          variant="textLabel1"
          className="attendee_details_with_form_detail_info my-0 text-grey-600"
        >
          Email: {emailId}
        </DoctTypography>
        <DoctTypography
          variant="textLabel1"
          className="attendee_details_with_form_detail_info my-0 text-grey-600"
        >
          {membershipID && `Membership ID: ${membershipID}`}
        </DoctTypography>
      </div>
    </div>
  );
}

export default function AttendeeDetailsWithForm({
  expanded,
  ticket = {},
  onRemove,
  onSaveAttendeeDetails,
  onHandleAccordionIndex,
  index,
  totalForm,
  count,
  totalAttendeesLength,
  isAnyAccordionExpanded,
  showAlertOneAttendee,
}) {
  const {
    title,
    id,
    details = {},
    uid,
    ticketsOfAttendee,
    ticketsOfAttendee: { currency },
  } = ticket;

  const { handleSubmit, control, errors, formState, reset, touched, watch, setValue, clearErrors } =
    DoctForm({
      mode: 'onChange',
      defaultValues: attendeeDefaultValue,
    });

  useEffect(() => {
    setTimeout(() => {
      reset({ ...attendeeDefaultValue, ...details });
    }, 300);
  }, [expanded, totalForm]);

  useEffect(() => {
    if (showAlertOneAttendee) reset({ ...attendeeDefaultValue, ...details });
  }, [showAlertOneAttendee]);

  const { classList } = useAttendeeAccordionUiState(expanded, details);

  const onGoingPriceCategory = useSelector(selectOnGoingPriceCategory);

  const [activePriceTypeOfSelectedTicket, setActivePriceTypeOfSelectedTicket] = useState({});

  useEffect(() => {
    const findOnGoingPriceOfSelectedTicket = ticketsOfAttendee?.prices?.find(({ category }) => {
      return category == onGoingPriceCategory;
    });

    setActivePriceTypeOfSelectedTicket(findOnGoingPriceOfSelectedTicket);
  }, [onGoingPriceCategory]);

  const handleFormSubmit = handleSubmit((values) => {
    onSaveAttendeeDetails({ title, values, uid });
    onHandleAccordionIndex();
  });

  return (
    <div className={classList?.join(' ')}>
      <Accordion expanded={expanded} TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          className="pointer-event-none"
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <img
            src={StatusCompleted}
            alt="status icon"
            className="attendee_details_with_form_status_icon attendee_details_with_form_status_icon_completed position-absolute"
          />
          <img
            src={StatusInPending}
            alt="status icon"
            className="attendee_details_with_form_status_icon attendee_details_with_form_status_icon_pending position-absolute"
          />
          <img
            src={StatusProgress}
            alt="status icon"
            className="attendee_details_with_form_status_icon attendee_details_with_form_status_icon_progress position-absolute"
          />
          <div className="mr-auto">
            <div className="d-flex flex-column justify-content-center">
              <DoctTypography variant="subtitle2" className="my-0">
                {title}
              </DoctTypography>
              <DoctTypography variant="textLabel2" className="my-0 text-grey-600 text-uppercase">
                {activePriceTypeOfSelectedTicket?.category}: {currency}{' '}
                {activePriceTypeOfSelectedTicket?.amount}
              </DoctTypography>
            </div>
            {Object.keys(details).length > 0 && <FilledDetails details={details} />}
          </div>
          {!expanded && !isAnyAccordionExpanded && (
            <DoctButton
              variant="outline"
              text="Edit"
              size="medium"
              className="ml-auto align-self-top pointer-event-initial"
              onButtonClickHandler={() => {
                onHandleAccordionIndex({ isEditForm: true, index });
              }}
            />
          )}
          <span
            className={`action-menu align-self-top pointer-event-initial ${
              expanded ? 'ml-auto' : 'ml-2'
            }`}
          >
            <DoctActionMenu
              options={options}
              className="rotate90-icon action-menu-icon-wrapper"
              onClick={(item) => {
                if (item.title == 'Remove this Attendee') {
                  onRemove({ title, id });
                  reset({});
                }
              }}
            />
          </span>
        </AccordionSummary>

        <AccordionDetails>
          <div className="mt-4">
            <form onSubmit={handleFormSubmit}>
              <AttendeeForm
                control={control}
                errors={errors}
                touched={touched}
                watch={watch}
                clearErrors={clearErrors}
                setValue={setValue}
                savedValue={details}
              />
            </form>
            <DoctRow>
              <DoctCol xs={6} className="mx-auto">
                <DoctButton
                  variant="contained"
                  text="Save"
                  size="medium"
                  type="semantic-success"
                  className="ml-auto"
                  onButtonClickHandler={() => {
                    handleFormSubmit();
                  }}
                />
              </DoctCol>
            </DoctRow>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
