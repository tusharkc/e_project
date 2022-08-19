import * as ROUTE from '../../../routes/constant';

const manageAttendeesActionBar = {
  [ROUTE.MANAGE_MANAGE_ATTENDEES]: {
    pathname: ROUTE.MANAGE_MANAGE_ATTENDEES,
    title: 'Events Dashboard',
    navigateButtonLink: '/create',
    buttonText: 'New',
    buttonIcon: 'plus',
    isButtonDisabled: true,
  },
};

export default manageAttendeesActionBar;
