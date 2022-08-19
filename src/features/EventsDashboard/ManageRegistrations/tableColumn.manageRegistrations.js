export const registrationTableColumn = [
  {
    key: 'billingName',
    title: 'BILLING NAME',
    keySelector: (obj) => {
      return obj?.billingInformation?.name || obj?.attendeeName;
    },
  },
  {
    key: 'orderId',
    title: 'ORDER ID',
  },
  {
    key: 'orderDate',
    title: 'DATE',
    isDate: true,
  },
  {
    key: 'registrationType',
    title: 'TYPE',
  },
  {
    key: 'totalAmount',
    title: 'PAYMENT',
    currency: true,
  },
  {
    key: 'status',
    title: 'STATUS',
  },
  {
    key: 'action',
    title: '',
  },
];
