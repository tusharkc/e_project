import { Routes, Route, useLocation } from 'react-router-dom';

import { LayoutDashboard, MangeLayout } from '../layout';

import {
  QuickAccess,
  eventPageSidebar,
  Events,
  Registration,
  InvoicesSummary,
  ManageAttendees,
  ComplementaryRegistration,
  OfflineRegistration,
  CreateEvent,
  TalentAcquisition,
  ErrorInInquiry,
  InquiryApplicationSentSuccessfully,
  Editmembership,
  institutePageSidebar,
  ManageCourseForm,
  InstituteCoursesListing,
  InstituteCourseApplicants,
  PreviewCourse,
  recruiterPageSidebar,
  RecruiterJobListing,
  RecruiterJobApplicant,
  RecruiterPostAJob,
  PreviewJob,
} from '../features';

import { AuthWrapper } from '../components';
import * as ROUTE from './constant';
import { LandingPage } from '../features/LandingPage';
import { EventLandingPage } from '../features/EventsLandingPage';
import { AllMemberships, ManageDirectory, membersPageSidebar } from '../features/ManageMemberships';
import { NewMemberShipPlanCreationForm } from '../features/ManageMemberships/NewMembershipPlanCreation/NewMemberShipPlanCreationForm';
import { AddNewMemberForm } from '../features/ManageMemberships/AddNewMember';
import { EditMemberForm } from '../features/ManageMemberships/EditMember';
import useExcludeHeaderPathname from '../hooks/useExcludeHeaderPathname';
import CourseSuccessPage from '../features/InstituteDashboard/Courses/ManageCourse/components/onPostSuccess/CourseSuccessPage';
import CourseFailurePage from '../features/InstituteDashboard/Courses/ManageCourse/components/onPostFail/CourseFailurePage';
import JobPostSuccess from '../features/RecruiterDashboard/ManageJob/components/JobApplicationStatusPages/JobPostSuccess';
import JobPostFailure from '../features/RecruiterDashboard/ManageJob/components/JobApplicationStatusPages/JobPostFailure';

