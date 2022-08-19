import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rawFormValues: {},
  modifiedFormValues: {},
};

export const manageJobSlice = createSlice({
  name: 'manageJob',
  initialState,
  reducers: {
    setRawFormValues: (state, action) => {
      state.rawFormValues = action.payload;
    },
    setModifiedValues: (state, action) => {
      state.modifiedFormValues = action.payload;
    },
  },
});

export const { setRawFormValues, setModifiedValues } = manageJobSlice.actions;

export const selectJobRawFormValues = (state) => state['manageJob'].rawFormValues;
export const selectModifiedJobFormValues = (state) => state['manageJob'].modifiedFormValues;
