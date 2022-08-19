import React, { useState } from 'react';
import { DoctTypography, DoctButton } from '@doct-react/core';
import { DoctForm, DoctModal } from '@doct-react/app';
import ManageScheduleSession from './ManageScheduleSession';
import { saveScheduleDetails, selectScheduleDetails } from '../../../../../createEvent.slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ScheduleSessionDetailCard from './ScheduleSessionDetailCard';

const ScheduleSessionCard = ({
  day,
  date,
  manageActionHandler,
  setKeyOfDay,
  keyOfDay,
  setNameOfDay,
  sessions,
  setEditSession,
  deleteSessionHandler,
}) => {
  return (
    <>
      <div className="schedule_data mb-lg-3 px-3 my-n2 border-radius bg-primary-100 d-flex justify-content-between flex-column">
        <div className="d-flex w-100 align-items-center">
          <div>
            <DoctTypography variant="subtitle1" className="text-primary mb-sm-n3 py-2 schedule_day">
              {day}
            </DoctTypography>
            <DoctTypography variant="textLabel2" className="text-grey-600 mb-4 schedule_date">
              {date}
            </DoctTypography>
          </div>
          <DoctButton
            variant="contained"
            icon="plus"
            type="inverse"
            text="Add Session"
            className="doct_btn_add_session ml-auto"
            onButtonClickHandler={(e) => {
              manageActionHandler();
              setKeyOfDay(keyOfDay);
              setNameOfDay(day);
              e.preventDefault();
            }}
          />
        </div>
        {!!sessions?.length &&
          sessions.map((session, index) => {
            return (
              <ScheduleSessionDetailCard
                key={index}
                keyOfDay={keyOfDay}
                sessionIndex={index}
                session={session}
                setKeyOfDay={setKeyOfDay}
                setEditSession={setEditSession}
                deleteSessionHandler={deleteSessionHandler}
                day={day}
                setNameOfDay={setNameOfDay}
              />
            );
          })}
      </div>
    </>
  );
};

export default ScheduleSessionCard;
