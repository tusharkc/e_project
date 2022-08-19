import { DoctForm } from '@doct-react/app';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEventById,
  saveApiData,
  saveBasicInfoDetails,
  selectApiRecord,
  selectBasicInfoDetails,
  selectCreateEventResponse,
  selectCurrentStep,
  selectLoading,
  selectResponseData,
  selectSaveAsDraftClicked,
  selectStepsFormData,
  selectTicketsDetails,
  setCurrentStep,
  setDefaultState,
  setStepsFormData,
} from '../../../createEvent.slice';
import stepsName from '../stepsName';
import dayjs from 'dayjs';

import { useNavigate, useParams } from 'react-router-dom';
import { postCreateEvent, updateCreateEvent } from '../../../services/CreateEventServices';

const defaultValue = {
  country: {
    label: 'India',
    value: 1,
  },
};

export default function useFormBasicInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const stepsFormData = useSelector(selectStepsFormData);
  const BasicInfoDetails = useSelector(selectBasicInfoDetails);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const createdEventResponse = useSelector(selectResponseData);
  const loading = useSelector(selectLoading);
  const response = useSelector(selectApiRecord);
  const draftBtnClicked = useSelector(selectSaveAsDraftClicked);
  const navigate = useNavigate();
  const ticketsDetails = useSelector(selectTicketsDetails);

  const [Participants, setParticipants] = useState('Public');
  const [numberOfGathering, setNumberOfGathering] = useState('Limited');
  const [registrationType, setRegistrationType] = useState('Paid');
  const [locationValue, setLocationValue] = useState(null);

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
      const apiValues = { ...apiResponseData };
      if (apiValues.venue) {
        apiValues.addressLine1 = apiValues.venue.addressLine1;
        apiValues.postalCode = apiValues.venue.pincode;
      }
      apiValues.state = { label: apiValues.venue.state, value: apiValues.stateId };
      apiValues.city = { label: apiValues.venue.city, value: apiValues.cityId };
      if (apiValues.type) {
        apiValues.eventType = {
          label: apiValues.type?.replace(/([A-Z])/g, ' $1').trim(),
          value: apiValues.type,
        };
      }
      if (apiValues.startDate) {
        apiValues.StartTime = apiValues?.startDate;
        apiValues.startDate = new Date(apiValues.startDate);
      }

      if (apiValues.endDate) {
        apiValues.EndTime = apiValues?.endDate;
        apiValues.endDate = new Date(apiValues.endDate);
      }

      if (apiValues.eventPaymentType) {
        setRegistrationType(apiValues.eventPaymentType);
      }
      if (apiValues.numberOfGathering) {
        setNumberOfGathering(apiValues.numberOfGathering);
      }
      if (apiValues.participant) {
        setParticipants(apiValues.participant);
      }
      if (apiValues.creditPoints) {
        apiValues.CreditPoints = apiValues.creditPoints;
      }
      if (apiValues.creditPointsApprovedBy) {
        apiValues.CreditPointsApprovedBy = apiValues.creditPointsApprovedBy;
      }

      reset({ ...defaultValue, ...apiValues, ...ticketsDetails });
      dispatch(saveApiData(apiValues));
    } else if (Object.keys(BasicInfoDetails).length) {
      const values = { ...BasicInfoDetails };
      if (values.VenueAddress) {
        values.addressLine1 = values.VenueAddress;
      }
      if (values.Type) {
        values.eventType = {
          label: values.Type?.replace(/([A-Z])/g, ' $1').trim(),
          value: values.Type,
        };
      }
      if (values.startDate) {
        values.StartTime = values?.startDate;
        values.startDate = new Date(values?.startDate);
      }
      if (values.endDate) {
        values.EndTime = values?.endDate;
        values.endDate = new Date(values?.endDate);
      }
      const locationObj = {
        state: { label: values.state.label, value: values.state.value },
        city: { label: values.city.label, value: values.CityId },
      };
      setLocationValue(locationObj);
      // if (values.maxAttendees) {
      //   values.maxAttendees = values.maxAttendees;
      // }
      if (values.RegistrationType) {
        setRegistrationType(values.RegistrationType);
      }
      if (values.NumberOfGathering) {
        setNumberOfGathering(values.NumberOfGathering);
      }
      if (values.Participant) {
        setParticipants(values.Participant);
      }
      reset({ ...defaultValue, ...values, ...ticketsDetails });
    } else {
      reset(defaultValue);
    }
  }, [apiResponseData, BasicInfoDetails]);

  useEffect(() => {
    if (id == undefined) return;
    dispatch(fetchEventById(id));
    dispatch(setDefaultState());
  }, [id]);

  const handleFormSubmit = handleSubmit((values) => {
    values.Type = values.eventType?.value;
    delete values.eventType;
    values.RegistrationType = registrationType;
    values.Participant = Participants;
    values.NumberOfGathering = numberOfGathering;
    if (numberOfGathering == 'Unlimited') {
      values.maxAttendees = null;
    } else {
      values.maxAttendees = values.maxAttendees ? Number(values.maxAttendees) : '';
    }
    if (values.startDate) {
      if (values.StartTime) {
        values.startDate =
          dayjs(values.startDate).format('YYYY-MM-DDTHH:mm:ss').split('T')[0] +
          'T' +
          dayjs(values.StartTime).format('YYYY-MM-DDTHH:mm:ss').split('T')[1];
      } else {
        values.startDate = dayjs(values.startDate).format('YYYY-MM-DDTHH:mm:ss');
      }
    }
    if (values.endDate) {
      if (values.EndTime) {
        values.endDate =
          dayjs(values.endDate).format('YYYY-MM-DDTHH:mm:ss').split('T')[0] +
          'T' +
          dayjs(values.EndTime).format('YYYY-MM-DDTHH:mm:ss').split('T')[1];
      } else {
        values.endDate = dayjs(values.endDate).format('YYYY-MM-DDTHH:mm:ss');
      }
    }
    if (values.onlineRegistrationthroughDocthubPortal == true) {
      values.RegistrationProcess = 'OnlineRegistrationThroughDocthub';
    }
    delete values.offlineAndComplimentaryRegistration;
    delete values.onlineRegistrationthroughDocthubPortal;
    values.CountryId = values.country.value;
    values.StateId = values.state.value;
    values.CityId = values.city.value;
    values.VenueAddress = values.addressLine1;
    delete values.addressLine1;
    values.IsPartneredEvent = true;
    values.status = apiResponseData?.status ? apiResponseData?.status : 'Draft';

    // delete values.startTime;
    // delete values.endTime;

    const omitNullVal = {};

    Object.keys(values).map((key) => {
      if (values[key]) {
        omitNullVal[key] = values[key];
      }
    });

    dispatch(saveBasicInfoDetails(values));
    if (id) {
      values.Id = id;
      if (values.RegistrationType == 'Free') {
        values.InvoiceDetails = null;
        values.Paymentsettlement = null;
      }
      dispatch(saveApiData({ ...values, ...apiResponseData }));
      dispatch(updateCreateEvent(values.Id)); // PUT Call
    } else if (createdEventResponse.id) {
      values.Id = createdEventResponse.id;
      dispatch(updateCreateEvent(values.Id)); // PUT Call
    } else {
      dispatch(postCreateEvent()); // POST Call
    }

    if (loading == false) {
      dispatch(setCurrentStep(currentStep + 1));
      dispatch(setStepsFormData({ [stepsName.basicInfo.name]: values }));
    }
  });

  return {
    handleFormSubmit,
    control,
    errors,
    formState,
    reset,
    touched,
    watch,
    setValue,
    setParticipants,
    Participants,
    setNumberOfGathering,
    numberOfGathering,
    registrationType,
    setRegistrationType,
    locationValue,
  };
}
