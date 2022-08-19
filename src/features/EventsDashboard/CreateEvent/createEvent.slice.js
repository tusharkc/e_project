import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_EVENT_BASE_URL } from '../../../api/apiEndpoints';
import { postCreateEvent, updateCreateEvent } from './services/CreateEventServices';

const SLICE_NAME = 'createEvent';

export const fetchEventById = createAsyncThunk(`${SLICE_NAME}/fetchEventById`, async (Id) => {
  const response = await axios.get(`${CREATE_EVENT_BASE_URL}/${Id}`);
  return response.data;
});

const initialState = {
  currentStep: 1,
  totalSteps: 7,
  loading: false,
  showError: false,
  stepsFormData: {},
  basicInfo: {},
  registartionDetails: {},
  paymentAndInvoice: {},
  sponsorsDetails: {},
  exhibitorsDetails: {},
  membersDetails: {},
  ticketCategory: {},
  indianTicket: {},
  foreignTicket: {},
  responseData: {},
  termsPolicies: {},
  speakersDetails: {},
  scheduleDetails: {},
  ticketsDetails: {},
  scheduleAndSpeakersDetails: {},
  sponsorsAndExhibitorsDetails: {},
  createEventResponse: {},
  apiData: {},
  supportersDetails: {},
  stepBlocked: false,
  previewAndPublished: {},
  saveAsDraftClicked: false,
};

