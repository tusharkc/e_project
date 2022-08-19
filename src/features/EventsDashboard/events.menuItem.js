import * as ROUTE from '../../routes/constant';
import { Link } from 'react-router-dom';

function eventMenuItems(pathname = '') {
  const menuItemsArray = [
    {
      link: (
        <Link
          to={`/${ROUTE.DASHBOARD}/${ROUTE.EVENTS}/${ROUTE.EVENTS_ALL}`}
          className={
            pathname === `/${ROUTE.DASHBOARD}/${ROUTE.EVENTS}/${ROUTE.EVENTS_ALL}` ? 'active' : ''
          }
        >
          Events
        </Link>
      ),
    },
    {
      link: (
        <Link
          to={`/${ROUTE.DASHBOARD}/${ROUTE.EVENTS}/${ROUTE.REGISTRATION}`}
          className={
            pathname === `/${ROUTE.DASHBOARD}/${ROUTE.EVENTS}/${ROUTE.REGISTRATION}` ? 'active' : ''
          }
        >
          Manage Registration
        </Link>
      ),
    },
    {
      link: (
        <Link
          to={`/${ROUTE.DASHBOARD}/${ROUTE.EVENTS}/${ROUTE.INVOICES_SUMMARY}`}
          className={
            pathname === `/${ROUTE.DASHBOARD}/${ROUTE.EVENTS}/${ROUTE.INVOICES_SUMMARY}`
              ? 'active'
              : ''
          }
        >
          Invoices & Summary
        </Link>
      ),
    },
    {
      link: (
        <Link
          to={`/${ROUTE.DASHBOARD}/${ROUTE.EVENTS}/${ROUTE.MANAGE_ATTENDEES}`}
          className={
            pathname === `/${ROUTE.DASHBOARD}/${ROUTE.EVENTS}/${ROUTE.MANAGE_ATTENDEES}`
              ? 'active'
              : ''
          }
        >
          Manage Attendees
        </Link>
      ),
    },
  ];

  return menuItemsArray;
}

const eventPageSidebar = (pathname) => eventMenuItems(pathname);

export default eventPageSidebar;
