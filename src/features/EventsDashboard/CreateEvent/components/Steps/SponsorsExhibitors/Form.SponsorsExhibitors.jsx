import { DoctForm } from '@doct-react/app';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveApiData,
  saveSpeakersAndscheduleDetails,
  saveSponsorsAndExhibitorsDetails,
  selectCreateEventResponse,
  selectCurrentStep,
  selectExhibitorsDetails,
  selectLoading,
  selectResponseData,
  selectSaveAsDraftClicked,
  selectSponsorsDetails,
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

export default function useFormSponsorsExhibitors() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const sponsorDetails = useSelector(selectSponsorsDetails);
  const exhibitorsDetails = useSelector(selectExhibitorsDetails);
  const createdEventResponse = useSelector(selectResponseData);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const loading = useSelector(selectLoading);
  const draftBtnClicked = useSelector(selectSaveAsDraftClicked);
  const navigate = useNavigate();

  const [exhibitors, setExhibitors] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [exhibitorLayout, setExhibitorLayout] = useState([]);

  const { handleSubmit, control, errors, formState, reset, touched, watch, setValue } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  useEffect(() => {
    if (draftBtnClicked == true) {
      handleFormSubmit();
      navigate(-1);
      dispatch(setDefaultState());
    }
  }, [draftBtnClicked]);

  const handleFormSubmit = handleSubmit((values) => {
    values.Sponsors = sponsors;
    values.Exhibitors = exhibitors;
    if (createdEventResponse?.id) {
      values.Id = createdEventResponse.id;
    }
    if (id) {
      values.Id = id;
      dispatch(saveApiData({ ...values, ...apiResponseData }));
    }
    dispatch(saveSponsorsAndExhibitorsDetails(values));
    dispatch(updateCreateEvent(values.Id)); // PUT API Call
    if (draftBtnClicked == false) {
      if (loading == false) {
        dispatch(setCurrentStep(currentStep + 1));
        dispatch(setStepsFormData({ [stepsName.sponsorsAndExhibitors.name]: values }));
      }
    }
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
    setExhibitors,
    exhibitors,
    setSponsors,
    sponsors,
    exhibitorLayout,
    setExhibitorLayout,
  };
}
