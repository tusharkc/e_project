import * as ROUTE from '../../../routes/constant';

const instituteDashboardApplicantsPageActionBar = {
  [`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_APPLICANTS}`]: {
    pathname: `${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_APPLICANTS}`,
    title: 'Institute Dashboard',
    navigateButtonLink: '/dashboard/institute/add-course',
    buttonText: 'List a Course',
    buttonIcon: 'plus',
    isButtonDisabled: false,
  },
};

export default instituteDashboardApplicantsPageActionBar;
