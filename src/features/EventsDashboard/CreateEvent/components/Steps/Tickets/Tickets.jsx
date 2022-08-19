import { DoctButton, DoctCol, DoctTypography, DoctIcon, DoctRow } from '@doct-react/core';
import { useDispatch, useSelector } from 'react-redux';
import './TicketsStyle.scss';
import { FixedPanel, Tost } from '../../../../../../shared/ui';
import {
  selectBasicInfoDetails,
  selectCreateEventResponse,
  selectCurrentStep,
  selectLoading,
  selectShowError,
  selectTicketsDetails,
  setCurrentStep,
  setShowError,
} from '../../../createEvent.slice';
import CurrentAndTotalSteps from '../../CurrentAndTotalSteps';
import { FormHeading, StepTitle } from '../../UiHelper';
import stepsName from '../stepsName';
import useFormTickets from './Form.Tickets';
import TicketsSection from './TicketsSubSection/TicketsSection';
import { ForeignRegistration, IndianRegistration, TicketCategories } from './Components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useEffect, useState } from 'react';

export default function Tickets() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const BasicInfoDetails = useSelector(selectBasicInfoDetails);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const ticketsDetails = useSelector(selectTicketsDetails);
  const loading = useSelector(selectLoading);
  const [attendeeEdit, setAttendeeEdit] = useState(false);

  const {
    formName,
    handleFormSubmit,
    inrTickets,
    setInrTickets,
    usdTickets,
    setUsdTickets,
    editAttendeeValue,
    setEditAttendeeValue,
    setIsAttendeevalueChange,
    isAttendeevalueChange,
    registrationType,
    setRegistrationType,
    gstRegistration,
    setGSTRegistration,
    tarrif,
    setTarrif,
    emptyCategories,
    setEmptyCategories,
  } = useFormTickets();

  const showError = useSelector(selectShowError);

  const [erorFormSubmit, setErrorFormSubmit] = useState(null);

  const [showTost, setShowTost] = useState(false);
  const [showPaymentType, setShowPaymentType] = useState('');

  useEffect(() => {
    if (apiResponseData?.eventPaymentType) {
      setShowPaymentType(apiResponseData?.eventPaymentType);
    }
    if (BasicInfoDetails.RegistrationType) {
      setShowPaymentType(BasicInfoDetails.RegistrationType);
    }
  }, [apiResponseData, BasicInfoDetails]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowError(false));
      setEmptyCategories(false);
    }, 2000);
  }, [showError]);

  useEffect(() => {
    if (apiResponseData?.invoiceDetail?.isGSTRegistration == true) {
      setGSTRegistration('true');
    } else if (ticketsDetails.InvoiceDetail?.IsGSTRegistration == 'true') {
      setGSTRegistration('true');
    }

    if (apiResponseData?.tariffTaxation) {
      setTarrif(apiResponseData?.tariffTaxation);
    } else if (ticketsDetails.TariffTaxation) {
      setTarrif(ticketsDetails.TariffTaxation);
    }
  }, [apiResponseData, ticketsDetails]);

  useEffect(() => {
    if (Object.keys(apiResponseData).length) {
      const usdArray = apiResponseData?.tickets?.filter(({ currency }) => currency == 'USD') || [];
      if (usdArray.length) {
        setRegistrationType('Yes');
      }
    }
    if (Object.keys(ticketsDetails).length) {
      const usdArray = ticketsDetails?.Tickets?.filter(({ Currency }) => Currency == 'USD') || [];
      if (usdArray.length) {
        setRegistrationType('Yes');
      }
    }
  }, [Object.keys(apiResponseData).length, Object.keys(ticketsDetails).length]);

  useEffect(() => {
    if (registrationType == 'No') {
      setUsdTickets([]);
    }
  }, [registrationType]);

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
    setEmptyCategories(false);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <DoctCol sm={10} className="mx-auto mb-5">
          {showError ||
            (emptyCategories && (
              <div className="position-fixed tost-container">
                <Tost
                  variant={'error'}
                  text={
                    erorFormSubmit?.Title || showError
                      ? 'Oops! something went wrong'
                      : 'must select one category'
                  }
                  onPressedClose={onTostCloseHandler}
                />
              </div>
            ))}
          <DoctRow>
            <DoctCol xs={9} className="mx-auto mb-3">
              <StepTitle className="text-center">{stepsName.tickets.label}</StepTitle>
              {showPaymentType == 'Paid' && (
                <>
                  <DoctTypography variant="subtitle2" fontWeight="bold" className="text-grey-800">
                    Is GST applicable for this event?
                  </DoctTypography>
                  <div className="border-radius mb-2">
                    <RadioGroup
                      aria-labelledby="registrationType"
                      name="registrationType"
                      value={gstRegistration}
                      onChange={(e) => {
                        setGSTRegistration(e.target.value);
                      }}
                    >
                      <div className="d-inline-flex">
                        <div
                          className={
                            gstRegistration == 'true'
                              ? 'background_white px-3 mr-2'
                              : 'background_grey mr-2 px-3'
                          }
                        >
                          <FormControlLabel
                            name="true"
                            value="true"
                            control={<Radio />}
                            label="Yes"
                            className="text-grey-800"
                            defaultChecked={true}
                          />
                        </div>
                        <div
                          className={
                            gstRegistration == 'false'
                              ? 'background_white px-3 mr-2'
                              : 'background_grey mr-2 px-3'
                          }
                        >
                          <FormControlLabel
                            name="false"
                            value="false"
                            control={<Radio />}
                            label="No"
                            className="text-grey-800"
                          />
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  {gstRegistration == 'true' && (
                    <>
                      <DoctTypography
                        variant="subtitle2"
                        fontWeight="bold"
                        className="text-grey-800"
                      >
                        Tariff & Taxation
                      </DoctTypography>
                      <div className="border-radius mb-2">
                        <RadioGroup
                          aria-labelledby="tariff"
                          name="tariff"
                          value={tarrif}
                          onChange={(e) => {
                            setTarrif(e.target.value);
                          }}
                        >
                          <div className="d-inline-flex">
                            <div
                              className={
                                tarrif == 'IncludingAllTaxes'
                                  ? 'background_white px-3 mr-2'
                                  : 'background_grey mr-2 px-3'
                              }
                            >
                              <FormControlLabel
                                name="IncludingAllTaxes"
                                value="IncludingAllTaxes"
                                control={<Radio />}
                                label="Including All Taxes"
                                className="text-grey-800"
                                defaultChecked={true}
                              />
                            </div>
                            <div
                              className={
                                tarrif == 'ExcludingAllTaxes'
                                  ? 'background_white px-3 mr-2'
                                  : 'background_grey mr-2 px-3'
                              }
                            >
                              <FormControlLabel
                                name="ExcludingAllTaxes"
                                value="ExcludingAllTaxes"
                                control={<Radio />}
                                label="Excluding All Taxes"
                                className="text-grey-800"
                              />
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    </>
                  )}
                </>
              )}
            </DoctCol>
          </DoctRow>

          <div className="d-flex justify-content-between align-items-center bg-white border-radius mb-2 px-4 py-3 total_atendees_section">
            <div className="d-flex">
              <DoctIcon name="membersOutline" fill="#00A0C0" className="members_icon mb-3 mt-3" />
              <DoctTypography
                className="text-grey-800 mx-2 mt-3"
                fontWeight="regular"
                variant="textLabel1"
              >
                Total attendees limit for this Event
              </DoctTypography>
            </div>

            <div className="d-flex">
              {attendeeEdit ? (
                <input
                  className="border-radius border-light numbers_adding px-1 py-1 text-grey-800 bg-grey-200 mt-3"
                  name="maxAttendee"
                  value={editAttendeeValue}
                  onChange={(e) => {
                    setEditAttendeeValue(e.target.value);
                  }}
                />
              ) : (
                <DoctTypography
                  className="border-radius numbers_adding px-4 py-1 text-grey-800 bg-grey-200 mt-3"
                  fontWeight="medium"
                  variant="textLabel1"
                >
                  {isAttendeevalueChange
                    ? editAttendeeValue
                    : ticketsDetails.maxAttendees || BasicInfoDetails.maxAttendees}
                </DoctTypography>
              )}
              {attendeeEdit ? (
                <DoctButton
                  variant="text"
                  type="semantic-success"
                  text="Save"
                  className="mt-2"
                  onButtonClickHandler={(e) => {
                    e.preventDefault();
                    setAttendeeEdit(false);
                    setIsAttendeevalueChange(true);
                  }}
                />
              ) : (
                <DoctButton
                  variant="text"
                  type="semantic-info"
                  text="Edit"
                  className="mt-2"
                  onButtonClickHandler={(e) => {
                    e.preventDefault();
                    setAttendeeEdit(true);
                  }}
                  disabled={BasicInfoDetails.NumberOfGathering == 'Unlimited'}
                />
              )}
            </div>
          </div>
          <TicketCategories />
          <IndianRegistration
            setInrTickets={setInrTickets}
            inrTickets={inrTickets}
            tarrif={tarrif}
          />
          <DoctRow>
            <DoctCol xs={12} className="mx-auto mb-3">
              <DoctTypography
                variant="subtitle2"
                className="mt-3 radio_btn_text"
                fontWeight="normal"
              >
                Do you want Foreign Registration for your event?
              </DoctTypography>
              <div className="border-radius">
                <RadioGroup
                  aria-labelledby="registrationType"
                  name="registrationType"
                  value={registrationType}
                  onChange={(e) => {
                    setRegistrationType(e.target.value);
                  }}
                >
                  <div className="align-item-center d-flex justify-content-center">
                    <div className="d-inline-flex w-75">
                      <div
                        className={
                          registrationType == 'Yes'
                            ? 'background_white px-3 mr-2'
                            : 'background_grey mr-2 px-3'
                        }
                      >
                        <FormControlLabel
                          name="Yes"
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                          className="text-grey-800"
                          defaultChecked={true}
                        />
                      </div>
                      <div
                        className={
                          registrationType == 'No'
                            ? 'background_white px-3 mr-2'
                            : 'background_grey mr-2 px-3'
                        }
                      >
                        <FormControlLabel
                          name="No"
                          value="No"
                          control={<Radio />}
                          label="No"
                          className="text-grey-800"
                        />
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </DoctCol>
          </DoctRow>
          {registrationType == 'Yes' && (
            <ForeignRegistration
              usdTickets={usdTickets}
              setUsdTickets={setUsdTickets}
              tarrif={tarrif}
            />
          )}
        </DoctCol>
      </form>
      <FixedPanel
        container
        className="backdrop-filter"
        contentClassName="d-flex align-items-center py-12px"
      >
        <CurrentAndTotalSteps />
        <DoctButton
          text="Back"
          variant="outline"
          className="mr-2"
          onButtonClickHandler={() => {
            dispatch(setCurrentStep(currentStep - 1));
          }}
        />
        <DoctButton
          disabled={loading}
          text="Save & Next"
          className=""
          onButtonClickHandler={() => {
            handleFormSubmit();
          }}
        />
      </FixedPanel>
    </>
  );
}
