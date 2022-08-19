export const EVENT_BASE_API_ROUTE = '/eventcenter';
export const ENTERPRISE_BASE_API_ROUTE = '/enterprisecenter';
export const BUSINESS_BASE_API_ROUTE = '/tenant';
export const CONTENT_CENTER = '/contentcenter';

// landing page
export const STATISTICS_DATA = 'kpis/all';

export const EVENT = 'events';
export const SUMMARY = 'summary';
export const INVOICES = 'invoices';
export const REGISTRATIONS = 'registrations';
export const ATTENDEES = 'attendees';
export const ORDERS = 'orders';
export const BILLING_INFORMATION = 'billing-information';

const OFFLINE_REGISTER = 'offline';
const COMPLEMENTARY_REGISTER = 'complementary';

// content center
export const COUNTRY = 'country';

// event center
export const API_EVENT_DETAIL = (code) =>
  `${process.env.REACT_APP_BASE_API_URL}${EVENT_BASE_API_ROUTE}/${EVENT}/${code}`;

export const API_REGISTRATION_AMOUNT = (id) =>
  `${process.env.REACT_APP_BASE_API_URL}${EVENT_BASE_API_ROUTE}/${EVENT}/${id}/registrationamount`;

export const API_SEND_CONFIRMATION_EMAIL = (id) =>
  `${process.env.REACT_APP_BASE_API_URL}${EVENT_BASE_API_ROUTE}${BUSINESS_BASE_API_ROUTE}/${EVENT}/${id}/${REGISTRATIONS}/send-confirmation-email`;

export const API_UPDATE_BILLING_DETAIL = (id, billingId) =>
  `${process.env.REACT_APP_BASE_API_URL}${EVENT_BASE_API_ROUTE}${BUSINESS_BASE_API_ROUTE}/${EVENT}/${id}/${BILLING_INFORMATION}/${billingId}`;

export const API_VALIDATE_REGISTRATION = (id) =>
  `${process.env.REACT_APP_BASE_API_URL}${EVENT_BASE_API_ROUTE}${BUSINESS_BASE_API_ROUTE}/${EVENT}/${id}/registrations/validateoffline`;

export const API_REGISTER_EVENT_OFFLINE = (id) =>
  `${process.env.REACT_APP_BASE_API_URL}${EVENT_BASE_API_ROUTE}${BUSINESS_BASE_API_ROUTE}/${EVENT}/${id}/${REGISTRATIONS}/${OFFLINE_REGISTER}`;

export const API_REGISTER_EVENT_COMPLEMENTARY = (id) =>
  `${process.env.REACT_APP_BASE_API_URL}${EVENT_BASE_API_ROUTE}${BUSINESS_BASE_API_ROUTE}/${EVENT}/${id}/${REGISTRATIONS}/${COMPLEMENTARY_REGISTER}`;

// course center
export const COURSE_CENTER = 'coursecenter';
export const COURSES = 'courses';
export const CHANGE_COURSE_STATUS = 'change-status';

// Job Center
export const JOB_CENTER = 'jobcenter';
export const JOBS = 'jobs';
export const JOBS_CHANGE_STATUS = 'change-status';

export const JOB_APPLICANT = 'applicants';
export const REFRESH_JOB = 'refresh-job';
// Create Event Base Url
export const CREATE_EVENT_BASE_URL = `${process.env.REACT_APP_BASE_API_URL}${EVENT_BASE_API_ROUTE}${BUSINESS_BASE_API_ROUTE}/${EVENT}`;
