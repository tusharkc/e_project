import { DoctIcon, DoctTypography } from '@doct-react/core';
import { DoctActionMenu } from '@doct-react/app';
import React, { useState } from 'react';
import '../../../ScheduleSpeakers/ScheduleSpeaker.scss';
import dayjs from 'dayjs';

const options = [
  {
    title: 'Edit',
  },
  {
    title: 'Delete',
  },
];

function ScheduleSessionDetailCard({
  keyOfDay,
  session,
  setKeyOfDay,
  sessionIndex,
  setEditSession,
  deleteSessionHandler,
  day,
  setNameOfDay,
}) {
  return (
    <div className="schedule_session_white_card bg-grey-100 border-radius px-2 mb-2">
      <div className="d-flex align-items-center justify-content-between">
        <DoctTypography variant="textLabel2" className="text-grey-600 m-0">
          {dayjs(session.From).format('LT')} - {dayjs(session.To).format('LT')}
        </DoctTypography>

        <div className="d-flex align-items-center">
          <DoctTypography variant="textLabel2" className="my-0 text-grey-600">
            {session.speakers}
          </DoctTypography>

          <DoctActionMenu
            className="ml-2 more_action_menu"
            btnType="inverse"
            options={options}
            onClick={(item) => {
              if (item.title == 'Edit') {
                setEditSession({ index: sessionIndex, ...session });
                // setValue(session);
                setKeyOfDay(keyOfDay);
                setNameOfDay(day);
              }
              if (item.title == 'Delete') {
                deleteSessionHandler(keyOfDay, sessionIndex);
              }
            }}
          />
        </div>
      </div>
      <DoctTypography variant="subtitle2" className="text-grey-800 my-1 py-0 mt-sm-n2">
        {session.Title}
      </DoctTypography>
      <DoctTypography variant="textLabel2" className="text-grey-600 my-0 p-0 mt-sm-n2">
        <div
          dangerouslySetInnerHTML={{ __html: session.description }}
          className="session_description text-truncate"
        />
      </DoctTypography>
    </div>
  );
}

export default ScheduleSessionDetailCard;
