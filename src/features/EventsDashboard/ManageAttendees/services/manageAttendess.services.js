import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PER_PAGE_TABLE } from '../../../../constants/constants';
import * as API_ENDPOINT from '../../../../api/apiEndpoints';
import qs from 'qs';

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}${API_ENDPOINT.EVENT_BASE_API_ROUTE}${API_ENDPOINT.BUSINESS_BASE_API_ROUTE}`;

export const attendeesApi = createApi({
  reducerPath: 'attendeesApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Attendees'],
  endpoints: (builder) => ({
    getAttendees: builder.query({
      query: ({ id, query }) => {
        return `${BASE_URL}/${API_ENDPOINT.EVENT}/${id}/${
          API_ENDPOINT.ATTENDEES
        }?pageSize=${PER_PAGE_TABLE}&${qs.stringify(query, { indices: false })}`;
      },
      providesTags: ['Attendees'],
    }),
    updateAttendee: builder.mutation({
      query: (body) => ({
        url: `${BASE_URL}/${API_ENDPOINT.EVENT}/${body?.eventId}/${API_ENDPOINT.ATTENDEES}/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Attendees'],
    }),
  }),
});

export const { useGetAttendeesQuery, useUpdateAttendeeMutation } = attendeesApi;
