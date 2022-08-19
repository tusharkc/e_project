import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BUSINESS_BASE_API_ROUTE,
  CONTENT_CENTER,
  COURSES,
  COURSE_CENTER,
} from '../../../../../api/apiEndpoints';

export const manageCourseApi = createApi({
  reducerPath: 'manageCourseApi',

  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['manageCourseApi'],

  endpoints: (builder) => ({
    getCourseDetalsById: builder.query({
      query: ({ id }) => {
        return (
          id &&
          `${process.env.REACT_APP_BASE_API_URL}/${COURSE_CENTER}${BUSINESS_BASE_API_ROUTE}/${COURSES}/${id}`
        );
      },
    }),

    addCourse: builder.mutation({
      query: ({ formValues }) => ({
        url: `${process.env.REACT_APP_BASE_API_URL}/${COURSE_CENTER}${BUSINESS_BASE_API_ROUTE}/${COURSES}`,
        method: 'POST',
        body: formValues,
      }),
    }),

    editCourse: builder.mutation({
      query: ({ formValues, id }) => ({
        url: `${process.env.REACT_APP_BASE_API_URL}/${COURSE_CENTER}${BUSINESS_BASE_API_ROUTE}/${COURSES}/${id}`,
        method: 'PUT',
        body: formValues,
      }),
    }),
  }),
});

export const { useEditCourseMutation, useGetCourseDetalsByIdQuery, useAddCourseMutation } =
  manageCourseApi;
