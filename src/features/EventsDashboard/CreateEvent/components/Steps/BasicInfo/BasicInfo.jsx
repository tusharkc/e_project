import {
  DoctAutoComplete,
  DoctDatePickerV2,
  DoctForm,
  DoctFormCheckbox,
  DoctRadioGroup,
  DoctTextField,
  DoctTimePicker,
} from '@doct-react/app';
import { DoctButton, DoctCol, DoctTypography } from '@doct-react/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { FixedPanel } from '../../../../../../shared/ui';
import CurrentAndTotalSteps from '../../CurrentAndTotalSteps';
import { FormHeading, StepTitle } from '../../UiHelper';
import stepsName from '../stepsName';
import React, { useEffect, useHistory, useState } from 'react';
import {
  EventRegistrationType,
  EventType,
  NumberOfGathering,
} from '../../../../../../helper/enums/eventEnums';
import './BasicInfoStyle.scss';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import LocationField from '../../../../../../shared/ui/LocationField';
import useFormBasicInfo from './Form.BasicInfo';
import { useSelector } from 'react-redux';
import {
  selectBasicInfoDetails,
  selectCreateEventResponse,
  selectLoading,
} from '../../../createEvent.slice';
import dayjs from 'dayjs';
import { EventStatus } from '../../../../../../helper/enums/eventStatus';

