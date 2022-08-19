import { useState, useEffect } from 'react';

import Radio from '@mui/material/Radio';

import { useDispatch, useSelector } from 'react-redux';
import { DoctLoading } from '@doct-react/app';
import { DoctButton, DoctTypography } from '@doct-react/core';

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { EventRegistrationLayoutFooter } from '../../../../../layout';

import {
  selectLoadingEvents,
  selectSelectedTickets,
  setActiveStep,
  setSelectedTicket,
} from '../complementaryRegistration.slice';

function SelectionPanel({ children, isActive }) {
  return (
    <div
      className={`selection-panel selection-panel-label panel-action-height d-flex align-items-center border-radius selection-panel-gap ${
        isActive ? 'selection-panel-active' : ''
      }`}
    >
      {children}
    </div>
  );
}

export default function SelectTicket({ response }) {
  const { tickets } = response;
  const selectedTickets = useSelector(selectSelectedTickets);
  const loadingEvents = useSelector(selectLoadingEvents);

  const [value, setValue] = useState(null);

  useEffect(() => {
    if (Object.keys(selectedTickets).length) {
      setValue(selectedTickets.id);
      return;
    }
    setValue(tickets?.[0]?.id);
  }, [tickets?.length]);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const dispatch = useDispatch();

  return (
    <>
      <DoctTypography variant="h6" className="mb-3 mt-4">
        Select Attendee Type
      </DoctTypography>
      {loadingEvents && (
        <div className="d-flex justify-content-center">
          <DoctLoading />
        </div>
      )}
      {tickets?.length > 0 && value && (
        <RadioGroup
          aria-label="gender"
          defaultValue="female"
          name="radio-buttons-group"
          value={value}
          onChange={handleRadioChange}
          className="selection-panel-container doct-radio-buttons"
        >
          {tickets?.length > 0 &&
            tickets.map(({ name, id }) => {
              return (
                <SelectionPanel key={id} isActive={value == id}>
                  <FormControlLabel
                    value={id}
                    control={<Radio className="mr-2" />}
                    label={name}
                    className="font-weight-medium"
                  />
                </SelectionPanel>
              );
            })}
        </RadioGroup>
      )}
      <EventRegistrationLayoutFooter>
        <DoctButton
          icon="right"
          iconPosition="right"
          disabled={!value}
          text="Continue"
          className="ml-auto"
          onButtonClickHandler={() => {
            dispatch(setSelectedTicket(value));
            dispatch(setActiveStep(1));
          }}
        />
      </EventRegistrationLayoutFooter>
    </>
  );
}
