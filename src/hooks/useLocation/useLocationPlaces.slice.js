import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const SLICE_NAME = 'useLocationSlice';

export const useLocationPlacesSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    loading: false,
    state: {},
    city: {},
    // downloadUrl: null,
    // selectedEvents: null,
  },
  reducers: {
    // setSelectedEventsIdCode: (state, action) => {
    //   state.selectedEvents = action.payload;
    // },
  },
});

export const { setSelectedEventsIdCode } = useLocationPlacesSlice.actions;

// export const selectDownloadInvoiceLoading = (state) => state[SLICE_NAME].loading;
// export const selectDownloadUrl = (state) => state[SLICE_NAME].downloadUrl;
// export const selectEventsIdCode = (state) => state[SLICE_NAME].selectedEvents;

export default useLocationPlacesSlice;
