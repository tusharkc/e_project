import * as ROUTE from '../../routes/constant';
import { Link } from 'react-router-dom';

const instituteDashboardMenuItems = (pathname = '') => {
  const menuItemsArray = [
    {
      link: (
        <Link
          to={`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_COURSES}`}
          className={
            pathname === `/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_COURSES}`
              ? 'active'
              : ''
          }
        >
          Course Listing
        </Link>
      ),
    },
    {
      link: (
        <Link
          to={`/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_APPLICANTS}`}
          className={
            pathname === `/${ROUTE.DASHBOARD}/${ROUTE.INSTITUTE}/${ROUTE.INSTITUTE_APPLICANTS}`
              ? 'active'
              : ''
          }
        >
          Course Applicants
        </Link>
      ),
    },
  ];

  return menuItemsArray;
};

const institutePageSidebar = (pathname) => instituteDashboardMenuItems(pathname);

export default institutePageSidebar;
