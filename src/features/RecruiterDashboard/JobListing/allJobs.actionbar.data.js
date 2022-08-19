import * as ROUTE from '../../../routes/constant';

const recruiterDashboardAllJobsPageActionBar = {
  [`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.POSTING}`]: {
    pathname: `/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.POSTING}`,
    title: 'Recruiter Dashboard',
    navigateButtonLink: '/dashboard/recruiter/post-a-job',
    buttonText: 'Post a Job',
    buttonIcon: 'plus',
    isButtonDisabled: false,
  },
};

export default recruiterDashboardAllJobsPageActionBar;
