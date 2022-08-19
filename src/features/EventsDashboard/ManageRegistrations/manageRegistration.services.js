import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { PER_PAGE_TABLE } from '../../../constants/constants';
import * as API_ENDPOINT from '../../../api/apiEndpoints';
import { initDownloadInvoice, successDownloadInvoice } from './manageRegistration.slice';
import qs from 'qs';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}${API_ENDPOINT.EVENT_BASE_API_ROUTE}${API_ENDPOINT.BUSINESS_BASE_API_ROUTE}`;

export const fetchEventDetails = createAsyncThunk(`manageRegistration/events`, async (code) => {
  const response = await axios.get(API_ENDPOINT.API_EVENT_DETAIL(code));
  return response.data;
});

export const postSendConfirmationEmail = createAsyncThunk(
  `manageRegistration/sendConfirmationEmail`,
  async ({ id, body }) => {
    const response = await axios.post(API_ENDPOINT.API_SEND_CONFIRMATION_EMAIL(id), body);
    return response.data;
  },
);

export const registrationsApi = createApi({
  reducerPath: 'registrationsApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Registrations'],
  endpoints: (builder) => ({
    getRegistrations: builder.query({
      query: ({ id, query }) => {
        return `${BASE_URL}/${API_ENDPOINT.EVENT}/${id}/${
          API_ENDPOINT.REGISTRATIONS
        }?pageSize=${PER_PAGE_TABLE}&${qs.stringify(query, { indices: false })}`;
      },
      providesTags: ['Registrations'],
    }),
    getRegistrationsOrderDetails: builder.query({
      query: ({ id, orderId }) => {
        return `${BASE_URL}/${API_ENDPOINT.EVENT}/${id}/${API_ENDPOINT.REGISTRATIONS}/${orderId}`;
      },
    }),
    updateBillingDetails: builder.mutation({
      query: ({ eventId, billingId, body }) => ({
        url: API_ENDPOINT.API_UPDATE_BILLING_DETAIL(eventId, billingId),
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Registrations'],
    }),
  }),
});

export const {
  useGetRegistrationsQuery,
  useGetRegistrationsOrderDetailsQuery,
  useDownloadOrderDetailQuery,
  useUpdateBillingDetailsMutation,
} = registrationsApi;
