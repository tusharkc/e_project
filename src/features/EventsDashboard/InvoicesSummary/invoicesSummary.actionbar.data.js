import * as ROUTE from '../../../routes/constant';

const invoicesSummaryActionBar = {
  [ROUTE.MANAGE_INVOICE_SUMMARY]: {
    pathname: ROUTE.MANAGE_INVOICE_SUMMARY,
    title: 'Events Dashboard',
    navigateButtonLink: '/create',
    buttonText: 'Create Event',
    buttonIcon: 'plus',
    isButtonDisabled: true,
  },
};

export default invoicesSummaryActionBar;
