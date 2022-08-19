import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_REGISTER_EVENT_COMPLEMENTARY } from '../../../../api/apiEndpoints';

export const COMPLEMENTARY_REGISTRATION_SLICE = 'complementaryRegistration';

export const registerEvent = createAsyncThunk(
  `${COMPLEMENTARY_REGISTRATION_SLICE}/registerEvent`,
  async (_, { getState }) => {
    const {
      complementaryRegistration: {
        eventDetails: { id } = {},
        attendeeDetails,
        selectedTickets,
        remarks,
      },
    } = getState();

    let transformAttendee = { ...attendeeDetails };
    transformAttendee = {
      ...transformAttendee,
      city: transformAttendee?.city?.label,
      state: transformAttendee?.state?.label,
      country: transformAttendee?.country?.label,
      phoneNo: {
        countryCode: transformAttendee?.mobileCountryCode?.label,
        number: transformAttendee?.mobileNumber,
      },
      whatsAppNumber: {
        countryCode: transformAttendee?.whatsappCountryCode?.label,
        number: transformAttendee?.whatsAppNumber,
      },
    };

    delete transformAttendee.mobileNumberAsWhatsApp;
    delete transformAttendee.whatsappCountryCode;

    const dataForPost = {
      attendees: [{ ...transformAttendee, ticket: { ...selectedTickets, quantity: 1 } }],
      remarks,
    };

    const response = await axios.post(API_REGISTER_EVENT_COMPLEMENTARY(id), dataForPost);

    return response.data;
  },
);
