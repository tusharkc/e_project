import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { DoctButton, DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { EventRegistrationLayoutFooter } from '../../../../../layout';

import { selectOrderDetails } from '../complementaryRegistration.slice';

import { MANAGE_EVENTS_REGISTRATION } from '../../../../../routes/constant';
import { DateStatus } from '../../../../../shared';
import useQueryHooks from '../../../../../hooks/useQueryHooks';

function StatusPage({ paymentStatus = 'success' }) {
  const orderDetails = useSelector(selectOrderDetails);

  const {
    orderNumber,
    attendees = [],
    remarks,
    event: { startDate, endDate, type, name, venueAddress, city, state, country, organizer } = {},
  } = orderDetails || {};

  const {
    title,
    name: attendeesName,
    gender,
    city: attendeesCity,
    state: attendeesState,
    country: attendeesCountry,
    phoneNo,
    email,
    memberId,
  } = attendees[0] || {};

  const { id, code } = useQueryHooks();

  return (
    <div className="selection-panel-container">
      <p className="d-flex mb-3 mt-0 pt-4">
        <CheckCircleIcon className="success-icon vertical-align-bottom mr-1 text-success" />
        <DoctTypography variant="h6">Order placed successfully</DoctTypography>
      </p>
      <div className="paper-with-radius-shadow p-4">
        <div className="d-flex">
          <DateStatus
            startDate={startDate}
            endDate={endDate}
            paymentStatus="success"
            className={`date-status-box-status-${paymentStatus.toLowerCase()}`}
          />
          <div className="pl-4">
            <DoctTypography variant="overline" className="text-primary mb-1">
              {type}
            </DoctTypography>
            <DoctTypography variant="subtitle1" className="my-0">
              {name}
            </DoctTypography>
            <DoctTypography variant="textLabel2" className="my-0 text-grey-600">
              {venueAddress}
              {city?.name && `, ${city?.name}`}
              {state?.name && `, ${state?.name}`}
              {country?.name && `, ${country?.name}`}
            </DoctTypography>
            <DoctTypography variant="textLabel2" className="my-0 text-grey-600">
              {organizer?.name}
            </DoctTypography>
          </div>
        </div>
        <div className="line-divider bg-grey-200 mt-3 mb-4"></div>
        <DoctRow>
          <DoctCol sm={6}>
            <DoctTypography variant="textLabel2" className="text-grey-600 mt-0">
              Order ID: {orderNumber}
            </DoctTypography>
            <DoctTypography variant="subtitle2" className="mb-3">
              Attendee Details
            </DoctTypography>
            <DoctTypography className="mb-1 mt-0" variant="textLabel2">
              Full Name: {title} {attendeesName}
            </DoctTypography>
            <DoctTypography className="mb-1 mt-0" variant="textLabel2">
              Gender: {gender}
            </DoctTypography>
            <DoctTypography className="mb-1 mt-0" variant="textLabel2">
              City: {attendeesCity}
            </DoctTypography>
            <DoctTypography className="mb-1 mt-0" variant="textLabel2">
              State: {attendeesState}
            </DoctTypography>
            <DoctTypography className="mb-1 mt-0" variant="textLabel2">
              Country: {attendeesCountry}
            </DoctTypography>
            <DoctTypography className="mb-1 mt-0" variant="textLabel2">
              Phone: {phoneNo}
            </DoctTypography>
            <DoctTypography className="mb-1 mt-0" variant="textLabel2">
              Email: {email}
            </DoctTypography>
            {memberId && (
              <DoctTypography className="mb-0 mt-0" variant="textLabel2">
                Membership ID: {memberId}
              </DoctTypography>
            )}
          </DoctCol>
          <DoctCol sm={6}>
            <DoctTypography variant="subtitle2" className="mb-3 mt-0">
              Remarks
            </DoctTypography>
            <DoctTypography className="mb-0 mt-0" variant="textLabel2">
              {remarks}
            </DoctTypography>
          </DoctCol>
        </DoctRow>
      </div>
      <EventRegistrationLayoutFooter className="bg-success-16">
        <DoctTypography
          variant="subtitle2"
          className="text-success my-0 d-flex flex-column justify-content-center pt-2"
        >
          Great! Your registration is completed.
          <DoctTypography variant="textLabel1" className="text-grey-600 my-0">
            Will get confirmation on registered Email address.
          </DoctTypography>
        </DoctTypography>

        <Link
          to={`${MANAGE_EVENTS_REGISTRATION}?id=${id || ''}&code=${code || ''}`}
          className="ml-auto"
        >
          <DoctButton text="Close" type="inverse" onButtonClickHandler={() => {}} />
        </Link>
      </EventRegistrationLayoutFooter>
    </div>
  );
}

export default function Finish() {
  return <StatusPage />;
}
