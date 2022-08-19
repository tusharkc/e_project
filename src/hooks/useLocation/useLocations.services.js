import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CONTENT_CENTER, COUNTRY } from '../../api/apiEndpoints';

export const locationPlacesApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BASE_API_URL}${CONTENT_CENTER}` }),
  endpoints: (builder) => ({
    getCountry: builder.query({
      query: () => `/${COUNTRY}`,
    }),
  }),
});

export const { useGetCountryQuery } = locationPlacesApi;
