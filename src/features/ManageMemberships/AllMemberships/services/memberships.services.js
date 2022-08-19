import { createAsyncThunk } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import * as API_ENDPOINT from '../../../../api/apiEndpoints';

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}${API_ENDPOINT.ENTERPRISE_BASE_API_ROUTE}${API_ENDPOINT.BUSINESS_BASE_API_ROUTE}`;

export const membershipsApi = createApi({
  reducerPath: 'membershipsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    memberships: builder.query({
      query: () => '/memberships',
    }),

    getMembershipsData: builder.query({
      query: ({ id }) => `/membership/${id}`,
    }),
  }),
});

export const { useMembershipsQuery, useGetMembershipsDataQuery, useDeleteMemberQuery } =
  membershipsApi;

export const deleteMember = async ({ memberId, membershipId }) => {
  const response = await axios({
    url: `${BASE_URL}/membership/${membershipId}/member/${memberId}`,
    method: 'delete',
  }).then((response) => {});
};

export const deleteMembership = async (id) => {
  const url = `${BASE_URL}/membership/${id}`;
  const response = await axios({
    url: url,
    method: 'delete',
  }).then((response) => {
    window.location.reload();
  });
};

export const changeMembershipStatus = async (id, status) => {
  const url = `${BASE_URL}/membership/${id}/change-status`;
  let formData = new FormData();

  formData.append('status', status);

  try {
    await axios({
      method: 'put',
      url,
      data: {
        status: status,
      },
    }).then((response) => {
      window.location.reload();
    });
  } catch (error) {
    console.log(error);
  }
};
