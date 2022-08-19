import { RecruiterDashboardApplicantStatusDisplayName } from '../../../helper/enums/recruiterDashboardApplicantStatus';

const usePrepareRecruiterApplicantTabList = () => {
  const array = [
    {
      label: 'Applicants',
    },
  ];

  Object.keys(RecruiterDashboardApplicantStatusDisplayName).map((item) => {
    array.push({
      label: RecruiterDashboardApplicantStatusDisplayName[item],
    });
  });

  return array;
};

export default usePrepareRecruiterApplicantTabList;