export default function AppRoutes() {
  const { excludeHeaderPathnames } = useExcludeHeaderPathname();

  const location = useLocation();

  const { pathname } = location;

  return (
    <Routes>
      <Route path={ROUTE.HOME} element={<LandingPage />} />

      <Route path={ROUTE.EVENT_LANDING_PAGE} element={<EventLandingPage />} />

      <Route
        path={`${ROUTE.TALENT_ACQUISITION_SERVICES}/${ROUTE.TALENT_ACQUISITION_ERROR_IN_INQUIRY}`}
        element={<ErrorInInquiry />}
      />

      <Route
        path={`/${ROUTE.TALENT_ACQUISITION_SERVICES}/${ROUTE.TALENT_ACQUISITION_INQUIRY_APPLICATION_SENT_SUCCESSFULLY}`}
        element={<InquiryApplicationSentSuccessfully />}
      />

      <Route path={`/${ROUTE.TALENT_ACQUISITION_SERVICES}`} element={<TalentAcquisition />} />

      <Route
        path={ROUTE.DASHBOARD}
        element={
          <AuthWrapper>
            <LayoutDashboard
              showHeader={excludeHeaderPathnames.includes(pathname) ? false : true}
            />
          </AuthWrapper>
        }
      >
        {/* {Add New Member start} */}
        <Route path={ROUTE.ADD_NEW_MEMBER} element={<AddNewMemberForm />} />
        {/* {Add New Member end} */}
        <Route path={ROUTE.EDIT_MEMBER} element={<EditMemberForm />} />
        <Route index element={<QuickAccess />} />
        {/* Event Dashboard */}
        <Route
          path={`${ROUTE.EVENTS}`}
          element={<MangeLayout sideBar={eventPageSidebar(pathname)} />}
        >
          <Route path={`${ROUTE.EVENTS_ALL}`} element={<Events />} />
          <Route path={`${ROUTE.REGISTRATION}`} element={<Registration />} />
          <Route path={`${ROUTE.INVOICES_SUMMARY}`} element={<InvoicesSummary />} />
          <Route path={`${ROUTE.MANAGE_ATTENDEES}`} element={<ManageAttendees />} />
        </Route>
        <Route
          path={`${ROUTE.MANAGE_MEMBERSHIPS}`}
          element={<MangeLayout sideBar={membersPageSidebar(pathname)} />}
        >
          <Route path={`${ROUTE.ALL_MEMBERSHIPS}`} element={<AllMemberships />} />
          <Route path={`${ROUTE.MANAGE_DIRECTORY}`} element={<ManageDirectory />} />
        </Route>
        <Route
          path={`${ROUTE.CREATE_NEW_MEMBERSHIP}`}
          element={<NewMemberShipPlanCreationForm />}
        />
        <Route path={`${ROUTE.EDIT_MEMBERSHIP}`} element={<Editmembership />} />
        {/* Recruiter Dashboard */}
        <Route
          path={`/${ROUTE.MANAGE_EVENTS_REGISTRATION_COMPLEMENTARY}`}
          element={
            <AuthWrapper>
              <ComplementaryRegistration />
            </AuthWrapper>
          }
        />
        <Route
          path={`/${ROUTE.MANAGE_EVENTS_REGISTRATION_OFFLINE}`}
          element={
            <AuthWrapper>
              <OfflineRegistration />
            </AuthWrapper>
          }
        />
        {/* INSTITUTE DASHBOARD ROUTES */}
        <Route
          path={ROUTE.INSTITUTE_DASHBOARD}
          element={<MangeLayout sideBar={institutePageSidebar(pathname)} />}
        >
          <Route path={ROUTE.INSTITUTE_COURSES} element={<InstituteCoursesListing />} />

          <Route path={ROUTE.INSTITUTE_APPLICANTS} element={<InstituteCourseApplicants />} />
        </Route>
        <Route
          path={`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_ADD_COURSE}`}
          element={<ManageCourseForm />}
        />
        <Route
          path={`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/:id/${ROUTE.INSTITUTE_EDIT_COURSE}`}
          element={<ManageCourseForm />}
        />
        <Route
          path={`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/:id/${ROUTE.PREVIEW_COURSE}`}
          element={<PreviewCourse showClosPreviewHeader />}
        />
        <Route
          path={`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.COURSE_ACTION_SUCCSSFUL}`}
          element={<CourseSuccessPage />}
        />
        <Route
          path={`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.ERROR_IN_COURSE_ACTION}`}
          element={<CourseFailurePage />}
        />
        {/* INSTITUTE DASHBOARD ROUTES END */}

        {/* RECRUITER DASHBOARD ROUTE START */}

        <Route
          path={ROUTE.RECRUITERS_DASHBOARD}
          element={<MangeLayout sideBar={recruiterPageSidebar(pathname)} />}
        >
          <Route path={ROUTE.POSTING} element={<RecruiterJobListing />} />
          <Route path={ROUTE.JOB_APPLICANTS} element={<RecruiterJobApplicant />} />
        </Route>

        <Route
          path={`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.POST_A_JOB}`}
          element={<RecruiterPostAJob />}
        />

        <Route
          path={`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/:id/${ROUTE.EDIT_JOB}`}
          element={<RecruiterPostAJob />}
        />

        <Route
          path={`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.JOB_PREVIEW}/:id`}
          element={<PreviewJob showClosPreviewHeader />}
        />

        <Route
          path={`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.JOB_SUBMITTED}/:id`}
          element={<JobPostSuccess />}
        />

        <Route
          path={`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.JOB_FAILED}/:id`}
          element={<JobPostFailure />}
        />
      </Route>
      <Route
        path={`${ROUTE.DASHBOARD}/${ROUTE.EVENTS}/${ROUTE.CREATE_EVENT}`}
        element={
          <AuthWrapper>
            <CreateEvent />
          </AuthWrapper>
        }
      />

      <Route
        path={`${ROUTE.DASHBOARD}/${ROUTE.EVENTS}/:id/edit`}
        element={
          <AuthWrapper>
            <CreateEvent />
          </AuthWrapper>
        }
      />
    </Routes>
  );
}
