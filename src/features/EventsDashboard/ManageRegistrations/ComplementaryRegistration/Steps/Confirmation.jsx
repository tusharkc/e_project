import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

import { DoctLoading, DoctModal, DoctPageLoading } from '@doct-react/app';
import { DoctForm } from '@doct-react/app';
import { DoctButton, DoctCol, DoctIcon, DoctRow, DoctTypography } from '@doct-react/core';

import { EventRegistrationLayoutFooter } from '../../../../../layout';

import {
  saveRemarks,
  selectAttendeeDetails,
  selectLoadingOrder,
  selectShowConfirmationModal,
  selectShowError,
  setActiveStep,
  setShowConfirmationPopup,
  setShowError,
} from '../complementaryRegistration.slice';

import { registerEvent } from '../complementaryRegistration.services';

import { REMARKS_LIMIT } from './stepsItems.constants';
import { FORM_NAMES_STEPS } from '../../../../../shared/ui/AttendeeForm/attendeeForm.constants';

export default function Confirmation() {
  const attendeeDetails = useSelector(selectAttendeeDetails);
  const loadingOrder = useSelector(selectLoadingOrder);
  const showConfirmationModal = useSelector(selectShowConfirmationModal);
  const showError = useSelector(selectShowError);
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowError(false));
    }, 2000);
  }, [showError]);

  const dispatch = useDispatch();

  return (
    <>
      {loadingOrder && (
        <div className="full-page-loader">
          <DoctPageLoading />
        </div>
      )}

      {showError && (
        <div className={`custom-toster custom-toster-failed`}>
          <div className="custom-toster-icon">
            <DoctIcon width="24" height="24" name={'exclamation'} />
          </div>
          Oops! something went wrong
        </div>
      )}

      <DoctTypography variant="h6" className="mb-3 mt-4">
        Summary
      </DoctTypography>
      <div className="selection-panel-container">
        <DoctRow>
          <DoctCol sm={6}>
            <div className="pr-sm-2">
              <div className="border-radius bg-semantic-info-01 p-4">
                <DoctTypography variant="subtitle3" className="my-0">
                  ADD REMARKS
                </DoctTypography>
                <DoctTypography variant="textLabel2" className="mt-2 mb-0 text-grey-600">
                  Example: Guest/ Invitee/ Senior citizen member/ speaker/ chairperson etc.
                </DoctTypography>
                <div className="doct-input">
                  <TextField
                    label={'Remarks *'}
                    inputProps={{
                      maxLength: REMARKS_LIMIT,
                    }}
                    fullWidth
                    onChange={(e) => {
                      if (remarks == '' && e.target.value == ' ') return;
                      setRemarks(e.target.value);
                    }}
                    error={false}
                    className="material-character-limit-input mt-3"
                    variant="standard"
                    value={remarks}
                    helperText={`${remarks.length} / ${REMARKS_LIMIT}`}
                  />
                </div>
              </div>
            </div>
          </DoctCol>
          <DoctCol sm={6}>
            <div className="pl-sm-2">
              <div className="paper-with-radius-shadow p-4">
                <DoctTypography className="mb-3 mt-0" variant="subtitle3">
                  ATTENDEE DETAILS
                </DoctTypography>
                <DoctTypography className="mb-1 mt-0" variant="textLabel2">
                  Full Name: {attendeeDetails?.[FORM_NAMES_STEPS.fullName]}
                </DoctTypography>
                <DoctTypography className="mb-1 mt-0" variant="textLabel2">
                  Gender: {attendeeDetails?.[FORM_NAMES_STEPS.gender]}
                </DoctTypography>
                <DoctTypography className="mb-1 mt-0" variant="textLabel2">
                  City: {attendeeDetails?.[FORM_NAMES_STEPS.city]?.label}
                </DoctTypography>
                <DoctTypography className="mb-1 mt-0" variant="textLabel2">
                  State: {attendeeDetails?.[FORM_NAMES_STEPS.state]?.label}
                </DoctTypography>
                <DoctTypography className="mb-1 mt-0" variant="textLabel2">
                  Country: {attendeeDetails?.[FORM_NAMES_STEPS.country]?.label}
                </DoctTypography>
                <DoctTypography className="mb-1 mt-0" variant="textLabel2">
                  Phone: ({attendeeDetails?.[FORM_NAMES_STEPS.mobileCountryCode]?.label})-
                  {attendeeDetails?.[FORM_NAMES_STEPS.mobileNumber]}
                </DoctTypography>
                <DoctTypography className="mb-1 mt-0" variant="textLabel2">
                  Email: {attendeeDetails?.[FORM_NAMES_STEPS.email]}
                </DoctTypography>
                {attendeeDetails?.[FORM_NAMES_STEPS.membershipID] && (
                  <DoctTypography className="mb-0 mt-0" variant="textLabel2">
                    Membership ID: {attendeeDetails?.[FORM_NAMES_STEPS.membershipID]}
                  </DoctTypography>
                )}
              </div>
            </div>
          </DoctCol>
        </DoctRow>
      </div>
      <EventRegistrationLayoutFooter>
        <DoctButton
          variant="outline"
          text="Back"
          className="ml-auto mr-12px"
          onButtonClickHandler={() => {
            dispatch(setActiveStep(1));
          }}
        />
        <DoctButton
          disabled={!remarks}
          text="Confirm Order"
          type="semantic-success"
          icon="check"
          iconPosition="right"
          onButtonClickHandler={() => {
            if (!remarks.trim()) return;
            dispatch(setShowConfirmationPopup(true));
            dispatch(saveRemarks(remarks));
          }}
        />
      </EventRegistrationLayoutFooter>
      <DoctModal
        iconName={''}
        primaryBtnText="Yes"
        secondaryBtnText="Go Back"
        open={showConfirmationModal}
        handlePrimaryButtonClick={() => {
          dispatch(registerEvent());
        }}
        handleClose={() => {
          dispatch(setShowConfirmationPopup(false));
        }}
        title={''}
        width={360}
        className="white-body-modal"
      >
        <div className="pt-2 px-2">
          <DoctTypography variant="h6" className="pr-4 ">
            Are you sure to confirm this order?
          </DoctTypography>
          <DoctTypography variant="body2" className="text-grey-600">
            On confirmation, attendee will get email notification of this order.
          </DoctTypography>
        </div>
      </DoctModal>
    </>
  );
}
