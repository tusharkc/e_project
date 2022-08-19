import { createSlice } from '@reduxjs/toolkit';

import { fetchEventDetails } from '../manageRegistration.services';
import { registerEvent } from './complementaryRegistration.services';

export const COMPLEMENTARY_REGISTRATION_SLICE = 'complementaryRegistration';

const INITIAL_STATE = {
  activeStep: 0,
  loadingEvents: false,
  eventDetails: {},
  attendeeDetails: {},
  selectedTickets: {},
  onGoingPriceCategory: null,
  remarks: null,
  loadingOrder: false,
  showError: false,
  showConfirmationModal: false,
  orderDetails: {},
};

export const slice = createSlice({
  name: COMPLEMENTARY_REGISTRATION_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    setDefaultState: (state) => {
      state.activeStep = 0;
      state.attendeeDetails = {};
      state.selectedTickets = {};
      state.remarks = {};
      state.eventDetails = {};
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
      window.scrollTo(0, 0);
    },
    setSelectedTicket: (state, action) => {
      const findSelectedTicketObjBasedOnId = state.eventDetails?.tickets?.find(
        ({ id }) => id == action.payload,
      );
      state.selectedTickets = findSelectedTicketObjBasedOnId;
    },
    saveAttendeeDetails: (state, action) => {
      state.attendeeDetails = action.payload;
    },
    saveRemarks: (state, action) => {
      state.remarks = action.payload;
    },
    setShowConfirmationPopup: (state, action) => {
      state.showConfirmationModal = action.payload;
    },
    setShowError: (state, action) => {
      state.showError = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchEventDetails.pending, (state, action) => {
      state.loadingEvents = true;
    });
    builder.addCase(fetchEventDetails.rejected, (state, action) => {
      state.loadingEvents = false;
    });
    builder.addCase(fetchEventDetails.fulfilled, (state, action) => {
      state.loadingEvents = false;
      state.eventDetails = action.payload;
      const { activePriceType } = action.payload;
      state.onGoingPriceCategory = activePriceType?.name;
    });

    builder.addCase(registerEvent.pending, (state, action) => {
      state.loadingOrder = true;
    });
    builder.addCase(registerEvent.rejected, (state, action) => {
      state.loadingOrder = false;
      state.showError = true;
      state.showConfirmationModal = false;
    });
    builder.addCase(registerEvent.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.orderDetails = action.payload;
      state.activeStep = 3;
      state.showConfirmationModal = false;
    });
  },
});

export const {
  setActiveStep,
  setSelectedTicket,
  saveAttendeeDetails,
  saveRemarks,
  setShowConfirmationPopup,
  setShowError,
  setDefaultState,
} = slice.actions;

export const selectLoadingEvents = (state) => state[COMPLEMENTARY_REGISTRATION_SLICE].loadingEvents;
export const selectActiveStep = (state) => state[COMPLEMENTARY_REGISTRATION_SLICE].activeStep;
export const selectEventDetails = (state) => state[COMPLEMENTARY_REGISTRATION_SLICE].eventDetails;
export const selectSelectedTickets = (state) =>
  state[COMPLEMENTARY_REGISTRATION_SLICE].selectedTickets;
export const selectOnGoingPriceCategory = (state) =>
  state[COMPLEMENTARY_REGISTRATION_SLICE].onGoingPriceCategory;
export const selectAttendeeDetails = (state) =>
  state[COMPLEMENTARY_REGISTRATION_SLICE].attendeeDetails;
export const selectLoadingOrder = (state) => state[COMPLEMENTARY_REGISTRATION_SLICE].loadingOrder;
export const selectOrderDetails = (state) => state[COMPLEMENTARY_REGISTRATION_SLICE].orderDetails;
export const selectShowError = (state) => state[COMPLEMENTARY_REGISTRATION_SLICE].showError;
export const selectShowConfirmationModal = (state) =>
  state[COMPLEMENTARY_REGISTRATION_SLICE].showConfirmationModal;

export default slice;
