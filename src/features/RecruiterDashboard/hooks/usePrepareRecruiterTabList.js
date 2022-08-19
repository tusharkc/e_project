import { RecruiterDashboardStatusDisplayName } from '../../../helper/enums/recruiterDashboardStatus';

const usePrepareRecruiterTabList = () => {
  const array = [
    {
      label: 'All Jobs',
    },
  ];

  Object.keys(RecruiterDashboardStatusDisplayName).map((item) => {
    array.push({
      label: RecruiterDashboardStatusDisplayName[item],
    });
  });

  return array;
};

export default usePrepareRecruiterTabList;
