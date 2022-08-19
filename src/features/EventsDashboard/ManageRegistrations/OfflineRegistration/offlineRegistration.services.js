import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  API_REGISTER_EVENT_OFFLINE,
  API_REGISTRATION_AMOUNT,
  API_VALIDATE_REGISTRATION,
} from '../../../../api/apiEndpoints';

import {
  filterNullArrayOfObj,
  prepareAttendees,
  prepareBillingDetails,
} from '../../../../helper/helperFunction';

const OFFLINE_REGISTRATION_SLICE = 'offlineRegistration';

const fetchRegistrationAmount = createAsyncThunk(
  `${OFFLINE_REGISTRATION_SLICE}/registrationamount`,
  async (_, { getState }) => {
    const { offlineRegistration: { ticketsInformation, eventDetails: { id } = {} } = {} } =
      getState();

    const postData = {
      tickets: [],
    };

    ticketsInformation.map(({ id, count }) => {
      postData.tickets.push({
        id,
        quantity: count,
      });
    });

    const response = await axios.post(API_REGISTRATION_AMOUNT(id), postData);
    return response.data;
  },
);

const validateRegistration = createAsyncThunk(
  `${OFFLINE_REGISTRATION_SLICE}/validateregistration`,
  async (_, { getState }) => {
    const {
      offlineRegistration: { eventDetails: { id } = {}, listOfAttendees, billingDetails } = {},
    } = getState();

    const response = await axios.post(API_VALIDATE_REGISTRATION(id), {
      attendees: prepareAttendees(listOfAttendees),
      billingDetails: prepareBillingDetails(billingDetails),
      callbackUrl: '/dashboard/events/registration/:id/register/offline',
    });
    return response.data;
  },
);

const registerEvent = createAsyncThunk(
  `${OFFLINE_REGISTRATION_SLICE}/registerEvent`,
  async (_, { getState }) => {
    const {
      offlineRegistration: {
        eventDetails: { id } = {},
        billingDetails,
        attendeesBillingDetailsValidated: { attendees } = {},
        paymentRemark,
      } = {},
    } = getState();

    const response = await axios.post(API_REGISTER_EVENT_OFFLINE(id), {
      attendees: filterNullArrayOfObj(attendees),
      billingDetails: prepareBillingDetails(billingDetails),
      paymentRemark,
    });

    return response.data;
  },
);

export { fetchRegistrationAmount, validateRegistration, registerEvent };
