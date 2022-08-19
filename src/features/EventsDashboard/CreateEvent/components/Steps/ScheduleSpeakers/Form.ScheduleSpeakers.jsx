import { DoctForm } from '@doct-react/app';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveApiData,
  saveScheduleAndSpeakersDetails,
  selectBasicInfoDetails,
  selectCreateEventResponse,
  selectCurrentStep,
  selectLoading,
  selectResponseData,
  selectSaveAsDraftClicked,
  selectScheduleAndSpeakersDetails,
  selectScheduleDetails,
  setCurrentStep,
  setDefaultState,
  setStepsFormData,
} from '../../../createEvent.slice';
import stepsName from '../stepsName';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { updateCreateEvent } from '../../../services/CreateEventServices';

const formNameWithDefaultProps = (control, errors) => {
  return {};
};

export default function useFormScheduleSpeakers() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const basicInfo = useSelector(selectBasicInfoDetails);
  const scheduleDetails = useSelector(selectScheduleDetails);
  const createdEventResponse = useSelector(selectResponseData);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const loading = useSelector(selectLoading);
  const schedules = useSelector(selectScheduleAndSpeakersDetails);
  const draftBtnClicked = useSelector(selectSaveAsDraftClicked);
  const navigate = useNavigate();

  const { handleSubmit, control, errors, formState, reset, touched, watch, setValue } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  const [checkedbtnClicked, setCheckedbtnClicked] = useState(false);

  useEffect(() => {
    const values = { ...schedules };
    if (values.ScheduleDocumentFile) {
      setUploadedFiles([values.ScheduleDocumentFile]);
    }
  }, []);

  useEffect(() => {
    if (draftBtnClicked == true) {
      handleFormSubmit();
      navigate(-1);
      dispatch(setDefaultState());
    }
  }, [draftBtnClicked]);

  const handleFormSubmit = handleSubmit((values) => {
    values.KeySpeakers = speakers ? speakers : [];
    values.ScheduleDocumentFile = uploadedFiles[0];
    values.Schedules = [];
    Object.entries(scheduleDetails).map(([key, { ScheduleSlots }]) => {
      if (key != 'ScheduleSlots') {
        const newObj = {};
        newObj.Date = key;
        newObj.ScheduleSlots = ScheduleSlots;
        values.Schedules.push(newObj);
      }
    });
    if (createdEventResponse.id) {
      values.Id = createdEventResponse.id;
    }
    if (id) {
      values.Id = id;
      dispatch(saveApiData({ ...values, ...apiResponseData }));
    }
    dispatch(saveScheduleAndSpeakersDetails(values));
    dispatch(updateCreateEvent(values.Id)); // PUT API Call
    if (draftBtnClicked == false) {
      if (basicInfo.RegistrationType == 'Free') {
        if (loading == false) {
          dispatch(setCurrentStep(currentStep + 2));
        }
      } else {
        if (loading == false) {
          dispatch(setCurrentStep(currentStep + 1));
        }
      }
    }
    dispatch(setStepsFormData({ [stepsName.scheduleAndSpeakers.name]: values }));
  });

  return {
    formName: formNameWithDefaultProps(control, errors),
    handleFormSubmit,
    control,
    errors,
    formState,
    reset,
    touched,
    watch,
    setValue,
    setSpeakers,
    speakers,
    uploadedFiles,
    setUploadedFiles,
  };
}
