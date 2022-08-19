import * as ROUTE from '../../routes/constant';
import { Link } from 'react-router-dom';

const recruiterDashboardMenuItems = (pathname = '') => {
  const menuItemsArray = [
    {
      link: (
        <Link
          to={`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.POSTING}`}
          className={
            pathname === `/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.POSTING}` ? 'active' : ''
          }
        >
          Job Posts
        </Link>
      ),
    },
    {
      link: (
        <Link
          to={`/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.JOB_APPLICANTS}`}
          className={
            pathname === `/${ROUTE.DASHBOARD}/${ROUTE.RECRUITER}/${ROUTE.JOB_APPLICANTS}`
              ? 'active'
              : ''
          }
        >
          Job Applicants
        </Link>
      ),
    },
  ];

  return menuItemsArray;
};

const recruiterPageSidebar = (pathname) => recruiterDashboardMenuItems(pathname);

export default recruiterPageSidebar;
