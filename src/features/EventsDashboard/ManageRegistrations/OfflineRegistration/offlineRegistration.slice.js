import { createSlice } from '@reduxjs/toolkit';

import {
  fetchRegistrationAmount,
  registerEvent,
  validateRegistration,
} from './offlineRegistration.services';
import { fetchEventDetails } from '../manageRegistration.services';

import { uid, updateObjectInArray } from '../../../../helper/helperFunction';

export const OFFLINE_REGISTRATION_SLICE = 'offlineRegistration';

const INITIAL_STATE = {
  activeStep: 0,
  ticketsInformation: [],
  listOfAttendees: [],
  expandedAccordionIndex: 0,
  isSelectedTickets: false,
  loadingTotalAmount: false,
  loadingEvents: false,
  loadingValidateRegistration: false,
  eventDetails: {},
  billingDetails: {},
  attendeesBillingDetailsValidated: {},
  amount: {},
  paymentRemark: {},
  onGoingPriceCategory: null,
  loadingOrder: false,
  showError: false,
  orderDetails: null,
  errorValidateRegistration: false,
};

export const offlineRegistrationReducer = createSlice({
  name: OFFLINE_REGISTRATION_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    setDefaultState: (state) => {
      state.activeStep = 0;
      state.isSelectedTickets = false;
      state.listOfAttendees = [];
      state.attendeesBillingDetailsValidated = {};
      state.ticketsInformation = [];
      state.billingDetails = {};
      state.eventDetails = {};
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
      window.scrollTo(0, 0);
    },
    addTicketInformation: (state, action) => {
      const { ticketsInformation: ticketsInformationState } = state;
      const ticketsInformation = [...updateObjectInArray(ticketsInformationState, action.payload)];

      state.ticketsInformation = ticketsInformation;
      state.isSelectedTickets = true;
      state.expandedAccordionIndex = 0;
    },
    removeTicketInformation: (state, action) => {
      const ticketsInformation = [
        ...state.ticketsInformation.filter((ticket) => ticket.id !== action.payload.id),
      ];
      state.ticketsInformation = ticketsInformation;
      state.isSelectedTickets = !!ticketsInformation?.length;
    },
    prepareListOfAttendees: (state, action) => {
      const { eventDetails: { tickets } = {} } = state;

      const array = state.ticketsInformation.reduce((prevValue, currentObj) => {
        const arrayFromNumberOfCountOfTicket = [...Array(currentObj?.count)].map((_, i, array) => {
          let obj = {};

          function prepareTitle() {
            if (array?.length > 1) {
              return `${currentObj?.name} Attendee ${i + 1}`;
            }
            return `${currentObj?.name} Attendee`;
          }

          if (state.listOfAttendees?.length) {
            // listOfAttendees is available when user back from further steps
            const hasFilledDetails = state.listOfAttendees
              .filter((el) => el.details)
              .filter(({ type }) => type == currentObj?.attendeeType);

            obj.details = hasFilledDetails[i]?.details;
          }

          let ticketsOfAttendee = tickets.find(
            ({ name }) => name.toLowerCase() == currentObj?.name.toLowerCase(),
          );

          ticketsOfAttendee.quantity = 1;

          return {
            title: prepareTitle(),
            id: currentObj.id,
            uid: uid(),
            price: currentObj.prices,
            ticketsOfAttendee,
            name: `${currentObj.name}${i + 1}`,
            type: currentObj.name,
            ...obj,
          };
        });

        return [...prevValue, ...arrayFromNumberOfCountOfTicket];
      }, []);

      const indexOfFilledData = array.findIndex(
        ({ details }) => !Object.keys(details || {})?.length,
      );

      const filledAttendeeDetailsCount = array.reduce((prev, next) => {
        if (Object.keys(next?.details || {})?.length) {
          prev = prev + 1;
        }
        return prev;
      }, 0);

      if (array.length == filledAttendeeDetailsCount) {
        // When all details saved (user back on 1st step with fill value on 2nd step)
        state.expandedAccordionIndex = null;
      } else {
        state.expandedAccordionIndex = indexOfFilledData > -1 ? indexOfFilledData : 0;
      }

      state.listOfAttendees = array;
    },
    onRemoveAttendee: (state, action) => {
      state.listOfAttendees = state.listOfAttendees.filter(
        (obj) => obj.title != action.payload.title,
      );

      state.ticketsInformation = state.ticketsInformation.map((el) => {
        if (el.id == action.payload.id) el.count = el.count - 1;
        return el;
      });

      state.ticketsInformation = state.ticketsInformation.filter((el) => el.count);

      const indexOfFilledData = state.listOfAttendees.findIndex(
        ({ details }) => !Object.keys(details || {})?.length,
      );

      state.expandedAccordionIndex = indexOfFilledData > -1 ? indexOfFilledData : null;
    },
    saveAttendeeDetail: (state, action) => {
      state.listOfAttendees = state.listOfAttendees.map((el) => {
        if (el.uid == action.payload.uid) {
          el.details = action.payload.values;
        }
        return el;
      });

      const indexOfFilledData = state.listOfAttendees.findIndex(
        ({ details }) => !Object.keys(details || {})?.length,
      );

      state.expandedAccordionIndex = indexOfFilledData > -1 ? indexOfFilledData : null;
    },
    handleAccordionIndex: (state, action) => {
      const indexOfFilledData = state.listOfAttendees.findIndex(
        ({ details }) => !Object.keys(details || {})?.length,
      );

      if (action.payload?.isEditForm) {
        state.expandedAccordionIndex = action.payload.index;
      } else {
        state.expandedAccordionIndex = indexOfFilledData > -1 ? indexOfFilledData : null;
      }
    },
    saveBillingDetails: (state, action) => {
      state.billingDetails = action.payload;
    },
    saveRemarks: (state, action) => {
      state.paymentRemark = action.payload;
    },
    setShowError: (state, action) => {
      state.showError = action.payload;
    },
    setValidateRegistrationError: (state, action) => {
      state.errorValidateRegistration = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRegistrationAmount.pending, (state, action) => {
      state.loadingTotalAmount = true;
    });
    builder.addCase(fetchRegistrationAmount.rejected, (state, action) => {
      state.loadingTotalAmount = false;
    });
    builder.addCase(fetchRegistrationAmount.fulfilled, (state, action) => {
      state.loadingTotalAmount = false;
      state.amount = action.payload.amount;
    });

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

    builder.addCase(validateRegistration.pending, (state, action) => {
      state.loadingValidateRegistration = true;
    });
    builder.addCase(validateRegistration.rejected, (state, action) => {
      state.loadingValidateRegistration = false;
      state.errorValidateRegistration = true;
    });
    builder.addCase(validateRegistration.fulfilled, (state, action) => {
      state.loadingValidateRegistration = false;
      state.attendeesBillingDetailsValidated = action.payload;
      state.activeStep = 3;
    });

    builder.addCase(registerEvent.pending, (state, action) => {
      state.loadingOrder = true;
    });
    builder.addCase(registerEvent.rejected, (state, action) => {
      state.loadingOrder = false;
      state.showError = true;
    });
    builder.addCase(registerEvent.fulfilled, (state, action) => {
      state.loadingOrder = false;
      state.orderDetails = action.payload;
      state.activeStep = 4;
    });
  },
});

