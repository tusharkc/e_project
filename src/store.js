import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import {
  eventApi,
  offlineRegistrationReducer,
  registrationsApi,
  attendeesApi,
  manageRegistrationSlice,
  complementaryRegistrationSlice,
  manageCourseApi,
  courseApi,
  courseApplicantApi,
  createEventSlice,
} from './features';

import { appApi, appSlice } from './components/App';
import { membersApi } from './features/ManageMemberships/ManageDirectory/services/members.services';
import { membershipsApi } from './features/ManageMemberships/AllMemberships/services/memberships.services';
import { useLocationSlice } from './hooks';
import { locationPlacesApi } from './hooks/useLocation';
import { manageCourseSlice } from './features/InstituteDashboard/Courses/ManageCourse/ManageCourseSlice';
import { fieldOptions } from './hooks/useFieldOptions/useFieldOption.service';
import { manageJobSlice } from './features/RecruiterDashboard/ManageJob/slice/manageJobSlice';
import { jobsApi } from './features/RecruiterDashboard/JobListing/services/jobs.services';
import { manageJobsApi } from './features/RecruiterDashboard/ManageJob/services/manageJob.services';
import { recruiterApplicantApi } from './features/RecruiterDashboard/JobApplicants/service/recruiterApplicants.service';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    manageCourse: manageCourseSlice.reducer,
    manageJob: manageJobSlice.reducer,
    [membersApi.reducerPath]: membersApi.reducer,
    [membershipsApi.reducerPath]: membershipsApi.reducer,
    [appApi.reducerPath]: appApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [registrationsApi.reducerPath]: registrationsApi.reducer,
    [attendeesApi.reducerPath]: attendeesApi.reducer,
    [locationPlacesApi.reducerPath]: locationPlacesApi.reducer,
    [fieldOptions.reducerPath]: fieldOptions.reducer,
    [manageCourseApi.reducerPath]: manageCourseApi.reducer,
    [manageJobsApi.reducerPath]: manageJobsApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [courseApplicantApi.reducerPath]: courseApplicantApi.reducer,
    [recruiterApplicantApi.reducerPath]: recruiterApplicantApi.reducer,
    offlineRegistration: offlineRegistrationReducer.reducer,
    complementaryRegistration: complementaryRegistrationSlice.reducer,
    manageRegistration: manageRegistrationSlice.reducer,
    locations: useLocationSlice.reducer,
    createEvent: createEventSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      appApi.middleware,
      eventApi.middleware,
      locationPlacesApi.middleware,
      fieldOptions.middleware,
      attendeesApi.middleware,
      registrationsApi.middleware,
      courseApi.middleware,
      courseApplicantApi.middleware,
      jobsApi.middleware,
      recruiterApplicantApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);
