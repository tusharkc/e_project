import { DoctForm } from '@doct-react/app';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchEventById,
  saveApiData,
  saveTermsAndPoliciesDetails,
  selectCreateEventResponse,
  selectCurrentStep,
  selectLoading,
  selectResponseData,
  selectSaveAsDraftClicked,
  selectTermsAndPoliciesDetails,
  setCurrentStep,
  setDefaultState,
  setStepsFormData,
} from '../../../createEvent.slice';
import { updateCreateEvent } from '../../../services/CreateEventServices';
import { useNavigate } from 'react-router-dom';
import stepsName from '../stepsName';

const formNameWithDefaultProps = (control, errors) => {
  return {
    termsAndCondition: {
      name: 'Metadata.termsAndCondition',
      control,
      placeholder: `Describe terms and conditions (optional)`,
    },
    cancellationAndRefundPolicy: {
      name: 'Metadata.cancellationPolicy',
      control,
      placeholder: `Describe policies here (optional)`,
    },
    remarks: {
      name: 'Metadata.remarks',
      control,
      placeholder: `Describe (optional)`,
    },
  };
};

export default function useFormTermsPolicies() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const teamsAndPolicies = useSelector(selectTermsAndPoliciesDetails);
  const createdEventResponse = useSelector(selectResponseData);
  const loading = useSelector(selectLoading);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const { id } = useParams();
  const draftBtnClicked = useSelector(selectSaveAsDraftClicked);
  const navigate = useNavigate();

  useEffect(() => {
    if (id == undefined) return;
    dispatch(fetchEventById(id));
  }, [id]);

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

  useEffect(() => {
    if (Object.keys(apiResponseData).length) {
      if (id == undefined) return;
      const value = { ...apiResponseData };
      value['Metadata.termsAndCondition'] = value.metaData?.termsAndCondition;
      value['Metadata.cancellationPolicy'] = value.metaData?.cancellationPolicy;
      value['Metadata.remarks'] = value.metaData?.remarks;
      reset({ ...teamsAndPolicies, ...value });
    }
    if (Object.keys(teamsAndPolicies).length) {
      reset({ ...teamsAndPolicies });
    }
  }, [apiResponseData]);

  const handleFormSubmit = handleSubmit((values) => {
    if (createdEventResponse?.id) {
      values.Id = createdEventResponse.id;
    }
    if (id) {
      values.Id = id;
      dispatch(saveApiData({ ...values, ...apiResponseData }));
    }
    dispatch(saveTermsAndPoliciesDetails(values));
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
  };
}
