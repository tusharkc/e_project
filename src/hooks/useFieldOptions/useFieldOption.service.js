import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONTENT_CENTER } from '../../api/apiEndpoints';

export const fieldOptions = createApi({
  reducerPath: 'fieldOptions',

  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['fieldOptions'],

  endpoints: (builder) => ({
    getDropDownOptions: builder.query({
      query: ({ apiRoute, searchText = '' }) => {
        return `${process.env.REACT_APP_BASE_API_URL}${CONTENT_CENTER}${apiRoute ? apiRoute : ''}${
          searchText && `?SearchText=${searchText} `
        }`;
      },
    }),
  }),
});

export const { useGetDropDownOptionsQuery } = fieldOptions;
