import * as ROUTE from '../../../routes/constant';

const eventPageActionBar = {
  [ROUTE.MANAGE_EVENTS]: {
    pathname: ROUTE.MANAGE_EVENTS,
    title: 'Events Dashboard',
    navigateButtonLink: ROUTE.PATH_CREATE_EVENT,
    buttonText: 'Create Event',
    buttonIcon: 'plus',
  },
};

export default eventPageActionBar;
