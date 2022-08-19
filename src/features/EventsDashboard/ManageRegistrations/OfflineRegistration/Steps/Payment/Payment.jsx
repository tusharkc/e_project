import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import { DoctLoading, DoctPageLoading, DoctTermsOfService } from '@doct-react/app';
import { DoctButton, DoctCol, DoctIcon, DoctRow, DoctTypography } from '@doct-react/core';

import { AttendeeListContainer, PaymentItemList } from './components';
import { EventRegistrationLayoutFooter } from '../../../../../../layout';

import {
  saveRemarks,
  selectBillingDetailsValidated,
  selectEventDetails,
  selectLoadingOrder,
  selectLoadingValidateRegistration,
  selectShowError,
  setActiveStep,
  setShowError,
} from '../../offlineRegistration.slice';

import { registerEvent } from '../../offlineRegistration.services';

const MAX_LENGTH_REMARKS = 300;

export default function Payment() {
  const dispatch = useDispatch();

  const eventDetails = useSelector(selectEventDetails);
  const loadingValidateRegistration = useSelector(selectLoadingValidateRegistration);
  const attendeesBillingDetailsValidated = useSelector(selectBillingDetailsValidated);
  const loadingOrder = useSelector(selectLoadingOrder);
  const showError = useSelector(selectShowError);

  const { attendees, amount: { grossAmount, convenienceFee, tax, currency, totalAmount } = {} } =
    attendeesBillingDetailsValidated || {};

  // useEffect(() => {
  //   if (!eventDetails?.id) return;
  //   dispatch(validateRegistration());
  // }, [eventDetails]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowError(false));
    }, 2000);
  }, [showError]);

  const [isCheckedTCandDisclaimer, setIsCheckedTCandDisclaimer] = useState(false);

  const [remarks, setRemarks] = useState('');
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  return (
    <>
      {loadingOrder && (
        <div className="full-page-loader">
          <DoctPageLoading />
        </div>
      )}
      <DoctTypography variant="h6" className="mb-3 mt-4">
        Order summary
      </DoctTypography>
      <DoctRow>
        <DoctCol sm={6}>
          <div className="mb-3 bg-semantic-info-01 p-4 mr-2 border-radius">
            <DoctTypography variant="subtitle3" className="my-0" fontWeight="medium">
              ADD PAYMENT REMARKS
            </DoctTypography>
            <DoctTypography variant="textLabel2" className="my-0 text-grey-600 mt-2">
              Details of Payment method, bank cheque number, discount reference etc.{' '}
            </DoctTypography>
            <div className="doct-input">
              <TextField
                label={'Remarks *'}
                inputProps={{
                  maxLength: MAX_LENGTH_REMARKS,
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
                helperText={`${remarks.length} / ${MAX_LENGTH_REMARKS}`}
              />
            </div>
          </div>
          <div className=" bg-white border-radius box-shadow px-4 py-4 mr-2">
            <DoctTypography variant="subtitle3" className="mt-0 mb-3">
              ATTENDEES
            </DoctTypography>
            {loadingValidateRegistration ? (
              <DoctLoading />
            ) : (
              <AttendeeListContainer attendeeDetails={attendees} currency={currency} />
            )}
          </div>
        </DoctCol>
        <DoctCol sm={6}>
          <div className="bg-grey-100 border-radius border-1px border-white box-shadow px-4 ml-2">
            <ul className="last-child-no-border">
              <PaymentItemList title={'GROSS AMOUNT'} details={grossAmount} currency={currency} />
              <PaymentItemList
                title={'CONVENIENCE FEE'}
                details={convenienceFee ? convenienceFee : 0}
                currency={convenienceFee ? currency : null}
              />
              <PaymentItemList title={'TAXATION: GST(18%)'} details={tax} currency={currency} />
            </ul>
            <span className="d-flex justify-content-between align-items-center bg-white mx-n4 panel-height-5x px-4">
              <DoctTypography
                variant="textLabel1"
                className="text-grey-800 my-0"
                fontWeight="medium"
              >
                Total Amount
              </DoctTypography>
              <DoctTypography variant="textLabel1" className="text-grey-800 my-0">
                {currency} {totalAmount || ''}
              </DoctTypography>
            </span>
            <div className="d-flex align-items-center pt-1 pb-1">
              <Checkbox
                id="test"
                classes={{ root: 'doct-checkbox ml-n2' }}
                onChange={(e) => setIsCheckedTCandDisclaimer(e?.target?.checked)}
              ></Checkbox>
              <label htmlFor="test" className="d-flex cursor-pointer">
                <DoctTypography variant="caption1">
                  I agree to the docthub.com
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setTermsModalOpen(true);
                    }}
                  >
                    <span className="text-primary"> Terms & Conditions</span> and
                    <span className="text-primary"> Disclaimer.</span>
                  </span>
                </DoctTypography>
              </label>
            </div>
          </div>
        </DoctCol>
      </DoctRow>
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
            dispatch(setActiveStep(2));
          }}
        />
        <DoctButton
          disabled={!isCheckedTCandDisclaimer || !remarks}
          text="Proceed to Pay"
          className=""
          icon="right"
          iconPosition="right"
          type="semantic-success"
          onButtonClickHandler={() => {
            dispatch(saveRemarks({ remarks }));
            dispatch(registerEvent());
            // dispatch(prepareListOfAttendees());
          }}
        />
      </EventRegistrationLayoutFooter>
      {showError && (
        <div className={`custom-toster custom-toster-failed`}>
          <div className="custom-toster-icon">
            <DoctIcon width="24" height="24" name={'exclamation'} />
          </div>
          Oops! something went wrong
        </div>
      )}
      <DoctTermsOfService open={termsModalOpen} handleClose={() => setTermsModalOpen(false)} />
    </>
  );
}
