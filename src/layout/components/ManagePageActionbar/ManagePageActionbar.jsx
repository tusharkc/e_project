import { DoctButton, DoctContainer, DoctIconButton, DoctTypography } from '@doct-react/core';
import { useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  eventPageActionBar,
  eventRegistrationPageActionBar,
  manageAttendeesActionBar,
  invoicesSummaryActionBar,
  allMembershipsPageActionBar,
  manageDirectoryPageActionBar,
  instituteDashboardCoursesPageActionBar,
  instituteDashboardApplicantsPageActionBar,
  recruiterDashboardAllJobsPageActionBar,
  recruiterDashboardAllJobApplicantPageActionBar,
} from '../../../features';
import { DASHBOARD } from '../../../routes/constant';

const initialState = {
  pathName: '',
  title: '',
  navigateButtonLink: '',
  buttonText: '',
  buttonIcon: '',
};

// add all page actionbar here
const allPageActionBar = {
  ...manageDirectoryPageActionBar,
  ...allMembershipsPageActionBar,
  ...eventPageActionBar,
  ...eventRegistrationPageActionBar,
  ...manageAttendeesActionBar,
  ...invoicesSummaryActionBar,
  ...instituteDashboardCoursesPageActionBar,
  ...instituteDashboardApplicantsPageActionBar,
  ...recruiterDashboardAllJobsPageActionBar,
  ...recruiterDashboardAllJobApplicantPageActionBar,
};

export default function ManagePageActionBar() {
  let location = useLocation();
  const navigate = useNavigate();

  const [titleAndAction, setTitleAndAction] = useState({});

  useLayoutEffect(() => {
    const currentPathObj = allPageActionBar[location.pathname] || {};

    if (Object.keys(currentPathObj).length) {
      setTitleAndAction(currentPathObj);
    } else {
      setTitleAndAction(initialState);
    }
  }, [location.pathname]);

  if (!titleAndAction.pathname) {
    return null;
  }

  const renderActionButton = () => {
    if (titleAndAction.btnComponent) {
      return titleAndAction.btnComponent;
    }

    if (titleAndAction.isButtonDisabled) {
      return (
        <DoctButton
          variant="contained"
          text={titleAndAction.buttonText || 'Create'}
          size="medium"
          icon={titleAndAction.buttonIcon}
          disabled
          className="ml-auto"
        />
      );
    }

    return (
      <Link to={titleAndAction.navigateButtonLink || '/'} className="ml-auto">
        <DoctButton
          variant="contained"
          text={titleAndAction.buttonText || 'Create'}
          size="medium"
          icon={titleAndAction.buttonIcon}
          disabled={titleAndAction.isButtonDisabled}
        />
      </Link>
    );
  };

  return (
    <div className="bg-grey-100 manage_page__action_bar">
      <DoctContainer>
        <div className="d-flex-center-y action-bar-height">
          <span className="ml-n2 d-inline-flex" onClick={() => navigate(`/${DASHBOARD}`)}>
            <DoctIconButton variant="text" type="secondary" icon="arrowBack" size="medium" />
          </span>
          <DoctTypography variant="subtitle2">{titleAndAction.title || 'Manage'}</DoctTypography>
          {renderActionButton()}
        </div>
      </DoctContainer>
    </div>
  );
}
