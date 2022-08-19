import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API_ENDPOINT from '../../../../api/apiEndpoints';
import { serialize } from 'object-to-formdata';

const postCreateEvent = createAsyncThunk(`postCreateEvent`, async (_, { getState }) => {
  const { createEvent: { basicInfo } = {} } = getState();
  const formData = new FormData();
  Object.keys(basicInfo).map((item) => {
    formData.append(`${item}`, `${basicInfo[item]}`);
  });
  const response = await axios.post(API_ENDPOINT.CREATE_EVENT_BASE_URL, formData);
  return response.data;
});

const updateCreateEvent = createAsyncThunk(`updateCreateEvent`, async (Id, { getState }) => {
  const {
    createEvent: {
      apiData,
      basicInfo,
      responseData,
      registartionDetails,
      ticketCategory,
      ticketsDetails,
      scheduleAndSpeakersDetails,
      paymentAndInvoice,
      sponsorsAndExhibitorsDetails,
      termsPolicies,
      previewAndPublished,
      saveAsDraft,
    } = {},
  } = getState();

  const formData = serialize(
    {
      ...apiData,
      ...basicInfo,
      ...responseData,
      ...registartionDetails,
      ...ticketCategory,
      ...ticketsDetails,
      ...scheduleAndSpeakersDetails,
      ...paymentAndInvoice,
      ...sponsorsAndExhibitorsDetails,
      ...termsPolicies,
      ...previewAndPublished,
      ...saveAsDraft,
    },
    { indices: true, dotsForObjectNotation: true, nullsAsUndefineds: true },
  );

  const response = await axios.put(`${API_ENDPOINT.CREATE_EVENT_BASE_URL}/${Id}`, formData);
  return response.data;
});

export { postCreateEvent, updateCreateEvent };
