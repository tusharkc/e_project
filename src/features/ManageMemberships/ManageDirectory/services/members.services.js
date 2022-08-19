import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PER_PAGE_TABLE } from '../../../../constants/constants';
import * as API_ENDPOINT from '../../../../api/apiEndpoints';
import qs from 'qs';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}${API_ENDPOINT.ENTERPRISE_BASE_API_ROUTE}${API_ENDPOINT.BUSINESS_BASE_API_ROUTE}`;

export const membersApi = createApi({
  reducerPath: 'membersApi',

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
    members: builder.query({
      query: ({ query }) => {
        return `/membership/members?pageSize=${PER_PAGE_TABLE}&${qs.stringify(query, {
          indices: false,
        })}`;
      },
    }),

    getFilterDataOptions: builder.query({
      query: () => '/membership/members',
    }),
  }),
});

export const { useGetFilterDataOptionsQuery, useMembersQuery } = membersApi;

export const putMemberStatus = async (membershipId, memberId, status) => {
  const PUT_URL = `${process.env.REACT_APP_BASE_API_URL}${API_ENDPOINT.ENTERPRISE_BASE_API_ROUTE}${API_ENDPOINT.BUSINESS_BASE_API_ROUTE}/membership/${membershipId}/member/${memberId}/change-status`;
  await axios({
    method: 'put',
    url: PUT_URL,
    data: {
      status: status,
    },
  }).then(() => {
    window.location.reload();
  });
};

export const downloadMemberDetails = async (downloadType, organizationName = '') => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}${API_ENDPOINT.ENTERPRISE_BASE_API_ROUTE}${API_ENDPOINT.BUSINESS_BASE_API_ROUTE}/membership/member/summary?downloadtype=${downloadType}`,
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${organizationName}_members_directory.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (e) {
    console.log(e);
  }
};

export const uploadMemberExcel = async (fileToUpload) => {
  try {
    let formData = new FormData();
    formData.append('uploadMemberExcel', fileToUpload);
    const url = `${process.env.REACT_APP_BASE_API_URL}${API_ENDPOINT.ENTERPRISE_BASE_API_ROUTE}${API_ENDPOINT.BUSINESS_BASE_API_ROUTE}/membership/memberupload`;
    const response = await axios({
      method: 'post',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.log(error);
  }
};
