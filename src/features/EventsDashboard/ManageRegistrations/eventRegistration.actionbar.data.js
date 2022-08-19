import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DoctButton, DoctIcon } from '@doct-react/core';

import * as ROUTE from '../../../routes/constant';
import { Dropdown, DropdownListEl, DropdownMenu } from '../../../shared/ui';

import { selectEventsIdCode } from './manageRegistration.slice';
import { useGetAllEventsQuery } from '../ManageEvents';
import { useGetEventByIdQuery } from '../ManageEvents/services/events.services';
import useQueryHooks from '../../../hooks/useQueryHooks';
import qs from 'qs';
import { EventStatus } from '../../../helper/enums/eventStatus';
import { useHookEventStatus } from './useHookManageRegistration';

const RegistrationAction = React.memo(function RegistrationAction() {
  const query = useQueryHooks();

  const { id } = useSelector(selectEventsIdCode);
  const { code } = useSelector(selectEventsIdCode);
  const { data: allEventsData, isLoading: isAllEventsDataLoading } = useGetAllEventsQuery();
  const { events = [] } = allEventsData || {};

  const { activeEvent, eventPaymentType } = useHookEventStatus({ id });

  const navigate = useNavigate();
  return (
    <Dropdown className="ml-auto" disabled={!code || !events?.length || !activeEvent}>
      <DoctButton
        variant="contained"
        text={`New`}
        size="medium"
        icon={`plus`}
        disabled={!code || !events?.length || !activeEvent}
      />
      <DropdownMenu style={{ right: 0, top: '24px' }}>
        <DropdownListEl
          isDisabled={eventPaymentType == 'Free' ? true : false}
          onClick={() => {
            navigate(
              `${ROUTE.MANAGE_EVENTS_REGISTRATION}/${code}/${
                ROUTE.OFFLINE_REGISTRATION
              }?${qs.stringify(query)}`,
            );
          }}
        >
          <DoctIcon width="20" height="20" name="plus" className="text-primary mr-2" />
          Offline Registration
        </DropdownListEl>
        <DropdownListEl
          onClick={() => {
            navigate(
              `${ROUTE.MANAGE_EVENTS_REGISTRATION}/${code}/${ROUTE.COMPLEMENTARY}?${qs.stringify(
                query,
              )}`,
            );
          }}
        >
          <DoctIcon width="20" height="20" name="plus" className="text-primary mr-2" />
          Complimentary Registration
        </DropdownListEl>
      </DropdownMenu>
    </Dropdown>
  );
});

const eventRegistrationPageActionBar = {
  [`${ROUTE.MANAGE_EVENTS_REGISTRATION}`]: {
    pathname: `/${ROUTE.MANAGE_EVENTS_REGISTRATION}`,
    title: 'Events Dashboard',
    navigateButtonLink: '/create',
    buttonText: 'New',
    buttonIcon: 'plus',
    btnComponent: <RegistrationAction />,
    isButtonDisabled: true,
  },
};

export default eventRegistrationPageActionBar;
