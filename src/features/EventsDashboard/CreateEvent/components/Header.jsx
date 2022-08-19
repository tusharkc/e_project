import { DoctButton, DoctContainer, DoctIconButton, DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { EventStatus } from '../../../../helper/enums/eventStatus';
import { MANAGE_EVENTS } from '../../../../routes/constant';
import {
  fetchEventById,
  saveSaveAsDraft,
  selectCreateEventResponse,
  selectCurrentStep,
  selectRegistartionDetails,
  selectResponseData,
  setDefaultState,
} from '../createEvent.slice';
import { updateCreateEvent } from '../services/CreateEventServices';
import { ManageCloseEvent } from './ManageCloseEvent';
import { useNavigate } from 'react-router-dom';
import stepsName from './Steps/stepsName';

function Header() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const apiResponseData = useSelector(selectCreateEventResponse);
  const registartionDetails = useSelector(selectRegistartionDetails);
  const [eventName, setEventName] = useState('');
  const [open, setOpen] = useState(false);
  const currentStep = useSelector(selectCurrentStep);
  const navigate = useNavigate();

  useEffect(() => {
    if (id == undefined) return;
    dispatch(fetchEventById(id));
  }, [id]);

  useEffect(() => {
    if (Object.keys(apiResponseData).length) {
      if (id == undefined) return;
      setEventName(apiResponseData.name);
    }
    if (Object.keys(registartionDetails).length) {
      setEventName(registartionDetails.name);
    }
  }, [apiResponseData, registartionDetails]);

  const DraftEvent = () => {
    dispatch(saveSaveAsDraft(true));
  };

  return (
    <div className="create-event-header bg-grey-100 panel-height-5x d-flex align-items-center position-sticky top-0">
      <DoctContainer>
        <DoctTypography
          variant="subtitle1"
          className="d-flex align-items-center my-0"
          fontWeight="normal"
        >
          <DoctIconButton
            variant="text"
            type="secondary"
            icon="close"
            size="medium"
            onButtonClickHandler={() => {
              setOpen(true);
            }}
          />
          {eventName ? eventName : 'Create an Event'}
          <DoctButton
            text="Save Draft"
            variant="outlined"
            size="medium"
            className="ml-lg-auto"
            onButtonClickHandler={DraftEvent}
            disabled={currentStep > 7}
          />
        </DoctTypography>
      </DoctContainer>
      <ManageCloseEvent
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </div>
  );
}

export default React.memo(Header);
