import { DoctAutoComplete, DoctChip, DoctLoading, DoctTextField } from '@doct-react/app';
import { DoctButton, DoctCol, DoctIcon, DoctRow, DoctTypography } from '@doct-react/core';
import { useDispatch, useSelector } from 'react-redux';
import './PreviewPublish.scss';
import { FixedPanel, Tost } from '../../../../../../shared/ui';
import * as ROUTE from '../../../../../../routes/constant';
import {
  selectBasicInfoDetails,
  selectCreateEventResponse,
  selectCurrentStep,
  selectLoading,
  selectPaymentAndInvoice,
  selectRegistartionDetails,
  selectScheduleAndSpeakersDetails,
  selectShowError,
  selectStepBlocked,
  selectTermsAndPoliciesDetails,
  selectTicketsDetails,
  setCurrentStep,
  setShowError,
} from '../../../createEvent.slice';
import { FormHeading, StepTitle } from '../../UiHelper';
import stepsName from '../stepsName';
import useFormPreviewPublish from './Form.PreviewPublish';
import PreviewPublishCard from './components/PreviewPublishCard';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { scheduleFromStartDateEndDate } from '../../../../../../helper/helperFunction';

export default function PreviewPublish() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const registrationResponse = useSelector(selectRegistartionDetails);
  const [responseRecords, setResponseRecords] = useState([]);
  const [erorFormSubmit, setErrorFormSubmit] = useState(null);
  const [showTost, setShowTost] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const loading = useSelector(selectLoading);
  const [totalDayCount, seTotalDayCount] = useState([]);

  const BasicInfoDetails = useSelector(selectBasicInfoDetails);
  const registartionDetails = useSelector(selectRegistartionDetails);
  const tickets = useSelector(selectTicketsDetails);
  const schedules = useSelector(selectScheduleAndSpeakersDetails);
  const paymentsAndInvoice = useSelector(selectPaymentAndInvoice);
  const teamsAndPolicies = useSelector(selectTermsAndPoliciesDetails);

  useEffect(() => {
    if (Object.keys(registrationResponse).length) {
      if (registrationResponse?.CoverImageFile) {
        setCoverImage(window.URL.createObjectURL(registrationResponse.CoverImageFile));
      }
    }
  }, [Object.keys(registrationResponse).length]);

  useEffect(() => {
    const newResponseArray = [];
    if (Object.keys(apiResponseData).length) {
      newResponseArray.push(apiResponseData);
      const prepareDateArray = scheduleFromStartDateEndDate(
        apiResponseData.startDate,
        apiResponseData.endDate,
      );
      seTotalDayCount(prepareDateArray);
    }
    setResponseRecords(newResponseArray);
  }, [Object.keys(apiResponseData).length]);

  const { handleFormSubmit } = useFormPreviewPublish();
  const [publishBtnClick, setPublishBtnClick] = useState(false);

  const showError = useSelector(selectShowError);
  const stepBlocked = useSelector(selectStepBlocked);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowError(false));
    }, 2000);
  }, [showError]);

  useEffect(() => {
    if (showTost) {
      setTimeout(() => {
        onTostCloseHandler();
      }, 2000);
    }
  }, [showTost]);

  const onTostCloseHandler = () => {
    setShowTost(false);
    setErrorFormSubmit(null);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {showError && (
          <div className="position-fixed tost-container">
            <Tost
              variant={'error'}
              text={erorFormSubmit?.Title || 'Oops! something went wrong'}
              onPressedClose={onTostCloseHandler}
            />
          </div>
        )}
        {responseRecords?.length == 0 && (
          <div className="absolute-center loader-transparent-bg pointer-event-none inside-modal-loader">
            <DoctLoading />
          </div>
        )}
        {publishBtnClick == false ? (
          <DoctRow>
            {responseRecords?.map((item) => {
              return (
                <>
                  <DoctCol xs={3} className="mx-auto">
                    <StepTitle>{stepsName.previewAndPublish.label}</StepTitle>
                    <div className="d-flex column_gap_between_chips_item">
                      <DoctChip title={item.type} showCloseIcon={false} />
                      <DoctChip
                        title={`${item.eventPaymentType} Event`}
                        className="ml-2"
                        showCloseIcon={false}
                      />
                      <DoctChip title={'Partnered Event'} showCloseIcon={false} />
                    </div>
                    <div className="d-flex column_gap_between_chips_item mt-1">
                      <DoctChip
                        title={`${item.schedules?.length || totalDayCount?.length} Days event`}
                        showCloseIcon={false}
                      />
                      <DoctChip title={'Indian + Foreign Registration'} showCloseIcon={false} />
                    </div>
                    <DoctTypography variant="body2" className="text-grey-600">
                      Confirm all the information.
                    </DoctTypography>
                    <div className="d-flex">
                      <DoctIcon
                        name={
                          item?.eventPaymentType || BasicInfoDetails?.Type
                            ? 'roundDone'
                            : 'exclamation'
                        }
                        fill={
                          item?.eventPaymentType || BasicInfoDetails?.Type ? '#00C752' : '#AAAAAA'
                        }
                        className={
                          item?.eventPaymentType || BasicInfoDetails?.Type
                            ? 'icon_done'
                            : 'icon_exclamation'
                        }
                      ></DoctIcon>
                      <DoctTypography
                        className={
                          item?.eventPaymentType || BasicInfoDetails?.Type
                            ? 'text-grey-400 mt-0 px-1'
                            : 'text-grey-800 mt-0 px-1'
                        }
                        variant="textLabel1"
                      >
                        Basic Info
                      </DoctTypography>
                    </div>
                    <div className="d-flex">
                      <DoctIcon
                        name={item?.name || registartionDetails?.name ? 'roundDone' : 'exclamation'}
                        fill={item?.name || registartionDetails?.name ? '#00C752' : '#AAAAAA'}
                        className={
                          item?.name || registartionDetails?.name ? 'icon_done' : 'icon_exclamation'
                        }
                      ></DoctIcon>
                      <DoctTypography
                        className={
                          item?.name || registartionDetails?.name
                            ? 'text-grey-400 mt-0 px-1'
                            : 'text-grey-400 mt-0 px-1'
                        }
                        variant="textLabel1"
                      >
                        Registration info
                      </DoctTypography>
                    </div>
                    <div className="d-flex">
                      <DoctIcon
                        name={
                          item?.organizer?.organizingTeam?.length ||
                          registartionDetails?.Organizer?.OrganizingTeam?.length
                            ? 'roundDone'
                            : 'exclamation'
                        }
                        fill={
                          item?.organizer?.organizingTeam?.length ||
                          registartionDetails?.Organizer?.OrganizingTeam?.length
                            ? '#00C752'
                            : '#AAAAAA'
                        }
                        className={
                          item?.organizer?.organizingTeam?.length ||
                          registartionDetails?.Organizer?.OrganizingTeam?.length
                            ? 'icon_done'
                            : 'icon_exclamation'
                        }
                      ></DoctIcon>
                      <DoctTypography
                        className={
                          item?.organizer?.organizingTeam?.length ||
                          registartionDetails?.Organizer?.OrganizingTeam?.length
                            ? 'text-grey-400 mt-0 px-1'
                            : 'text-grey-800 mt-0 px-1'
                        }
                        variant="textLabel1"
                      >
                        Organizer info
                      </DoctTypography>
                    </div>
                    <div className="d-flex">
                      <DoctIcon
                        name={
                          item?.contactInformation?.personName ||
                          registartionDetails?.ContactInformation?.personName
                            ? 'roundDone'
                            : 'exclamation'
                        }
                        fill={
                          item?.contactInformation?.personName ||
                          registartionDetails?.ContactInformation?.personName
                            ? '#00C752'
                            : '#AAAAAA'
                        }
                        className={
                          item?.contactInformation?.personName ||
                          registartionDetails?.ContactInformation?.personName
                            ? 'icon_done'
                            : 'icon_exclamation'
                        }
                      ></DoctIcon>
                      <DoctTypography
                        className={
                          item?.contactInformation?.personName ||
                          registartionDetails?.ContactInformation?.personName
                            ? 'text-grey-400 mt-0 px-1'
                            : 'text-grey-800 mt-0 px-1'
                        }
                        variant="textLabel1"
                      >
                        Contact info
                      </DoctTypography>
                    </div>
                    <div className="d-flex">
                      <DoctIcon
                        name={
                          item?.tickets?.length || tickets?.Tickets?.length
                            ? 'roundDone'
                            : 'exclamation'
                        }
                        fill={
                          item?.tickets?.length || tickets?.Tickets?.length ? '#00C752' : '#AAAAAA'
                        }
                        className={
                          item?.tickets?.length || tickets?.Tickets?.length
                            ? 'icon_done'
                            : 'icon_exclamation'
                        }
                      ></DoctIcon>
                      <DoctTypography
                        className={
                          item?.tickets?.length || tickets?.Tickets?.length
                            ? 'text-grey-400 mt-0 px-1'
                            : 'text-grey-800 mt-0 px-1'
                        }
                        variant="textLabel1"
                      >
                        Tickets Registration
                      </DoctTypography>
                    </div>
                    <div className="d-flex">
                      <DoctIcon
                        name={
                          item?.brochureUrl || registartionDetails?.name
                            ? 'roundDone'
                            : 'exclamation'
                        }
                        fill={
                          item?.brochureUrl || registartionDetails?.name ? '#00C752' : '#AAAAAA'
                        }
                        className={
                          item?.brochureUrl || registartionDetails?.name
                            ? 'icon_done'
                            : 'icon_exclamation'
                        }
                      ></DoctIcon>
                      <DoctTypography
                        className={
                          item?.brochureUrl || registartionDetails?.name
                            ? 'text-grey-400 mt-0 px-1'
                            : 'text-grey-800 mt-0 px-1'
                        }
                        variant="textLabel1"
                      >
                        Upload Registration form
                      </DoctTypography>
                    </div>
                    <div className="d-flex">
                      <DoctIcon
                        name={
                          item?.schedules?.length || schedules?.Schedules?.length
                            ? 'roundDone'
                            : 'exclamation'
                        }
                        fill={
                          item?.schedules?.length || schedules?.Schedules?.length
                            ? '#00C752'
                            : '#AAAAAA'
                        }
                        className={
                          item?.schedules?.length || schedules?.Schedules?.length
                            ? 'icon_done'
                            : 'icon_exclamation'
                        }
                      ></DoctIcon>
                      <DoctTypography
                        className={
                          item?.schedules?.length || schedules?.Schedules?.length
                            ? 'text-grey-400 mt-0 px-1'
                            : 'text-grey-800 mt-0 px-1'
                        }
                        variant="textLabel1"
                      >
                        Schedule, Sessions
                      </DoctTypography>
                    </div>
                    <div className="d-flex">
                      <DoctIcon
                        name={
                          item?.keySpeakers?.length || schedules?.KeySpeakers?.length
                            ? 'roundDone'
                            : 'exclamation'
                        }
                        fill={
                          item?.keySpeakers?.length || schedules?.KeySpeakers?.length
                            ? '#00C752'
                            : '#AAAAAA'
                        }
                        className={
                          item?.keySpeakers?.length || schedules?.KeySpeakers?.length
                            ? 'icon_done'
                            : 'icon_exclamation'
                        }
                      ></DoctIcon>
                      <DoctTypography
                        className={
                          item?.keySpeakers?.length || schedules?.KeySpeakers?.length
                            ? 'text-grey-400 mt-0 px-1'
                            : 'text-grey-800 mt-0 px-1'
                        }
                        variant="textLabel1"
                      >
                        Speakers/ Presenters
                      </DoctTypography>
                    </div>
                    <div className="d-flex">
                      <DoctIcon
                        name={
                          item?.paymentSettlement?.accountHolderName ||
                          paymentsAndInvoice?.Paymentsettlement?.PaymentCountry
                            ? 'roundDone'
                            : 'exclamation'
                        }
                        fill={
                          item?.paymentSettlement?.accountHolderName ||
                          paymentsAndInvoice?.Paymentsettlement?.PaymentCountry
                            ? '#00C752'
                            : '#AAAAAA'
                        }
                        className={
                          item?.paymentSettlement?.accountHolderName ||
                          paymentsAndInvoice?.Paymentsettlement?.PaymentCountry
                            ? 'icon_done'
                            : 'icon_exclamation'
                        }
                      ></DoctIcon>
                      <DoctTypography
                        className={
                          item?.paymentSettlement?.accountHolderName ||
                          paymentsAndInvoice?.Paymentsettlement?.PaymentCountry
                            ? 'text-grey-400 mt-0 px-1'
                            : 'text-grey-800 mt-0 px-1'
                        }
                        variant="textLabel1"
                      >
                        Payment Settlement
                      </DoctTypography>
                    </div>
                    <div className="d-flex">
                      <DoctIcon
                        name={
                          item?.invoiceDetail?.registrationName ||
                          paymentsAndInvoice?.InvoiceDetail?.registrationName
                            ? 'roundDone'
                            : 'exclamation'
                        }
                        fill={
                          item?.invoiceDetail?.registrationName ||
                          paymentsAndInvoice?.InvoiceDetail?.registrationName
                            ? '#00C752'
                            : '#AAAAAA'
                        }
                        className={
                          item?.invoiceDetail?.registrationName ||
                          paymentsAndInvoice?.InvoiceDetail?.registrationName
                            ? 'icon_done'
                            : 'icon_exclamation'
                        }
                      ></DoctIcon>
                      <DoctTypography
                        className={
                          item?.invoiceDetail?.registrationName ||
                          paymentsAndInvoice?.InvoiceDetail?.registrationName
                            ? 'text-grey-400 mt-0 px-1'
                            : 'text-grey-800 mt-0 px-1'
                        }
                        variant="textLabel1"
                      >
                        Invoice Details
                      </DoctTypography>
                    </div>
                    <div className="d-flex">
                      <DoctIcon
                        name={
                          item?.metaData?.termsAndCondition ||
                          teamsAndPolicies?.Metadata?.termsAndCondition
                            ? 'roundDone'
                            : 'exclamation'
                        }
                        fill={
                          item?.metaData?.termsAndCondition ||
                          teamsAndPolicies?.Metadata?.termsAndCondition
                            ? '#00C752'
                            : '#AAAAAA'
                        }
                        className={
                          item?.metaData?.termsAndCondition ||
                          teamsAndPolicies?.Metadata?.termsAndCondition
                            ? 'icon_done'
                            : 'icon_exclamation'
                        }
                      ></DoctIcon>
                      <DoctTypography
                        className={
                          item?.metaData?.termsAndCondition ||
                          teamsAndPolicies?.Metadata?.termsAndCondition
                            ? 'text-grey-400 mt-0 px-1'
                            : 'text-grey-800 mt-0 px-1'
                        }
                        variant="textLabel1"
                      >
                        Terms & Policies
                      </DoctTypography>
                    </div>
                    <div className="d-flex">
                      <DoctIcon
                        name={
                          item?.metaData?.cancellationPolicy ||
                          teamsAndPolicies?.Metadata?.cancellationPolicy
                            ? 'roundDone'
                            : 'exclamation'
                        }
                        fill={
                          item?.metaData?.cancellationPolicy ||
                          teamsAndPolicies?.Metadata?.cancellationPolicy
                            ? '#00C752'
                            : '#AAAAAA'
                        }
                        className={
                          item?.metaData?.cancellationPolicy ||
                          teamsAndPolicies?.Metadata?.cancellationPolicy
                            ? 'icon_done'
                            : 'icon_exclamation'
                        }
                      ></DoctIcon>
                      <DoctTypography
                        className={
                          item?.metaData?.cancellationPolicy ||
                          teamsAndPolicies?.Metadata?.cancellationPolicy
                            ? 'text-grey-400 mt-0 px-1'
                            : 'text-grey-800 mt-0 px-1'
                        }
                        variant="textLabel1"
                      >
                        Cancellation & Refund Policy
                      </DoctTypography>
                    </div>
                  </DoctCol>
                </>
              );
            })}

            {responseRecords?.map((item, index) => {
              return (
                <div className="mx-auto" key={index}>
                  <PreviewPublishCard
                    image={coverImage ? coverImage : '' || item?.image?.coverImageUrl}
                    eventstype={item.type}
                    specialities={item.specialities}
                    eventname={item.name}
                    location={`${item.venue.city}, ${item.venue.country}`}
                    date={`${dayjs(item.startDate).format('D MMM YYYY')} - ${dayjs(
                      item.endDate,
                    ).format('D MMM YYYY')}`}
                    eventsby={`by ${item.organizer.name}`}
                    views={`${item.views} views`}
                    // interested={item.interested}
                    regstatus={`${item.activePriceType?.name} registration ends on ${dayjs(
                      item.activePriceType?.validTill,
                    ).format('DD MMM YYYY')}`}
                  />
                </div>
              );
            })}
          </DoctRow>
        ) : (
          <div className="ml-5 pl-5">
            <DoctTypography
              variant="h6"
              className={`my-0 mr-auto semantic-success mt-4 text-success`}
            >
              Submitted Successfully
            </DoctTypography>
            <DoctTypography variant="subtitle2" className={`text-grey-600 my-0 mr-auto mt-4`}>
              Your Event is under review, it will be published shortly. For insights go to
              ``Dashboard`` tab.
            </DoctTypography>
            <DoctRow>
              {responseRecords?.map((item, index) => {
                return (
                  <div className="mb-5" key={index}>
                    <PreviewPublishCard
                      image={coverImage ? coverImage : '' || item?.image?.coverImageUrl}
                      eventstype={item.type}
                      specialities={item.specialities}
                      eventname={item.name}
                      location={`${item.venue.city}, ${item.venue.country}`}
                      date={`${dayjs(item.startDate).format('D MMM YYYY')} - ${dayjs(
                        item.endDate,
                      ).format('D MMM YYYY')}`}
                      eventsby={`by ${item.organizer.name}`}
                      views={`${item.views} views`}
                      // interested={item.interested}
                      regstatus={`${item.activePriceType?.name} registration ends on ${dayjs(
                        item.activePriceType?.validTill,
                      ).format('DD MMM YYYY')}`}
                    />
                  </div>
                );
              })}
            </DoctRow>
          </div>
        )}
      </form>
      {publishBtnClick == false ? (
        <FixedPanel
          container
          className="backdrop-filter"
          contentClassName="d-flex align-items-center py-12px"
        >
          <DoctButton
            text="Back"
            variant="outline"
            className="mr-2 ml-auto"
            onButtonClickHandler={() => {
              dispatch(setCurrentStep(currentStep - 1));
            }}
          />
          <DoctButton
            text="Preview"
            variant="outline"
            className="mr-2"
            disabled
            onButtonClickHandler={() => {}}
          />
          <DoctButton
            disabled={loading}
            text="Submit"
            type="semantic-success"
            className=""
            onButtonClickHandler={() => {
              handleFormSubmit();
              if (stepBlocked == false) {
                setPublishBtnClick(true);
              }
            }}
          />
        </FixedPanel>
      ) : (
        <FixedPanel
          container
          className="backdrop-filter bg-success"
          contentClassName="d-flex align-items-center py-12px"
        >
          <DoctTypography variant="body1" className={`text-white my-0 mr-auto ml-0`}>
            Your Event is under review, you will get an email confirmation once your event will go
            live!
          </DoctTypography>

          <DoctButton
            variant="outlined"
            text="Go to Dashboard"
            type="inverse"
            className="text-white"
            onButtonClickHandler={() => {
              window.location.pathname = `/${ROUTE.DASHBOARD}/${ROUTE.EVENTS}/${ROUTE.EVENTS_ALL}`;
            }}
          />
        </FixedPanel>
      )}
    </>
  );
}
