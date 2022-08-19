import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as API_ENDPOINTS from '../../../../api/apiEndpoints';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',

  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['Jobs'],

  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({ status, searchText }) => {
        return `${process.env.REACT_APP_BASE_API_URL}/${API_ENDPOINTS.JOB_CENTER}${
          API_ENDPOINTS.BUSINESS_BASE_API_ROUTE
        }/${API_ENDPOINTS.JOBS}${status ? `?status=${status}` : ''}${
          searchText ? `?searchText=${searchText}` : ''
        }`;
      },
      providesTags: ['Jobs'],
    }),

    deleteJobPost: builder.mutation({
      query: ({ id }) => ({
        url: `${process.env.REACT_APP_BASE_API_URL}/${API_ENDPOINTS.JOB_CENTER}${API_ENDPOINTS.BUSINESS_BASE_API_ROUTE}/${API_ENDPOINTS.JOBS}/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Jobs'],
    }),

    refreshJob: builder.mutation({
      query: ({ id }) => ({
        url: `${process.env.REACT_APP_BASE_API_URL}/${API_ENDPOINTS.JOB_CENTER}${API_ENDPOINTS.BUSINESS_BASE_API_ROUTE}/${API_ENDPOINTS.JOBS}/${id}/${API_ENDPOINTS.REFRESH_JOB}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Jobs'],
    }),
    changeJobStatus: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `${process.env.REACT_APP_BASE_API_URL}/${API_ENDPOINTS.JOB_CENTER}${API_ENDPOINTS.BUSINESS_BASE_API_ROUTE}/${API_ENDPOINTS.JOBS}/${id}/${API_ENDPOINTS.JOBS_CHANGE_STATUS}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Jobs'],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useDeleteJobPostMutation,
  useChangeJobStatusMutation,
  useRefreshJobMutation,
} = jobsApi;
