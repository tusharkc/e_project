import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DoctButton, DoctContainer, DoctIcon, DoctTypography } from '@doct-react/core';

import { EventRegistrationLayoutFooter } from '../../../../../../layout';

import AttendeeDetailsWithForm from './AttendeeDetailsWithForm/AttendeeDetailsWithForm';

import {
  handleAccordionIndex,
  onRemoveAttendee,
  saveAttendeeDetail,
  selectAmount,
  selectExpandedAccordionIndex,
  selectListOfAttendees,
  selectLoadingTotalAmount,
  selectOnGoingPriceCategory,
  setActiveStep,
} from '../../offlineRegistration.slice';
import { fetchRegistrationAmount } from '../../offlineRegistration.services';

function useSavedFormCounter() {
  const listOfAttendees = useSelector(selectListOfAttendees);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const count = listOfAttendees.reduce((prevVal, nextVal) => {
      let counter = prevVal;
      if (nextVal.details) {
        counter += 1;
      }
      return counter;
    }, 0);
    setCount(count);
  }, [listOfAttendees]);

  return { count };
}

export default function AttendeeDetails() {
  const dispatch = useDispatch();

  const listOfAttendees = useSelector(selectListOfAttendees);
  const expandedAccordionIndex = useSelector(selectExpandedAccordionIndex);

  const loadingTotalAmount = useSelector(selectLoadingTotalAmount);
  const { totalAmount, currency } = useSelector(selectAmount);

  const { count } = useSavedFormCounter();

  const [showAlertOneAttendee, setShowAlertOneAttendee] = useState(false);

  const onRemove = (obj) => {
    if (listOfAttendees?.length == 1) {
      setShowAlertOneAttendee(true);
      return;
    }
    dispatch(onRemoveAttendee(obj));
    dispatch(fetchRegistrationAmount());
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAlertOneAttendee(false);
    }, 3000);
  }, [showAlertOneAttendee]);

  const onSaveAttendeeDetails = (obj) => {
    dispatch(saveAttendeeDetail(obj));
  };

  const onHandleAccordionIndex = (index) => {
    dispatch(handleAccordionIndex(index));
  };

  const isAnyAccordionExpanded =
    expandedAccordionIndex == null
      ? false
      : count != listOfAttendees?.length || expandedAccordionIndex + 1 <= listOfAttendees?.length;

  return (
    <DoctContainer>
      <div className="d-flex mb-3 mt-4 align-items-center">
        <DoctTypography variant="h6" className="my-0">
          Fill attendee details
        </DoctTypography>
        <DoctTypography variant="textLabel2" className="my-0 ml-auto text-grey-600">
          {count} OUT OF {listOfAttendees?.length} SAVED!
        </DoctTypography>
      </div>
      {listOfAttendees?.length > 0 &&
        listOfAttendees.map((ticket, index) => {
          return (
            <AttendeeDetailsWithForm
              totalForm={listOfAttendees?.length}
              key={index}
              index={index}
              ticket={ticket}
              onRemove={onRemove}
              onSaveAttendeeDetails={onSaveAttendeeDetails}
              expanded={expandedAccordionIndex == index}
              onHandleAccordionIndex={onHandleAccordionIndex}
              count={count}
              totalAttendeesLength={listOfAttendees?.length}
              isAnyAccordionExpanded={isAnyAccordionExpanded}
              showAlertOneAttendee={showAlertOneAttendee}
            />
          );
        })}
      <EventRegistrationLayoutFooter>
        <DoctTypography variant="textLabel1" fontWeight="medium">
          Total Amount:{' '}
        </DoctTypography>
        <DoctTypography variant="textLabel1" className="pl-1">
          {currency} {totalAmount}
        </DoctTypography>
        <DoctButton
          text="Back"
          variant="outline"
          className="ml-auto mr-2"
          onButtonClickHandler={() => {
            dispatch(setActiveStep(0));
          }}
        />
        <DoctButton
          disabled={isAnyAccordionExpanded}
          text="Continue"
          onButtonClickHandler={() => {
            dispatch(setActiveStep(2));
          }}
        />
      </EventRegistrationLayoutFooter>
      {showAlertOneAttendee && (
        <div className={`custom-toster custom-toster-failed`}>
          <div className="custom-toster-icon">
            <DoctIcon width="24" height="24" name={'exclamation'} />
          </div>
          You must keep at least one attendee
        </div>
      )}
    </DoctContainer>
  );
}
