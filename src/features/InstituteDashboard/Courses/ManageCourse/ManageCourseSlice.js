import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formValues: {},
  rawFormValues: {},
};

export const manageCourseSlice = createSlice({
  name: 'manageCourse',
  initialState,
  reducers: {
    setInstituteCourseFormValues: (state, action) => {
      state.formValues = action.payload;
    },
    setRawFormValues: (state, action) => {
      state.rawFormValues = action.payload;
    },
  },
});

export const { setRawFormValues, setInstituteCourseFormValues } = manageCourseSlice.actions;

export const selectCourseFormValues = (state) => state['manageCourse'].formValues;
export const selectRawFormValues = (state) => state['manageCourse'].rawFormValues;
