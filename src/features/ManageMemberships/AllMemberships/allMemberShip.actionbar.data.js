import * as ROUTE from '../../../routes/constant';

const allMembershipsPageActionBar = {
  [ROUTE.MANAGE_MEMBERSHIPS_ALL_MEMBERSHIP]: {
    pathname: ROUTE.MANAGE_MEMBERSHIPS_ALL_MEMBERSHIP,
    title: 'Memberships Management',
    navigateButtonLink: '/dashboard/new-memberships',
    buttonText: 'New Membership',
    buttonIcon: 'plus',
    isButtonDisabled: false,
  },
};

export default allMembershipsPageActionBar;
