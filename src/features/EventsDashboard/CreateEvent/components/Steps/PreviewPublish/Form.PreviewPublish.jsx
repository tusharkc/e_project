import { DoctForm } from '@doct-react/app';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchEventById,
  savePreviewAndPublished,
  selectCreateEventResponse,
  selectCurrentStep,
  selectResponseData,
  setCurrentStep,
  setStepsFormData,
} from '../../../createEvent.slice';
import { updateCreateEvent } from '../../../services/CreateEventServices';
import stepsName from '../stepsName';

const formNameWithDefaultProps = (control, errors) => {
  return {};
};

export default function useFormPreviewPublish() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const createdEventResponse = useSelector(selectResponseData);
  const apiResponseData = useSelector(selectCreateEventResponse);

  const { handleSubmit, control, errors, formState, reset, touched, watch, setValue } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  useEffect(() => {
    if (id == undefined) return;
    dispatch(fetchEventById(id));
  }, [id]);

  useEffect(() => {
    if (createdEventResponse.id == undefined) return;
    dispatch(fetchEventById(createdEventResponse.id));
  }, [createdEventResponse]);

  const handleFormSubmit = handleSubmit((values) => {
    if (createdEventResponse?.id) {
      values.Id = createdEventResponse.id;
      values.status = 'ActivationRequested';
    }
    if (id) {
      values.Id = id;
      if (apiResponseData.status == 'Draft') {
        values.status = 'ActivationRequested';
      } else {
        values.status = apiResponseData.status;
      }
    }
    dispatch(savePreviewAndPublished(values));
    dispatch(updateCreateEvent(values.Id)); // PUT API Call
    dispatch(setStepsFormData({ [stepsName.previewAndPublish.name]: values }));
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
  };
}
