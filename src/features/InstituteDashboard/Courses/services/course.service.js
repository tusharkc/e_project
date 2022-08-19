import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as API_ENDPOINTS from '../../../../api/apiEndpoints';

export const courseApi = createApi({
  reducerPath: 'courseApi',

  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Courses'],

  endpoints: (builder) => ({
    getCourses: builder.query({
      query: ({ status, searchText }) => {
        return `${process.env.REACT_APP_BASE_API_URL}/${API_ENDPOINTS.COURSE_CENTER}${
          API_ENDPOINTS.BUSINESS_BASE_API_ROUTE
        }/${API_ENDPOINTS.COURSES}${status ? `?status=${status}` : ''}${
          searchText ? `?searchText=${searchText}` : ''
        }`;
      },
      providesTags: ['Courses'],
    }),

    updateCourseStatus: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `${process.env.REACT_APP_BASE_API_URL}/${API_ENDPOINTS.COURSE_CENTER}${API_ENDPOINTS.BUSINESS_BASE_API_ROUTE}/${API_ENDPOINTS.COURSES}/${id}/${API_ENDPOINTS.CHANGE_COURSE_STATUS}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Courses'],
    }),

    deleteCourse: builder.mutation({
      query: ({ id }) => ({
        url: `${process.env.REACT_APP_BASE_API_URL}/${API_ENDPOINTS.COURSE_CENTER}${API_ENDPOINTS.BUSINESS_BASE_API_ROUTE}/${API_ENDPOINTS.COURSES}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Courses'],
    }),
  }),
});

export const { useGetCoursesQuery, useUpdateCourseStatusMutation, useDeleteCourseMutation } =
  courseApi;
