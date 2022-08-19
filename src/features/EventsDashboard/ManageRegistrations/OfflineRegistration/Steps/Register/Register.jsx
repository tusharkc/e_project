import { DoctButton } from '@doct-react/core';
import { useDispatch, useSelector } from 'react-redux';

import { EventRegistrationLayoutFooter } from '../../../../../../layout';
import RegisterTable from '../components/RegisterTable';

import {
  addTicketInformation,
  prepareListOfAttendees,
  removeTicketInformation,
  selectIsSelectedTickets,
  selectTicketsInformation,
  setActiveStep,
} from '../../offlineRegistration.slice';

import { fetchRegistrationAmount } from '../../offlineRegistration.services';
import MetaModals from './MetaDetailsModals';

export default function Register({ response = {} }) {
  const dispatch = useDispatch();
  const { type, priceTypes, currentActivePriceGroup, tickets, metaData, activePriceType } =
    response;

  const ticketsInformation = useSelector(selectTicketsInformation);
  const isSelectedTickets = useSelector(selectIsSelectedTickets);

  const currentCurrency = ticketsInformation
    .map((ticket) => ticket.currency)
    .reduce((a, b) => b, '');

  return (
    <>
      <RegisterTable
        activePriceType={activePriceType}
        priceTypes={priceTypes}
        currentActivePriceGroup={currentActivePriceGroup}
        currentCurrency={currentCurrency}
        addTicketInformation={(val) => dispatch(addTicketInformation(val))}
        removeTicketInformation={(val) => dispatch(removeTicketInformation(val))}
        tickets={tickets}
        ticketsInformation={ticketsInformation}
        className={`mt-3`}
      />
      <EventRegistrationLayoutFooter>
        <MetaModals metaData={metaData} />
        <DoctButton
          disabled={!isSelectedTickets}
          text="Continue"
          className="ml-auto"
          onButtonClickHandler={() => {
            dispatch(setActiveStep(1));
            dispatch(prepareListOfAttendees());
            dispatch(fetchRegistrationAmount());
          }}
        />
      </EventRegistrationLayoutFooter>
    </>
  );
}
