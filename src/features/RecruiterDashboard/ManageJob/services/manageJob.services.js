import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BUSINESS_BASE_API_ROUTE, JOBS, JOB_CENTER } from '../../../../api/apiEndpoints';
export const manageJobsApi = createApi({
  reducerPath: 'manageJobsApi',

  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['manageJobsApi'],

  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: ({ formValues }) => ({
        url: `${process.env.REACT_APP_BASE_API_URL}/${JOB_CENTER}${BUSINESS_BASE_API_ROUTE}/${JOBS}`,
        method: 'POST',
        body: formValues,
      }),
    }),

    getJobById: builder.query({
      query: ({ id }) =>
        id &&
        `${process.env.REACT_APP_BASE_API_URL}/${JOB_CENTER}${BUSINESS_BASE_API_ROUTE}/${JOBS}/${id}`,
    }),

    editJob: builder.mutation({
      query: ({ formValues, id }) => ({
        url: `${process.env.REACT_APP_BASE_API_URL}/${JOB_CENTER}${BUSINESS_BASE_API_ROUTE}/${JOBS}/${id}`,
        method: 'PUT',
        body: formValues,
      }),
    }),
  }),
});

export const { usePostJobMutation, useGetJobByIdQuery, useEditJobMutation } = manageJobsApi;
