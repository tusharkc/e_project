export const EventType = Object.freeze([
  {
    value: 'Conference',
    label: 'Conference',
  },
  {
    value: 'Workshop',
    label: 'Workshop',
  },
  {
    value: 'Meetup',
    label: 'Meetup',
  },
  {
    value: 'Webinar',
    label: 'Webinar',
  },
  {
    value: 'CME',
    label: 'CME',
  },
  {
    value: 'Exhibition',
    label: 'Exhibition',
  },
  {
    value: 'Seminar',
    label: 'Seminar',
  },
  {
    value: 'MasterClass',
    label: 'Master Class',
  },
  {
    value: 'CrashCourse',
    label: 'Crash Course',
  },
]);

export const eventOrderStatus = Object.freeze({
  created: {
    value: 'Created',
  },
  confirmed: {
    value: 'Confirmed',
  },
  canclled: {
    value: 'Canceled',
  },
  failed: {
    value: 'Failed',
  },
});

export const eventOrderType = Object.freeze({
  online: {
    value: 'Online',
  },
  offline: {
    value: 'Offline',
  },
  complementary: {
    value: 'Complementary',
  },
});

export const EventRegistrationType = Object.freeze([
  { value: 'Paid', label: 'Paid Event' },
  { value: 'Free', label: 'Free Event' },
]);

export const NumberOfGathering = Object.freeze([
  { label: 'Limited', value: 'Limited' },
  { label: 'Unlimited', value: 'Unlimited' },
]);
