import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BUSINESS_BASE_API_ROUTE,
  JOBS,
  JOB_APPLICANT,
  JOB_CENTER,
} from '../../../../api/apiEndpoints';

export const recruiterApplicantApi = createApi({
  reducerPath: 'recruiterApplicantApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['recruiterApplicantApi'],

  endpoints: (builder) => ({
    getApplicants: builder.query({
      query: ({ jobId, status, searchText }) =>
        jobId &&
        `${
          process.env.REACT_APP_BASE_API_URL
        }/${JOB_CENTER}${BUSINESS_BASE_API_ROUTE}/${JOBS}/${jobId}/${JOB_APPLICANT}${
          status ? `?status=${status}` : ''
        }${searchText ? `?searchText=${searchText}` : ''}`,
    }),

    updateStatus: builder.mutation({
      query: ({ id, userId, updatedStatus }) => ({
        url: `${process.env.REACT_APP_BASE_API_URL}/${JOB_CENTER}${BUSINESS_BASE_API_ROUTE}/${JOBS}/${id}/${JOB_APPLICANT}/${userId}/change-status`,
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: updatedStatus,
      }),

      invalidatesTags: ['recruiterApplicantApi'],
    }),
  }),
});

export const { useGetApplicantsQuery, useUpdateStatusMutation } = recruiterApplicantApi;
