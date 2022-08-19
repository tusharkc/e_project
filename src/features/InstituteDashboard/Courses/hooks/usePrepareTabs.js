import { InstituteDashboardStatusDisplayName } from '../../../../helper/enums/instituteDashboardStatus';

const usePrepareInstituteTabList = () => {
  const array = [
    {
      label: 'All Courses',
    },
  ];

  Object.keys(InstituteDashboardStatusDisplayName).map((item) => {
    array.push({
      label: InstituteDashboardStatusDisplayName[item],
    });
  });

  return array;
};

export default usePrepareInstituteTabList;
