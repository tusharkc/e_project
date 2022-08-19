export const EventStatus = Object.freeze({
  ACTIVE: 'Active',
  CLOSED: 'Closed',
  DRAFT: 'Draft',
  COMPLETED: 'Completed',
  ACTIVATIONREQUESTED: 'ActivationRequested',
});

export const EventStatusDisplayName = Object.freeze({
  [EventStatus.ACTIVE]: 'Registration Active',
  [EventStatus.CLOSED]: 'Registration Closed',
  [EventStatus.DRAFT]: 'Draft',
  [EventStatus.COMPLETED]: 'Completed',
  [EventStatus.ACTIVATIONREQUESTED]: 'Under Review',
});
