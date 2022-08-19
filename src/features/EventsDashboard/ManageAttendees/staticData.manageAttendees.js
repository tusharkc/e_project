export const manageAttendeesTableColumn = [
  {
    key: 'name',
    title: 'ATTENDEE NAME',
  },
  {
    key: 'attendeeId',
    title: 'ATTENDEE ID',
  },
  {
    key: 'attendeeType',
    title: 'ATTENDEE TYPE',
  },
  {
    key: 'orderType',
    title: 'REGISTRATION',
  },
  {
    key: 'payment',
    title: 'AMOUNT',
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

export const manageAttendeesTableColumnApiData = [
  {
    billingName: 'Grant Marshall',
    orderId: '1001-4007-7000-EW007',
    date: '11 mar 2020',
    type: 'Online',
    payment: 'INR 10000',
    status: 'Confirmed',
    details: {
      location: {
        city: 'Surat',
      },
    },
  },
  {
    billingName: 'Lucile Mccormick',
    orderId: '1001-4007-7000-EW007',
    date: '07 mar 2020',
    type: 'Online',
    payment: 'INR 5600',
    status: 'Pending',
  },
  {
    billingName: 'Lucile Mccormick',
    orderId: '1001-4007-7000-EW007',
    date: '07 mar 2020',
    type: 'complementary',
    payment: 'INR 5600',
    status: 'Cancelled',
  },
];
