import { DoctIcon, DoctTypography } from '@doct-react/core';
import React, { useState } from 'react';
import ScheduleSessionCard from './ScheduleSessionCard';
import dayjs from 'dayjs';
import qs from 'qs';

import { useEffect } from 'react';
import { scheduleFromStartDateEndDate } from '../../../../../../../../helper/helperFunction';
import { DoctFileUpload, DoctForm, DoctModal } from '@doct-react/app';
import ManageScheduleSession from './ManageScheduleSession';
import {
  fetchEventById,
  saveScheduleDetails,
  selectBasicInfoDetails,
  selectCreateEventResponse,
  selectScheduleAndSpeakersDetails,
} from '../../../../../createEvent.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FormGroup from '../../../../../../../../shared/FormGroup';

const LocalizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(LocalizedFormat);
// const START_DATE = '2022-08-01T8:00:00'; // static data will replace with API data
// const END_DATE = '2022-08-05T21:00:00'; // static data will replace with API data

export default function Schedule({ uploadedFiles, setUploadedFiles }) {
  const BasicInfoDetails = useSelector(selectBasicInfoDetails);
  const speakersAndSchedule = useSelector(selectScheduleAndSpeakersDetails);
  const apiResponseData = useSelector(selectCreateEventResponse);

  const dispatch = useDispatch();
  const { id } = useParams();

  const [schedules, setSchedules] = useState([]);
  const [schedulesWithSlots, setSchedulesWithSlots] = useState({});

  const [defaultTimeValue, setDefaultTimeValue] = useState();
  const [selectedTimeValue, setSelectedTimeValue] = useState(false);

  useEffect(() => {
    if (id == undefined) return;
    dispatch(fetchEventById(id));
  }, [id]);

  useEffect(() => {
    if (speakersAndSchedule?.Schedules?.length >= 1) {
      const newObjForSchedulesWithSlots = {};
      speakersAndSchedule?.Schedules?.map((item) => {
        const ScheduleSlotsTime = {};
        newObjForSchedulesWithSlots[item.Date] = ScheduleSlotsTime;
        ScheduleSlotsTime.ScheduleSlots = item.ScheduleSlots;
        Object.assign(newObjForSchedulesWithSlots, ScheduleSlotsTime);
        setSchedulesWithSlots(newObjForSchedulesWithSlots);
      });
    }
    if (apiResponseData?.schedules?.length >= 1) {
      if (id == undefined) return;
      const newObjForSchedulesWithSlots = {};
      apiResponseData?.schedules?.map((item) => {
        const ScheduleSlotsTime = {};
        newObjForSchedulesWithSlots[dayjs(item.Date).format('dddd, D MMMM YYYY')] =
          ScheduleSlotsTime;
        ScheduleSlotsTime.ScheduleSlots = item.scheduleSlots;
        Object.assign(newObjForSchedulesWithSlots, ScheduleSlotsTime);
        setSchedulesWithSlots(newObjForSchedulesWithSlots);
      });
    }
  }, [speakersAndSchedule, apiResponseData]);

  useEffect(() => {
    if (Object.keys(BasicInfoDetails).length) {
      const START_DATE = BasicInfoDetails?.startDate;
      const END_DATE = BasicInfoDetails?.endDate;
      const prepareScheduleArray = scheduleFromStartDateEndDate(START_DATE, END_DATE);
      setSchedules(prepareScheduleArray);
    }
  }, [BasicInfoDetails]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyOfDay, setKeyOfDay] = useState(null);
  const [nameOfDay, setNameOfDay] = useState(null);
  const [editSession, setEditSession] = useState(null);

  const manageActionHandler = () => {
    reset({});
    setIsModalOpen(!isModalOpen);
  };

  const deleteSessionHandler = (day, sessionIndex) => {
    let obj = qs.parse(qs.stringify(schedulesWithSlots));
    obj[day].ScheduleSlots.splice(sessionIndex, 1);
    setSchedulesWithSlots(obj);
  };

  const { handleSubmit, control, touched, errors, watch, register, reset } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  useEffect(() => {
    if (!editSession) return;
    if (!Object.keys(editSession).length) return;
    manageActionHandler();
    setDefaultTimeValue(editSession);
    setSelectedTimeValue(true);
    reset(editSession);
  }, [qs.stringify(editSession)]);

  const handleFormSubmit = handleSubmit((values) => {
    const prevValue = schedulesWithSlots[keyOfDay]?.ScheduleSlots || [];
    let obj = {};
    let updatedSession = [];

    if (editSession?.index + 1) {
      let editedValues = [...prevValue];
      editedValues[editSession.index] = values;
      updatedSession = editedValues;
    } else {
      updatedSession = [...prevValue, values];
    }
    obj = {
      [keyOfDay]: {
        ScheduleSlots: [...updatedSession],
      },
    };

    setSchedulesWithSlots({ ...schedulesWithSlots, ...obj });
    dispatch(saveScheduleDetails({ ...schedulesWithSlots, ...obj }));
    setIsModalOpen(false);
    setEditSession(null);
    setKeyOfDay(null);
  });

  const formProps = {
    handleFormSubmit,
    handleSubmit,
    control,
    touched,
    errors,
    watch,
    register,
    defaultTimeValue,
    selectedTimeValue,
  };

  return (
    <>
      <div className="schedule_event_section bg-grey-100 border-radius">
        <div className="px-4 d-flex justify-content-between align-items-center">
          <div>
            <DoctTypography variant="h6" className="text-grey-800 pt-3 speaker_presenter_text">
              Schedule
            </DoctTypography>
            <DoctTypography
              variant="textLabel1"
              className="text-grey-400 mt-1 speaker_presenter_text"
            >
              {schedules?.length} days event
            </DoctTypography>
            <div className="horizontal_line_grey_schedule position-relative mt-3 mb-1 ml-5"></div>
            <FormGroup className="" title="">
              <DoctFileUpload
                uploadTitle="Upload detailed schedule/ itinerary here."
                uploadMaxFilesMessage="Upload document in PDF, JPEG, PNG formats up to 5 MB size."
                maxFiles={1}
                uploadedFiles={uploadedFiles || []}
                setUploadedFiles={setUploadedFiles}
                accept=".pdf, .png, .jpg, .jpeg"
                maxFileSizeInMb={5}
              />
            </FormGroup>
            <div className="horizontal_line_grey_schedule position-relative mt-3 mb-4 ml-5"></div>
            <DoctTypography variant="body2" className="text-grey-600 m-0 speaker_presenter_text">
              Add sessions as per your plan for the event day.
            </DoctTypography>
          </div>
        </div>
        <div className="px-1 py-3">
          {schedules.map((item, index) => {
            return (
              <ScheduleSessionCard
                key={item?.key}
                day={item.day}
                date={item.date}
                manageActionHandler={manageActionHandler}
                keyOfDay={item.date}
                setNameOfDay={setNameOfDay}
                setKeyOfDay={setKeyOfDay}
                sessions={schedulesWithSlots[item?.date]?.ScheduleSlots || []}
                setEditSession={setEditSession}
                deleteSessionHandler={deleteSessionHandler}
              />
            );
          })}
        </div>
      </div>
      <DoctModal
        iconName={''}
        primaryBtnText={'Save'}
        open={isModalOpen}
        className={'disable_modal_outside_click'}
        handlePrimaryButtonClick={() => {
          handleFormSubmit();
          setSelectedTimeValue(false);
        }}
        handleClose={() => {
          manageActionHandler();
          setEditSession(null);
          setKeyOfDay(null);
          setSelectedTimeValue(false);
        }}
        title={`Add Session to ${nameOfDay}`}
        width={360}
      >
        <ManageScheduleSession {...formProps} />
      </DoctModal>
    </>
  );
}