export const {
  setDefaultState,
  setActiveStep,
  addTicketInformation,
  removeTicketInformation,
  prepareListOfAttendees,
  onRemoveAttendee,
  saveAttendeeDetail,
  handleAccordionIndex,
  saveBillingDetails,
  saveRemarks,
  setShowError,
  setValidateRegistrationError,
} = offlineRegistrationReducer.actions;

export const selectTicketsInformation = (state) =>
  state[OFFLINE_REGISTRATION_SLICE].ticketsInformation;

export const selectListOfAttendees = (state) => state[OFFLINE_REGISTRATION_SLICE].listOfAttendees;

export const selectActiveStep = (state) => state[OFFLINE_REGISTRATION_SLICE].activeStep;

export const selectExpandedAccordionIndex = (state) =>
  state[OFFLINE_REGISTRATION_SLICE].expandedAccordionIndex;

export const selectIsSelectedTickets = (state) =>
  state[OFFLINE_REGISTRATION_SLICE].isSelectedTickets;

export const selectIsEventLoading = (state) => state[OFFLINE_REGISTRATION_SLICE].loadingEvents;

export const selectEventDetails = (state) => state[OFFLINE_REGISTRATION_SLICE].eventDetails;

export const selectOnGoingPriceCategory = (state) =>
  state[OFFLINE_REGISTRATION_SLICE].onGoingPriceCategory;

export const selectAmount = (state) => state[OFFLINE_REGISTRATION_SLICE].amount;

export const selectLoadingValidateRegistration = (state) =>
  state[OFFLINE_REGISTRATION_SLICE].loadingValidateRegistration;

export const selectBillingDetailsValidated = (state) =>
  state[OFFLINE_REGISTRATION_SLICE].attendeesBillingDetailsValidated;

export const selectLoadingTotalAmount = (state) =>
  state[OFFLINE_REGISTRATION_SLICE].loadingTotalAmount;

export const selectBillingDetails = (state) => state[OFFLINE_REGISTRATION_SLICE].billingDetails;

export const selectLoadingOrder = (state) => state[OFFLINE_REGISTRATION_SLICE].loadingOrder;
export const selectOrderDetails = (state) => state[OFFLINE_REGISTRATION_SLICE].orderDetails;
export const selectShowError = (state) => state[OFFLINE_REGISTRATION_SLICE].showError;

export const selectErrorValidateRegistration = (state) =>
  state[OFFLINE_REGISTRATION_SLICE].errorValidateRegistration;

export default offlineRegistrationReducer;
