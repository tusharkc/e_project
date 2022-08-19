import { DoctForm } from '@doct-react/app';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveApiData,
  saveTicketsDetails,
  selectBasicInfoDetails,
  selectCreateEventResponse,
  selectCurrentStep,
  selectLoading,
  selectResponseData,
  selectSaveAsDraftClicked,
  selectTicketCategory,
  selectTicketsDetails,
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

export default function useFormTickets() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const ticketCategory = useSelector(selectTicketCategory);
  const createdEventResponse = useSelector(selectResponseData);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const BasicInfoDetails = useSelector(selectBasicInfoDetails);
  const draftBtnClicked = useSelector(selectSaveAsDraftClicked);
  const ticketsDetails = useSelector(selectTicketsDetails);
  const loading = useSelector(selectLoading);
  const navigate = useNavigate();

  const [inrTickets, setInrTickets] = useState([]);
  const [usdTickets, setUsdTickets] = useState([]);
  const [editAttendeeValue, setEditAttendeeValue] = useState(ticketsDetails.maxAttendees);
  const [isAttendeevalueChange, setIsAttendeevalueChange] = useState(false);
  const [registrationType, setRegistrationType] = useState('No');
  const [gstRegistration, setGSTRegistration] = useState('false');
  const [tarrif, setTarrif] = useState('');
  const [emptyCategories, setEmptyCategories] = useState(false);

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
    if (Object.keys(ticketCategory).length === 0) {
      setEmptyCategories(true);
    } else {
      if (BasicInfoDetails?.RegistrationType == 'Paid') {
        values.InvoiceDetail = {};
        values.InvoiceDetail.IsGSTRegistration = gstRegistration;
      }
      values.TariffTaxation = tarrif ? tarrif : '';
      values.Tickets = [];
      if (usdTickets?.length >= 1) {
        usdTickets.map((item) => {
          const newObj = {};
          newObj.attendeeType = item.attendeeType;
          newObj.NumberOfSeats = item.numberOfSeats;
          newObj.Currency = 'USD';
          newObj.prices = [];
          Object.entries(item.category).map(([key, { amount }]) => {
            const prices = {};
            prices.category = key;
            prices.amount = amount;
            newObj.prices.push(prices);
          });
          values.Tickets.push(newObj);
        });
        values.ForeignRegistrationRequired = true;
      } else {
        values.ForeignRegistrationRequired = false;
      }
      if (inrTickets?.length >= 1) {
        inrTickets.map((item) => {
          const newObj = {};
          newObj.attendeeType = item.attendeeType;
          newObj.NumberOfSeats = item.numberOfSeats;
          newObj.Currency = 'INR';
          newObj.prices = [];
          Object.entries(item.category).map(([key, { amount }]) => {
            const prices = {};
            prices.category = key;
            prices.amount = amount;
            newObj.prices.push(prices);
          });
          values.Tickets.push(newObj);
        });
      }
      values.maxAttendees = editAttendeeValue ? editAttendeeValue : BasicInfoDetails.maxAttendees;
      if (createdEventResponse?.id) {
        values.Id = createdEventResponse.id;
      }
      if (id) {
        values.Id = id;
        dispatch(saveApiData({ ...values, ...apiResponseData }));
      }
      dispatch(saveTicketsDetails(values));
      dispatch(updateCreateEvent(values.Id)); // PUT API Call
      if (draftBtnClicked == false) {
        if (loading == false) {
          dispatch(setCurrentStep(currentStep + 1));
          dispatch(setStepsFormData({ [stepsName.tickets.name]: values }));
        }
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
    setInrTickets,
    inrTickets,
    usdTickets,
    setUsdTickets,
    setEditAttendeeValue,
    editAttendeeValue,
    isAttendeevalueChange,
    setIsAttendeevalueChange,
    registrationType,
    setRegistrationType,
    gstRegistration,
    setGSTRegistration,
    tarrif,
    setTarrif,
    emptyCategories,
    setEmptyCategories,
  };
}
