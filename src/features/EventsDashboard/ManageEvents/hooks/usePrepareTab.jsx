import { EventStatusDisplayName } from '../../../../helper/enums/eventStatus';

export default function usePrepareEventTabList() {
  const array = [
    {
      label: 'All Events',
    },
  ];

  Object.keys(EventStatusDisplayName).map((item) => {
    array.push({
      label: EventStatusDisplayName[item],
    });
  });

  return array;
}
