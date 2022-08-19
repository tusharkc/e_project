import React from 'react';
import dayjs from 'dayjs';

import { DoctTypography } from '@doct-react/core';

import AddRemoveCounter from './AddRemoveCounter';

const ticketLimit = 20;

const RegisterTable = ({
  priceTypes,
  currentCurrency,
  addTicketInformation,
  removeTicketInformation,
  tickets,
  ticketsInformation,
  activePriceType,
  className,
}) => {
  return (
    <ul className={`registration-table registration-table-gap-bottom ${className}`}>
      <li className="registration-table-row d-flex align-items-center mb-3">
        <DoctTypography
          variant="h6"
          className="mt-auto mb-0 registration-table-data registration-table-data-heading pl-2"
        >
          Add attendees
        </DoctTypography>
        {priceTypes?.map((priceGroup, index) => {
          return (
            <span
              key={index}
              className={`registration-table-data ${
                priceGroup.name === activePriceType?.name ? '' : 'text-grey-400'
              }`}
            >
              <DoctTypography variant="subtitle3" className="mb-0" fontWeight="medium">
                {priceGroup.name}
              </DoctTypography>
              <DoctTypography variant="caption2" textTransform="normal">
                {dayjs(priceGroup.salesEndDate).format('DD MMM YYYY')}
              </DoctTypography>
            </span>
          );
        })}
      </li>

      {tickets?.map((item, index) => {
        const savedTicket = ticketsInformation.find((ticket) => ticket.id === item.id);

        const isDisabled = Boolean(currentCurrency) && currentCurrency !== item.currency;

        return (
          <li
            key={index}
            className={`registration-table-row d-flex align-items-center bg-grey-100 mb-2 ${
              savedTicket ? 'row-has-value' : ''
            }`}
          >
            <span className="registration-table-data d-flex align-items-center">
              <AddRemoveCounter
                ticketInformation={savedTicket}
                addTicketInformation={addTicketInformation}
                removeTicketInformation={removeTicketInformation}
                item={item}
                tickets={tickets}
                ticketLimit={ticketLimit}
                isDisabled={isDisabled}
              />
              <DoctTypography
                variant="textLabel1"
                fontWeight={`${savedTicket ? 'medium' : 'normal'}`}
                className="registration-table-data ml-4 mb-0 mt-0"
              >
                {item.name}
              </DoctTypography>
            </span>
            {item?.prices?.map((price, index) => {
              return (
                <DoctTypography
                  key={index}
                  variant="textLabel1"
                  className={`registration-table-data registration-table-data-price mt-3 mt-sm-0 mb-0 ${
                    price.category === activePriceType?.name
                      ? 'registration-table-data-price-active'
                      : ''
                  }`}
                >
                  <span>{item.currency} </span>
                  {price.amount}
                  <DoctTypography
                    variant="caption2"
                    textTransform="uppercase"
                    className="d-block d-sm-none registration-table-data-price-group"
                  >
                    {priceTypes[index].name}
                  </DoctTypography>
                </DoctTypography>
              );
            })}
          </li>
        );
      })}
    </ul>
  );
};

export default RegisterTable;
