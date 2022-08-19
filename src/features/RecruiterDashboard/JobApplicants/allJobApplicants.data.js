import * as ROUTE from '../../../routes/constant';

const recruiterDashboardAllJobApplicantPageActionBar = {
  [`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.JOB_APPLICANTS}`]: {
    pathname: `/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.JOB_APPLICANTS}`,
    title: 'Recruiter Dashboard',
    navigateButtonLink: '/dashboard/recruiter/post-a-job',
    buttonText: 'Post a Job',
    buttonIcon: 'plus',
    isButtonDisabled: false,
  },
};

export default recruiterDashboardAllJobApplicantPageActionBar;
