export const HOME = '/';
export const EVENT_LANDING_PAGE = 'create-an-event';
export const MANAGE_MEMBERSHIPS = 'manage-memberships';
export const CREATE_NEW_MEMBERSHIP = `new-memberships`;

export const DASHBOARD = 'dashboard';
export const INSTITIUTE = 'institute';

// Branding/ Promotional page

export const QUICK_ACCESS = 'quick-access';

// Event Dashboard
export const EVENTS = 'events';
export const EVENTS_ALL = 'all';
export const REGISTRATION = 'registration';
export const INVOICES_SUMMARY = 'invoice-summary';
export const MANAGE_ATTENDEES = 'manage-attendees';
export const COMPLEMENTARY = 'register/complementary';
export const OFFLINE_REGISTRATION = 'register/offline';
export const CREATE_EVENT = 'new';

export const ROUTE_CALLBACK_PAY = 'pay';

export const ALL_MEMBERSHIPS = 'all-memberships';
export const MANAGE_DIRECTORY = 'manage-directory';

export const TALENT_ACQUISITION_SERVICES = 'talent-acquisition-services';
export const TALENT_ACQUISITION_INQUIRY_APPLICATION_SENT_SUCCESSFULLY =
  'inquiry-application-sent-successfully';
export const TALENT_ACQUISITION_ERROR_IN_INQUIRY = 'error-in-inquiry';

export const MANAGE_EVENTS = `/${DASHBOARD}/${EVENTS}/${EVENTS_ALL}`;
export const MANAGE_EVENTS_REGISTRATION = `/${DASHBOARD}/${EVENTS}/${REGISTRATION}`;
export const MANAGE_MEMBERSHIPS_ALL_MEMBERSHIP = `/${DASHBOARD}/${MANAGE_MEMBERSHIPS}/${ALL_MEMBERSHIPS}`;
export const MANAGE_MEMBERSHIPS_MANAGE_DIRECTORY = `/${DASHBOARD}/${MANAGE_MEMBERSHIPS}/${MANAGE_DIRECTORY}`;

export const MANAGE_EVENTS_REGISTRATION_COMPLEMENTARY = `${DASHBOARD}/${EVENTS}/${REGISTRATION}/:code/${COMPLEMENTARY}`;
export const MANAGE_EVENTS_REGISTRATION_OFFLINE = `${DASHBOARD}/${EVENTS}/${REGISTRATION}/:code/${OFFLINE_REGISTRATION}`;

export const MANAGE_MANAGE_ATTENDEES = `/${DASHBOARD}/${EVENTS}/${MANAGE_ATTENDEES}`;
export const MANAGE_INVOICE_SUMMARY = `/${DASHBOARD}/${EVENTS}/${INVOICES_SUMMARY}`;
export const PATH_CREATE_EVENT = `/${DASHBOARD}/${EVENTS}/${CREATE_EVENT}`;

export const ADD_NEW_MEMBER = 'add-member';

export const EDIT_MEMBERSHIP = 'edit-membership';

export const EDIT_MEMBER = 'edit-member';

// INSTITUTE DASHBOARD ROUTES

export const INSTITUTE = 'institute';
export const INSTITUTE_DASHBOARD = `${INSTITUTE}`;
export const INSTITUTE_COURSES = 'courses';
export const INSTITUTE_APPLICANTS = 'applicants';
export const INSTITUTE_ADD_COURSE = 'add-course';
export const INSTITUTE_EDIT_COURSE = 'edit';
export const PREVIEW_COURSE = 'preview-course';
export const COURSE_ACTION_SUCCSSFUL = 'course-posted-successfully';
export const ERROR_IN_COURSE_ACTION = 'error-while-posting';

// RECRUITER'S DASHBOARD ROUTE

export const RECRUITER = 'recruiter';
export const POSTING = 'posting';
export const RECRUITERS_DASHBOARD = `${RECRUITER}`;
export const JOB_APPLICANTS = 'job-applicant';
export const POST_A_JOB = 'post-a-job';
export const EDIT_JOB = 'edit';
export const JOB_PREVIEW = 'job-preview';
export const JOB_SUBMITTED = 'job-submitted';
export const JOB_FAILED = 'job-failed';
