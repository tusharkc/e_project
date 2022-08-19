import React, { useState } from 'react';

import { DoctModal } from '@doct-react/app';
import { DoctButton, DoctTypography } from '@doct-react/core';
import { useSelector } from 'react-redux';
import { selectOnGoingPriceCategory } from '../../../offlineRegistration.slice';

export function PaymentItemList({ title, details, currency }) {
  return (
    <li className="border-bottom-1px border-bottom-primary-100 d-flex justify-content-between pt-12px pb-12px">
      <DoctTypography variant="textLabel2" className="text-grey-800 my-0">
        {title}
      </DoctTypography>
      <DoctTypography variant="textLabel2" className="text-grey-800 my-0">
        {currency || ''} {details}
      </DoctTypography>
    </li>
  );
}

export function AttendeeList({
  attendee,
  currency,
  attendee: { name, ticket } = {},
  setShowModal,
  setSelectedDetails,
}) {
  return (
    <li className="border-bottom-1px border-bottom-primary-100 py-2 d-flex align-items-center">
      <div>
        <DoctTypography variant="textLabel2" className="text-grey-600 my-0">
          {ticket?.name}
        </DoctTypography>
        <DoctTypography variant="textLabel1" className="text-grey-800 my-0">
          {name}{' '}
        </DoctTypography>
      </div>
      <DoctTypography variant="textLabel2" className="text-grey-600 my-0 ml-auto">
        {currency} {ticket?.price}{' '}
      </DoctTypography>
      <DoctButton
        variant="text"
        size="medium"
        text="View Details"
        className=""
        onButtonClickHandler={() => {
          setSelectedDetails(attendee);
          setShowModal(true);
        }}
      />
    </li>
  );
}

const AttendeeListContainer = React.memo(function AttendeeListContainer({
  attendeeDetails,
  currency,
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const onGoingPriceCategory = useSelector(selectOnGoingPriceCategory);

  return (
    <ul>
      {attendeeDetails?.map((attendee, index) => {
        return (
          <AttendeeList
            key={attendee?.name}
            attendee={attendee}
            currency={currency}
            setShowModal={setShowModal}
            setSelectedDetails={setSelectedDetails}
          />
        );
      })}
      <DoctModal
        iconName={''}
        primaryBtnText="Yes"
        secondaryBtnText="Go Back"
        open={showModal}
        handlePrimaryButtonClick={() => {}}
        handleClose={() => {
          setShowModal(false);
        }}
        title={selectedDetails?.ticket.name}
        width={572}
        showFooter={false}
      >
        <div className="bg-white overflow-hidden m-n3">
          <ul className="p-3">
            <li className="d-flex py-1 flex-column">
              <span className="d-flex w-100">
                <DoctTypography
                  variant="textLabel1"
                  className="view-details-modal-info text-grey-600 mr-4 my-0"
                >
                  {onGoingPriceCategory}:
                </DoctTypography>
                <DoctTypography variant="textLabel1" className="text-grey-800 mr-4 my-0">
                  {currency} {selectedDetails?.ticket?.price}
                </DoctTypography>
              </span>
            </li>
            <li className="d-flex py-1 flex-column">
              <div className="line-divider bg-grey-100 w-100 mt-0 mb-2"></div>
              <span className="d-flex w-100">
                <DoctTypography
                  variant="textLabel1"
                  className="view-details-modal-info text-grey-600 mr-4 my-0"
                >
                  Full Name:
                </DoctTypography>
                <DoctTypography variant="textLabel1" className="text-grey-800 mr-4 my-0">
                  {selectedDetails?.name}
                </DoctTypography>
              </span>
            </li>
            <li className="d-flex py-1">
              <DoctTypography
                variant="textLabel1"
                className="view-details-modal-info text-grey-600 mr-4 my-0"
              >
                City:
              </DoctTypography>
              <DoctTypography variant="textLabel1" className="text-grey-800 mr-4 my-0">
                {selectedDetails?.city}
              </DoctTypography>
            </li>
            <li className="d-flex py-1">
              <DoctTypography
                variant="textLabel1"
                className="view-details-modal-info text-grey-600 mr-4 my-0"
              >
                State:
              </DoctTypography>
              <DoctTypography variant="textLabel1" className="text-grey-800 mr-4 my-0">
                {selectedDetails?.state}
              </DoctTypography>
            </li>
            <li className="d-flex py-1">
              <DoctTypography
                variant="textLabel1"
                className="view-details-modal-info text-grey-600 mr-4 my-0"
              >
                Country:
              </DoctTypography>
              <DoctTypography variant="textLabel1" className="text-grey-800 mr-4 my-0">
                {selectedDetails?.country}
              </DoctTypography>
            </li>
            <li className="d-flex py-1  flex-column">
              <div className="line-divider bg-grey-100 w-100 mt-0 mb-2"></div>

              <span className="d-flex w-100">
                <DoctTypography
                  variant="textLabel1"
                  className="view-details-modal-info text-grey-600 mr-4 my-0"
                >
                  Phone:
                </DoctTypography>
                <DoctTypography variant="textLabel1" className="text-grey-800 mr-4 my-0">
                  {selectedDetails?.phoneNo?.countryCode} {selectedDetails?.phoneNo?.number}
                </DoctTypography>
              </span>
            </li>
            <li className="d-flex py-1">
              <DoctTypography
                variant="textLabel1"
                className="view-details-modal-info text-grey-600 mr-4 my-0"
              >
                Email:
              </DoctTypography>
              <DoctTypography variant="textLabel1" className="text-grey-800 mr-4 my-0">
                {selectedDetails?.emailId}
              </DoctTypography>
            </li>
            {selectedDetails?.memberId && (
              <li className="d-flex py-1  flex-column">
                <div className="line-divider bg-grey-100 w-100 mt-0 mb-2"></div>

                <span className="d-flex w-100">
                  <DoctTypography
                    variant="textLabel1"
                    className="view-details-modal-info text-grey-600 mr-4 my-0"
                  >
                    Membership ID:
                  </DoctTypography>
                  <DoctTypography variant="textLabel1" className="text-grey-800 mr-4 my-0">
                    {selectedDetails?.memberId}
                  </DoctTypography>
                </span>
              </li>
            )}
          </ul>
        </div>
      </DoctModal>
    </ul>
  );
});

export { AttendeeListContainer };
