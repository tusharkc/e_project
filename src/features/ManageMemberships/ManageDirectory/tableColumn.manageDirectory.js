export const manageDirectoryTableColumn = [
  {
    key: 'fullName',
    title: 'FULL NAME',
  },
  {
    key: 'correspondenceCity',
    title: 'CITY',
  },
  {
    title: 'MEMBERSHIPS',
    keySelector: (obj) => {
      return obj?.membership?.membershipTitle || '';
    },
  },
  {
    key: 'renewalDate',
    title: 'RENEWAL DATE',
    isDate: true,
  },
  {
    key: 'memberStatus',
    title: 'STATUS',
  },
  {
    key: 'action',
    title: '',
  },
];
