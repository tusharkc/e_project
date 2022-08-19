import { DoctButton, DoctIcon } from '@doct-react/core';
import { Link } from 'react-router-dom';
import {
  COMPLEMENTARY,
  INSTITUTE_DASHBOARD,
  MANAGE_EVENTS_REGISTRATION,
  OFFLINE_REGISTRATION,
  RECRUITERS_DASHBOARD,
} from '../../../routes/constant';
import { Dropdown, DropdownListEl, DropdownMenu } from '../../../shared/ui';

import { useNavigate } from 'react-router-dom';

export default function AddMenu() {
  const navigate = useNavigate();

  return (
    <Dropdown>
      <DoctButton icon="plus" text="New" />
      <DropdownMenu className="add-menu-quick-access">
        <DropdownListEl onClick={() => navigate(`/dashboard/${RECRUITERS_DASHBOARD}`)}>
          <DoctIcon width="20" height="20" name="plus" className="text-primary mr-2" />
          Post a Job
        </DropdownListEl>
        <DropdownListEl onClick={() => navigate(`/dashboard/${INSTITUTE_DASHBOARD}`)}>
          <DoctIcon width="20" height="20" name="plus" className="text-primary mr-2" />
          List a Course
        </DropdownListEl>
        <DropdownListEl onClick={() => {}}>
          <DoctIcon width="20" height="20" name="plus" className="text-primary mr-2" />
          Create an Event
        </DropdownListEl>
      </DropdownMenu>
    </Dropdown>
  );
}
