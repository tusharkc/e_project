import * as ROUTE from '../../routes/constant';
import { Link } from 'react-router-dom';

function manageMembershipsMenuItems(pathname = '') {
  const menuItemsArray = [
    {
      link: (
        <Link
          to={`/${ROUTE.DASHBOARD}/${ROUTE.MANAGE_MEMBERSHIPS}/${ROUTE.ALL_MEMBERSHIPS}`}
          className={
            pathname === `/${ROUTE.DASHBOARD}/${ROUTE.MANAGE_MEMBERSHIPS}/${ROUTE.ALL_MEMBERSHIPS}`
              ? 'active'
              : ''
          }
        >
          Memberships
        </Link>
      ),
    },
    {
      link: (
        <Link
          to={`/${ROUTE.DASHBOARD}/${ROUTE.MANAGE_MEMBERSHIPS}/${ROUTE.MANAGE_DIRECTORY}`}
          className={
            pathname === `/${ROUTE.DASHBOARD}/${ROUTE.MANAGE_MEMBERSHIPS}/${ROUTE.MANAGE_DIRECTORY}`
              ? 'active'
              : ''
          }
        >
          Members Directory
        </Link>
      ),
    },
  ];

  return menuItemsArray;
}

const membersPageSidebar = (pathname) => manageMembershipsMenuItems(pathname);

export default membersPageSidebar;