export const createEventSlice = createSlice({
  name: 'createEvent',
  initialState,
  reducers: {
    setDefaultState: (state) => {
      state.currentStep = 1;
      state.basicInfo = {};
      state.registartionDetails = {};
      state.paymentAndInvoice = {};
      state.sponsorsDetails = {};
      state.exhibitorsDetails = {};
      state.membersDetails = {};
      state.ticketCategory = {};
      state.indianTicket = {};
      state.foreignTicket = {};
      state.responseData = {};
      state.termsPolicies = {};
      state.speakersDetails = {};
      state.scheduleDetails = {};
      state.ticketsDetails = {};
      state.scheduleAndSpeakersDetails = {};
      state.sponsorsAndExhibitorsDetails = {};
      state.createEventResponse = {};
      state.supportersDetails = {};
      state.stepBlocked = false;
      state.previewAndPublished = {};
      state.saveAsDraftClicked = false;
      state.apiData = {};
      state.stepsFormData = {};
      state.loading = false;
      state.showError = false;
    },
    setCurrentStep: (state, actions) => {
      state.currentStep = actions.payload;
    },
    setStepsFormData: (state, actions) => {
      state.stepsFormData = { ...state.stepsFormData, ...actions.payload };
    },
    savePaymentAndInvoice: (state, action) => {
      state.paymentAndInvoice = { ...action.payload };
    },
    saveSponsorsDetails: (state, action) => {
      const transformPayload = {
        ...action.payload,
        sponsorPictureFile: action.payload.sponsorPictureFile?.[0],
      };
      state.sponsorsDetails = { ...transformPayload };
    },
    saveExhibitorsDetails: (state, action) => {
      state.exhibitorsDetails = { ...action.payload };
    },
    saveMembersDetails: (state, action) => {
      const transformPayload = {
        ...action.payload,
        pictureFile: action.payload.pictureFile?.[0],
      };
      state.membersDetails = { ...transformPayload };
    },
    saveTicketCategory: (state, action) => {
      state.ticketCategory = { ...action.payload };
    },
    indianTicket: (state, action) => {
      state.indianTicket = { ...action.payload };
    },
    foreignTicket: (state, action) => {
      state.foreignTicket = { ...action.payload };
    },
    saveBasicInfoDetails: (state, action) => {
      state.basicInfo = { ...action.payload };
    },
    saveRegistartionDetails: (state, action) => {
      state.registartionDetails = { ...action.payload };
    },
    saveTermsAndPoliciesDetails: (state, action) => {
      state.termsPolicies = { ...action.payload };
    },
    saveSpeakersDetails: (state, action) => {
      const transformPayload = {
        ...action.payload,
        keySpeakerProfileFile: action.payload.keySpeakerProfileFile?.[0],
      };
      state.speakersDetails = { ...transformPayload };
    },
    saveScheduleDetails: (state, action) => {
      state.scheduleDetails = { ...action.payload };
    },
    saveTicketsDetails: (state, action) => {
      state.ticketsDetails = { ...action.payload };
    },
    saveScheduleAndSpeakersDetails: (state, action) => {
      state.scheduleAndSpeakersDetails = { ...action.payload };
    },
    saveSponsorsAndExhibitorsDetails: (state, action) => {
      state.sponsorsAndExhibitorsDetails = { ...action.payload };
    },
    saveApiData: (state, action) => {
      state.apiData = { ...action.payload };
    },
    saveSupportersDetails: (state, action) => {
      const transformPayload = {
        ...action.payload,
        SupportedByPictureFile: action.payload.SupportedByPictureFile?.[0],
      };
      state.supportersDetails = { ...transformPayload };
    },
    setShowError: (state, action) => {
      state.showError = action.payload;
    },
    savePreviewAndPublished: (state, action) => {
      state.previewAndPublished = action.payload;
    },
    saveSaveAsDraft: (state, action) => {
      state.saveAsDraftClicked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postCreateEvent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postCreateEvent.rejected, (state, action) => {
      state.loading = false;
      state.showError = true;
    });
    builder.addCase(postCreateEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.responseData = action.payload;
    });
    builder.addCase(updateCreateEvent.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCreateEvent.rejected, (state, action) => {
      state.loading = false;
      state.showError = true;
      if (state.currentStep == 7) {
        state.stepBlocked = true;
      }
      if (state.currentStep > 7) {
        state.stepBlocked = true;
      }
    });
    builder.addCase(updateCreateEvent.fulfilled, (state, action) => {
      state.loading = false;
      if (state.currentStep == 7) {
        state.stepBlocked = false;
      }
      if (state.currentStep > 7) {
        state.stepBlocked = false;
      }
    });
    builder.addCase(fetchEventById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchEventById.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchEventById.fulfilled, (state, action) => {
      state.createEventResponse = action.payload;
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setDefaultState,
  setCurrentStep,
  setStepsFormData,
  savePaymentAndInvoice,
  saveSponsorsDetails,
  saveExhibitorsDetails,
  saveMembersDetails,
  saveTicketCategory,
  indianTicket,
  foreignTicket,
  saveBasicInfoDetails,
  saveRegistartionDetails,
  saveTermsAndPoliciesDetails,
  saveSpeakersDetails,
  saveScheduleDetails,
  saveTicketsDetails,
  saveScheduleAndSpeakersDetails,
  saveSponsorsAndExhibitorsDetails,
  saveApiData,
  saveSupportersDetails,
  setShowError,
  savePreviewAndPublished,
  saveSaveAsDraft,
} = createEventSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectLoading = (state) => state[SLICE_NAME]?.loading;
export const selectCurrentStep = (state) => state[SLICE_NAME].currentStep;
export const selectTotalSteps = (state) => state[SLICE_NAME].totalSteps;
export const selectStepsFormData = (state) => state[SLICE_NAME].stepsFormData;
export const selectPaymentAndInvoice = (state) => state[SLICE_NAME]?.paymentAndInvoice;
export const selectSponsorsDetails = (state) => state[SLICE_NAME]?.sponsorsDetails;
export const selectExhibitorsDetails = (state) => state[SLICE_NAME]?.exhibitorsDetails;
export const selectMembersDetails = (state) => state[SLICE_NAME]?.membersDetails;
export const selectTicketCategory = (state) => state[SLICE_NAME]?.ticketCategory;
export const selectIndianTicket = (state) => state[SLICE_NAME]?.indianTicket;
export const selectForeignTicket = (state) => state[SLICE_NAME]?.foreignTicket;
export const selectBasicInfoDetails = (state) => state[SLICE_NAME]?.basicInfo;
export const selectRegistartionDetails = (state) => state[SLICE_NAME]?.registartionDetails;
export const selectResponseData = (state) => state[SLICE_NAME].responseData;
export const selectTermsAndPoliciesDetails = (state) => state[SLICE_NAME]?.termsPolicies;
export const selectSpeakerDetails = (state) => state[SLICE_NAME]?.speakersDetails;
export const selectScheduleDetails = (state) => state[SLICE_NAME]?.scheduleDetails;
export const selectTicketsDetails = (state) => state[SLICE_NAME]?.ticketsDetails;
export const selectScheduleAndSpeakersDetails = (state) =>
  state[SLICE_NAME]?.scheduleAndSpeakersDetails;
export const selectSponsorsAndExhibitorsDetails = (state) =>
  state[SLICE_NAME]?.sponsorsAndExhibitorsDetails;
export const selectCreateEventResponse = (state) => state[SLICE_NAME]?.createEventResponse;
export const selectApiRecord = (state) => state[SLICE_NAME]?.apiData;
export const selectSupporterDetails = (state) => state[SLICE_NAME]?.supportersDetails;
export const selectShowError = (state) => state[SLICE_NAME].showError;
export const selectStepBlocked = (state) => state[SLICE_NAME].stepBlocked;
export const selectPreviewAndPublished = (state) => state[SLICE_NAME].previewAndPublished;
export const selectSaveAsDraftClicked = (state) => state[SLICE_NAME].saveAsDraftClicked;

export default createEventSlice;
