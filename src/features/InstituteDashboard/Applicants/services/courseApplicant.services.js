import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as API_ENDPOINTS from '../../../../api/apiEndpoints';

export const courseApplicantApi = createApi({
  reducerPath: 'courseApplicantApi',

  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['CourseApplicant'],

  endpoints: (builder) => ({
    getApplicantData: builder.query({
      query: ({ id, searchText }) =>
        id &&
        `${process.env.REACT_APP_BASE_API_URL}/${API_ENDPOINTS.COURSE_CENTER}${
          API_ENDPOINTS.BUSINESS_BASE_API_ROUTE
        }/${API_ENDPOINTS.COURSES}/${id}/applicants${
          searchText ? `?searchText=${searchText}` : ''
        }`,
    }),
    providesTags: ['CourseApplicant'],
  }),
});

export const { useGetApplicantDataQuery } = courseApplicantApi;
