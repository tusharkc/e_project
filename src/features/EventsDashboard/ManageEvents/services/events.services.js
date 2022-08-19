import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as API_ENDPOINT from '../../../../api/apiEndpoints';

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}${API_ENDPOINT.EVENT_BASE_API_ROUTE}${API_ENDPOINT.BUSINESS_BASE_API_ROUTE}`;

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagsTypes: ['Events'],

  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => API_ENDPOINT.EVENT,
      providesTags: ['Events'],
    }),
    getEvents: builder.query({
      query: (query) =>
        query.status ? `${API_ENDPOINT.EVENT}?status=${query.status}` : API_ENDPOINT.EVENT,
      providesTags: ['Events'],
    }),
    getEventById: builder.query({
      query: (query) => query.id && `${API_ENDPOINT.EVENT}/${query.id}`,
      providesTags: ['Events'],
    }),
  }),
});

export const { useGetEventsQuery, useGetAllEventsQuery, useGetEventByIdQuery } = eventApi;
