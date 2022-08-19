import * as ROUTE from '../../../routes/constant';

const instituteDashboardCoursesPageActionBar = {
  [`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_COURSES}`]: {
    pathname: `${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_COURSES}`,
    title: 'Institute Dashboard',
    navigateButtonLink: '/dashboard/institute/add-course',
    buttonText: 'List a Course',
    buttonIcon: 'plus',
    isButtonDisabled: false,
  },
};

export default instituteDashboardCoursesPageActionBar;