export default function BasicInfo() {
  const {
    handleFormSubmit,
    control,
    watch,
    errors,
    reset,
    setValue,
    touched,
    setParticipants,
    Participants,
    setNumberOfGathering,
    numberOfGathering,
    setRegistrationType,
    registrationType,
    locationValue,
  } = useFormBasicInfo();

  const startDate = watch('startDate');
  const onlineRegistrationthroughDocthubPortal = watch('onlineRegistrationthroughDocthubPortal');

  const loading = useSelector(selectLoading);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const BasicInfoDetails = useSelector(selectBasicInfoDetails);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <DoctCol xs={7} className="mx-auto mb-5">
          <StepTitle>{stepsName.basicInfo.label}</StepTitle>
          <FormHeading>Event Type</FormHeading>
          <DoctAutoComplete
            name="eventType"
            label="Select"
            id="eventType"
            control={control}
            isErrors={errors}
            options={EventType}
            validationRules={{
              required: "It's Required Field",
            }}
            onEndScroll={() => {}}
            onClearInput={() => {}}
            disabled={
              apiResponseData.status == EventStatus.ACTIVE ||
              apiResponseData.status == EventStatus.ACTIVATIONREQUESTED
                ? true
                : false
            }
          />
          <div className="py-2 mt-3">
            <FormHeading>Registration Type</FormHeading>
            <DoctTypography variant="input" fontWeight="regular" className="mb-1 text-grey-600">
              Does attendees are paying for this event?
            </DoctTypography>
            <div className="mt-1 border-radius">
              <RadioGroup
                aria-labelledby="registrationType"
                name="registrationType"
                value={registrationType}
                onChange={(e) => {
                  setRegistrationType(e.target.value);
                }}
              >
                <div className="d-inline-flex">
                  <div
                    className={
                      registrationType == 'Paid'
                        ? 'background_white px-3 mr-2'
                        : 'background_grey mr-2 px-3'
                    }
                  >
                    <FormControlLabel
                      name="Paid"
                      value="Paid"
                      control={<Radio />}
                      label="Paid Event"
                      className="text-grey-800"
                      defaultChecked={true}
                      disabled={
                        apiResponseData.status == EventStatus.ACTIVE ||
                        apiResponseData.status == EventStatus.ACTIVATIONREQUESTED
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div
                    className={
                      registrationType == 'Free' ? 'background_white px-3 ' : 'background_grey px-3'
                    }
                  >
                    <FormControlLabel
                      name="Free"
                      value="Free"
                      control={<Radio />}
                      label="Free Event"
                      className="text-grey-800"
                      disabled={
                        apiResponseData.status == EventStatus.ACTIVE ||
                        apiResponseData.status == EventStatus.ACTIVATIONREQUESTED
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="py-2 mt-1">
            <FormHeading id="registration-Process">Registration Process</FormHeading>
            <div className="background_white pt-2 pb-2">
              <DoctFormCheckbox
                name="offlineAndComplimentaryRegistration"
                label="Offline & Complimentary Registration"
                id="checkbox"
                control={control}
                isErrors={errors}
                validationRules={{}}
                className="d-block"
                disabled={true}
                defaultValue={true}
              />
              <div className="pl-4 mt-sm-n1 ml-2">
                <DoctTypography variant="input" className="text-grey-400">
                  Get offline automated invoicing & confirmation mail for complimentary
                  registrations,
                </DoctTypography>
              </div>
            </div>
            <div
              className={
                onlineRegistrationthroughDocthubPortal == true
                  ? 'background_white mt-2 pt-2 pb-2'
                  : 'background_grey mt-2 pt-2 pb-2'
              }
            >
              <DoctFormCheckbox
                name="onlineRegistrationthroughDocthubPortal"
                label="Online Registration through Docthub Portal"
                id="checkbox"
                control={control}
                isErrors={errors}
                validationRules={{}}
                className="d-block"
                defaultValue={
                  apiResponseData.registrationProcess == 'OnlineRegistrationThroughDocthub' ||
                  BasicInfoDetails.RegistrationProcess == 'OnlineRegistrationThroughDocthub'
                    ? true
                    : false
                }
                disabled={
                  apiResponseData.status == EventStatus.ACTIVE ||
                  apiResponseData.status == EventStatus.ACTIVATIONREQUESTED
                    ? true
                    : false
                }
              />
              <div className="pl-4 mt-sm-n1 ml-2">
                <DoctTypography variant="input" className="text-grey-600">
                  Docthub will Charge Convenience fees on Total Online Registrations Transaction
                  Amount + Applicable GST
                </DoctTypography>
              </div>
            </div>
          </div>
          <div className="py-2 mt-1">
            <FormControl>
              <FormHeading id="Participants">Participants</FormHeading>
              <RadioGroup
                aria-labelledby="Participants"
                name="Participants"
                value={Participants}
                onChange={(e) => {
                  setParticipants(e.target.value);
                }}
              >
                <div
                  className={
                    Participants == 'Public'
                      ? 'background_white pl-3 pb-2'
                      : 'background_grey pl-3 pb-2'
                  }
                >
                  <FormControlLabel
                    name="Public"
                    value="Public"
                    control={<Radio />}
                    label="Public"
                    className="text-grey-800"
                  />
                  <div className="pl-4 ml-2 mt-sm-n2">
                    <DoctTypography variant="input" className="text-grey-600">
                      Get listed on Docthub event listing platform.
                    </DoctTypography>
                  </div>
                </div>
                <div
                  className={
                    Participants == 'Private'
                      ? 'background_white pl-3 pb-2 mt-2'
                      : 'background_grey pl-3 pb-2 mt-2'
                  }
                >
                  <FormControlLabel
                    name="Private"
                    value="Private"
                    control={<Radio />}
                    label="Private"
                    className="text-grey-800"
                  />
                  <div className="pl-4 ml-2 mt-sm-n2">
                    <DoctTypography variant="input" className="text-grey-600 mt-sm-n2">
                      Get a unique event URL for your members, Event will not be listed publicly.
                    </DoctTypography>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
          </div>
          <div className="py-2">
            <FormHeading>Total Number Of Gathering</FormHeading>
            <div className="border-radius">
              <RadioGroup
                aria-labelledby="totalNumberOfGathering"
                name="totalNumberOfGathering"
                value={numberOfGathering}
                onChange={(e) => {
                  setNumberOfGathering(e.target.value);
                }}
              >
                <div className="d-inline-flex">
                  <div
                    className={
                      numberOfGathering == 'Limited'
                        ? 'background_white pl-2 mr-2'
                        : 'background_grey pl-2 mr-2'
                    }
                  >
                    <FormControlLabel
                      name="Limited"
                      value="Limited"
                      control={<Radio />}
                      label="Limited"
                      className="text-grey-800"
                      defaultChecked={true}
                      disabled={
                        apiResponseData.status == EventStatus.ACTIVE ||
                        apiResponseData.status == EventStatus.ACTIVATIONREQUESTED
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div
                    className={
                      numberOfGathering == 'Unlimited'
                        ? 'background_white pl-2'
                        : 'background_grey pl-2'
                    }
                  >
                    <FormControlLabel
                      name="Unlimited"
                      value="Unlimited"
                      control={<Radio />}
                      label="Unlimited"
                      className="text-grey-800"
                      disabled={
                        apiResponseData.status == EventStatus.ACTIVE ||
                        apiResponseData.status == EventStatus.ACTIVATIONREQUESTED
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DoctTextField
            className="mb-2"
            name="maxAttendees"
            label="Number of Attendees"
            id="maxAttendees"
            control={control}
            isErrors={errors}
            disabled={numberOfGathering == 'Limited' ? false : true}
            defaultValue=""
            validationRules={{
              required: numberOfGathering == 'Limited' ? "It's Required Field" : false,
            }}
            touched={touched}
            showStar={false}
          />
          <div className="py-2 mt-1">
            <DoctTypography variant="h6" fontWeight="medium" className="mb-3 mt-2">
              Date & Time
            </DoctTypography>
            <DoctTextField
              className="mt-2 mb-3"
              name="timeZone"
              label="Time Zone"
              id="timeZone"
              control={control}
              isErrors={errors}
              defaultValue="India"
              disabled
              validationRules={{}}
              touched={touched}
            />
            <div className="d-flex mb-3">
              <DoctDatePickerV2
                inputProps={{
                  label: 'Start Date',
                  id: 'startDate',
                  dateFormat: 'dd MMM yyyy',
                  autoComplete: 'off',
                }}
                control={control}
                isErrors={errors}
                showStar={false}
                name="startDate"
                className="w-100 mr-2"
                validationRules={{
                  required: "It's Required Field",
                }}
                withController={true}
              />
              <DoctTimePicker
                name="StartTime"
                label="Start Time (optional)"
                id="StartTime"
                className="w-100"
                control={control}
                touched={touched}
                isErrors={errors}
                defaultValue=""
              />
            </div>
            <div className="d-flex">
              <DoctDatePickerV2
                inputProps={{
                  label: 'End Date',
                  id: 'endDate',
                  dateFormat: 'dd MMM yyyy',
                  minDate: dayjs(startDate).toDate(),
                  autoComplete: 'off',
                  disabled: startDate ? false : true,
                }}
                control={control}
                isErrors={errors}
                showStar={false}
                name="endDate"
                className="w-100 mr-2"
                validationRules={{
                  required: "It's Required Field",
                }}
                withController={true}
              />
              <DoctTimePicker
                name="EndTime"
                label="End Time (optional)"
                id="EndTime"
                className="w-100"
                control={control}
                touched={touched}
                isErrors={errors}
                defaultValue=""
              />
            </div>
          </div>
          <div className="py-2 mt-1">
            <DoctTypography variant="h6" fontWeight="medium" className="mb-3 mt-2">
              Venue Location Info
            </DoctTypography>
            <LocationField
              savedValue={locationValue}
              control={control}
              errors={errors}
              touched={touched}
              watch={watch}
              setValue={setValue}
              inputProps={{
                country: {
                  disabled: true,
                },
                showStar: {
                  showStar: false,
                },
              }}
              showinGrid
              columnLayout={{ country: 12, city: 6, state: 6 }}
              className={'form_el form_el_gap_bottom'}
            />
            <DoctTextField
              showStar={false}
              className="mb-3"
              name="addressLine1"
              label="Address Line 1"
              id="addressLine1"
              control={control}
              isErrors={errors}
              defaultValue=""
              touched={touched}
              validationRules={{
                required: "It's Required Field",
              }}
            />
            <DoctTextField
              showStar={false}
              className="mb-2"
              name="postalCode"
              label="Postal Code"
              id="postalCode"
              control={control}
              isErrors={errors}
              defaultValue=""
              touched={touched}
              validationRules={{
                required: "It's Required Field",
                maxLength: {
                  value: 6,
                  message: 'Max 6 Characters',
                },
                pattern: {
                  value: /^(\+\d{0,9}[- ]?)?\d{6}$/,
                  message: 'Invalid Characters',
                },
              }}
            />
          </div>
          <div className="mt-1">
            <FormHeading>Google Map Link</FormHeading>
            <DoctTextField
              className="mt-2 mb-5"
              name="googleMapLink"
              showStar={false}
              label="Paste/Enter link here (optional)"
              id="googleMapLink"
              control={control}
              isErrors={errors}
              defaultValue=""
              touched={touched}
            />
          </div>
          <div className="py-2 mt-lg-n3">
            <DoctTypography variant="h6" className="font-weight-medium text-grey-800">
              Credit Points <span className="text-grey-600 text-label-1">(optional)</span>
            </DoctTypography>
            <DoctTypography variant="textLabel1" className="text-grey-600">
              Professional academic credit hours
            </DoctTypography>
            <DoctTextField
              className="mt-1"
              name="CreditPoints"
              showStar={false}
              label="Enter points"
              id="CreditPoints"
              control={control}
              isErrors={errors}
              defaultValue=""
              touched={touched}
            />
            <DoctTypography variant="subtitle2" className="font-weight-medium text-grey-800">
              Approved by
            </DoctTypography>
            <DoctTextField
              className="mt-1 mb-5"
              name="CreditPointsApprovedBy"
              showStar={false}
              label="Enter name"
              id="CreditPointsApprovedBy"
              control={control}
              isErrors={errors}
              defaultValue=""
              touched={touched}
            />
          </div>
        </DoctCol>
      </form>
      <FixedPanel
        container
        className="backdrop-filter"
        contentClassName="py-2 d-flex align-items-center"
      >
        <CurrentAndTotalSteps />
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
