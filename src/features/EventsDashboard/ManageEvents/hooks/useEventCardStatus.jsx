import { useEffect, useState } from 'react';
import { EventStatus, EventStatusDisplayName } from '../../../../helper/enums/eventStatus';

export default function useEventCardStatus(status) {
  const [eventStatusData, setEventStatusData] = useState({});

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (status) {
      case EventStatus.ACTIVE:
        setEventStatusData({
          className: `manage_event_card__active bg-white`,
          variant: 'transparent',
          btnText: 'Edit/ Manage',
          btnVariant: 'primary',
          labelClass: 'text-label text-label__success font-weight-medium',
          labelTextColor: 'text-white',
          labelText: EventStatusDisplayName['Active'],
        });
        return;

      case EventStatus.DRAFT:
        setEventStatusData({
          className: `manage_event_card__draft bg-grey-100`,
          variant: 'transparent',
          btnText: 'Edit/ Publish',
          btnVariant: 'primary',
          labelClass: 'text-label text-label__white',
          labelTextColor: 'text-info',
          labelText: EventStatusDisplayName['Draft'],
          // isButtonDisabled: true,
        });
        return;

      case EventStatus.CLOSED:
        setEventStatusData({
          className: `manage_event_card__booking_closed bg-white`,
          variant: 'transparent',
          btnText: 'Edit/ Manage',
          btnVariant: 'primary',
          labelClass: 'text-label text-label__danger',
          labelTextColor: 'text-white',
          labelText: EventStatusDisplayName['Closed'],
        });
        return;

      case EventStatus.COMPLETED:
        setEventStatusData({
          className: `manage_event_card__completed bg-grey-100`,
          variant: 'transparent',
          btnText: 'View',
          btnVariant: 'secondary',
          labelClass: 'text-label text-label__white',
          labelTextColor: 'text-success',
          labelText: EventStatusDisplayName['Completed'],
          // isButtonDisabled: true,
        });
        return;

      case EventStatus.ACTIVATIONREQUESTED:
        setEventStatusData({
          className: `manage_event_card__under_review`,
          variant: 'transparent',
          btnText: 'View',
          btnVariant: 'secondary',
          labelClass: 'text-label bg-warning',
          labelTextColor: 'text-white',
          labelText: EventStatusDisplayName['ActivationRequested'],
          // isButtonDisabled: true,
        });
        return;
    }
  }, [status]);

  return { eventStatusData };
}
