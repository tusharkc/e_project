import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { DoctButton, DoctCol, DoctContainer, DoctRow, DoctTypography } from '@doct-react/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { EventRegistrationLayoutFooter } from '../../../../../../layout';
import { DateStatus } from '../../../../../../shared';
import { BillingInfo, Heading, InfoList, InfoListContainer } from './UiComponent.Confirmation';

import { selectOrderDetails } from '../../offlineRegistration.slice';

import { MANAGE_EVENTS_REGISTRATION } from '../../../../../../routes/constant';
import useQueryHooks from '../../../../../../hooks/useQueryHooks';

export default function Confirmation({ paymentStatus = 'success' }) {
  const orderDetails = useSelector(selectOrderDetails);

  const { id, code } = useQueryHooks();

  const {
    orderNumber,
    attendees,
    billingInfo,
    currency,
    grossAmount,
    discountAmount,
    convenienceFee,
    taxAmount,
    totalAmount,
    event: { startDate, endDate, type, name, venueAddress, city, state, country, organizer } = {},
  } = orderDetails || {};
  return (
    <>
      <DoctContainer>
        <DoctTypography variant="h6" className="mb-3 pt-4">
          <CheckCircleIcon className="success-icon vertical-align-bottom mr-1 text-success" />
          Order placed successfully
        </DoctTypography>
        <div className="bg-white border-radius box-shadow mt-3 p-4">
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
          <div className="line-divider bg-low-opacity-black mt-3 mb-4"></div>
          <DoctRow>
            <DoctCol sm={6}>
              <div className="pr-5">
                <DoctTypography variant="textLabel2" className="text-grey-600 mt-0">
                  Order ID: {orderNumber}
                </DoctTypography>
                <Heading title={'Attendees info'} />
                {attendees?.length && (
                  <ul>
                    <InfoListContainer attendees={attendees} />
                  </ul>
                )}
                <Heading title={'Billing info'} className={'mt-3'} />
                <ul>
                  <BillingInfo billingInfo={billingInfo} />
                </ul>
              </div>
            </DoctCol>
            <DoctCol sm={6}>
              <div className="pl-5">
                <Heading title={'Payment info'} />
                <ul>
                  <InfoList
                    title="GROSS AMOUNT"
                    info={`${currency} ${grossAmount}`}
                    classes={{ root: 'text-uppercase' }}
                  />
                  <InfoList
                    title="CONVENIENCE FEE"
                    info={`${currency} ${convenienceFee}`}
                    classes={{ root: 'text-uppercase' }}
                  />
                  <InfoList
                    title="TAXATION: GST(18%)"
                    info={`${currency} ${taxAmount}`}
                    classes={{ root: 'text-uppercase' }}
                  />
                  <InfoList
                    title="Total Amount"
                    info={`${currency} ${totalAmount}`}
                    classes={{
                      root: 'border-top-1px border-bottom-1px border-low-opacity-black py-2',
                      title: 'font-weight-medium text-grey-800',
                      info: 'text-grey-800',
                    }}
                  />
                  <InfoList
                    title="PAYMENT STATUS"
                    info="Confirmed"
                    classes={{
                      info: 'text-success',
                    }}
                  />
                </ul>
              </div>
            </DoctCol>
          </DoctRow>
        </div>
      </DoctContainer>
      <EventRegistrationLayoutFooter className="bg-position-low-opacity">
        <DoctTypography
          variant="subtitle2"
          className="text-success my-0 d-flex flex-column justify-content-center pt-2"
        >
          Offline registration done successfully.
        </DoctTypography>
        <Link
          to={`${MANAGE_EVENTS_REGISTRATION}?id=${id || ''}&code=${code || ''}`}
          className="ml-auto"
        >
          <DoctButton
            type="inverse"
            className="ml-auto"
            text="Close"
            onButtonClickHandler={() => {
              // dispatch(setActiveStep(3));
            }}
          />
        </Link>
      </EventRegistrationLayoutFooter>
    </>
  );
}
