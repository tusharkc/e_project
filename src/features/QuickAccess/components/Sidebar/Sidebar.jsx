import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import { DoctTypography } from '@doct-react/core';
import useSidebarData from '../hooks/useLayout.SidebarData.jsx';

function SidebarNav({ title, pathname, icon, isDisabled, underReviewComponent }) {
  if (isDisabled) {
    return (
      <>
        <span className=" sidebar_nav sidebar_nav_disabled d-inline-flex align-items-center w-100">
          {icon}
          <DoctTypography variant="textLabel1">{title}</DoctTypography>
        </span>
      </>
    );
  }
  return (
    <NavLink
      to={isDisabled ? '' : pathname}
      className={({ isActive }) =>
        isActive
          ? `sidebar_nav sidebar_nav_active d-inline-flex align-items-center w-100`
          : `sidebar_nav align-items-center d-inline-flex w-100`
      }
    >
      {underReviewComponent}
      {icon}
      <DoctTypography variant="textLabel1">{title}</DoctTypography>
    </NavLink>
  );
}

export default function Sidebar({ className }) {
  const { sidebarData } = useSidebarData();

  return (
    <nav className={className ? `${className}` : ''}>
      {sidebarData
        .filter((item) => item.isAccessable != false)
        .map(({ title, pathname, icon, isDisabled, underReviewComponent }, i) => {
          return (
            <SidebarNav
              key={i}
              title={title}
              pathname={pathname}
              icon={icon}
              isDisabled={isDisabled}
              underReviewComponent={underReviewComponent}
            />
          );
        })}
    </nav>
  );
}
