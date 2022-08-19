import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import * as API_ENDPOINT from '../../../api/apiEndpoints';
import { postSendConfirmationEmail } from './manageRegistration.services';

const SLICE_NAME = 'manageRegistration';

export const fetchDownloadUrl = createAsyncThunk(
  `${SLICE_NAME}/fetchDownloadUrl`,
  async ({ id, orderNumber }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}${API_ENDPOINT.EVENT_BASE_API_ROUTE}${API_ENDPOINT.BUSINESS_BASE_API_ROUTE}/${API_ENDPOINT.EVENT}/${id}/${API_ENDPOINT.REGISTRATIONS}/${orderNumber}/getinvoice`,
    );
    return response.data;
  },
);

export const manageRegistrationSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    loading: false,
    downloadUrl: null,
    selectedEvents: null,
    notifyUserWithToaster: null,
    isLoadingSendConfirmationEmail: false,
  },
  reducers: {
    setSelectedEventsIdCode: (state, action) => {
      state.selectedEvents = action.payload;
    },
    resetNotifyUserWithToaster: (state, action) => {
      state.notifyUserWithToaster = action?.payload || null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDownloadUrl.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDownloadUrl.fulfilled, (state, action) => {
      state.downloadUrl = action?.payload?.invoiceUrl;
      state.loading = false;
    });
    builder.addCase(postSendConfirmationEmail.pending, (state, action) => {
      state.isLoadingSendConfirmationEmail = true;
    });
    builder.addCase(postSendConfirmationEmail.fulfilled, (state, action) => {
      state.isLoadingSendConfirmationEmail = false;
      state.notifyUserWithToaster = {
        variant: 'positive',
        message: 'Confirmation Email sent successfully!',
      };
    });
    builder.addCase(postSendConfirmationEmail.rejected, (state, action) => {
      state.isLoadingSendConfirmationEmail = false;
      state.notifyUserWithToaster = {
        variant: 'danger',
        message: 'Oops! something went wrong',
      };
    });
  },
});

export const { setSelectedEventsIdCode, resetNotifyUserWithToaster } =
  manageRegistrationSlice.actions;

export const selectDownloadInvoiceLoading = (state) => state[SLICE_NAME].loading;
export const selectDownloadUrl = (state) => state[SLICE_NAME].downloadUrl;
export const selectEventsIdCode = (state) => state[SLICE_NAME].selectedEvents;
export const selectNotifyUserWithToaster = (state) => state[SLICE_NAME].notifyUserWithToaster;
export const selectIsLoadingSendConfirmationEmail = (state) =>
  state[SLICE_NAME].isLoadingSendConfirmationEmail;
