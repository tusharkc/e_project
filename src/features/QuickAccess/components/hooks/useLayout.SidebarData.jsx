import QuickAcessIcon from '../../../../assets/icons/quick_access_icon.svg';
import JobsAppIcon from '../../../../assets/icons/Jobs-new-icon.svg';
import CourseAppIcon from '../../../../assets/icons/Course-new-icon.svg';
import EventAppIcon from '../../../../assets/icons/Events-new-icon.svg';
import ManageMembershipsIcon from '../../../../assets/icons/manage_memberships_icon.svg';
import { AccountUnderReview } from '../../../ManageMemberships';
import { useNavigate } from 'react-router-dom';
import { useUserApproval } from '../../../../hooks';

export default function useSidebarData() {
  const allAccountTypesData = ['ManageMemberships', 'PostAJob', 'ListACourse', 'CreateAnEvent'];
  const { allAccessableFeaturesArr, openModalPath } = useUserApproval({
    allAccountTypes: allAccountTypesData,
  });

  const navigate = useNavigate();

  const sidebarData = [
    {
      title: 'Quick Access',
      pathname: '/dashboard',
      icon: <img src={QuickAcessIcon} />,
    },

    {
      title: 'Events Dashboard',
      pathname: '/dashboard/events/all',
      icon: <img src={EventAppIcon} className="dashboard_sidebar_icons" />,
    },

    {
      title: 'Recruiter Dashboard',
      pathname: '/dashboard/recruiter/posting',
      icon: <img src={JobsAppIcon} className="dashboard_sidebar_icons" />,
      isDisabled: false,
    },

    {
      title: 'Institute Dashboard',
      pathname: '/dashboard/institute/courses',
      icon: <img src={CourseAppIcon} />,
      isDisabled: false,
    },

    {
      title: 'Memberships',
      pathname: `${
        openModalPath != undefined ? openModalPath : '/dashboard/manage-memberships/all-memberships'
      }`,
      icon: <img src={ManageMembershipsIcon} />,
      isDisabled: false,
      isAccessable: allAccessableFeaturesArr?.ManageMemberships,
      underReviewComponent: (
        <AccountUnderReview
          handelClose={() => {
            navigate(-1);
          }}
        />
      ),
    },
  ];

  return {
    sidebarData,
  };
}
