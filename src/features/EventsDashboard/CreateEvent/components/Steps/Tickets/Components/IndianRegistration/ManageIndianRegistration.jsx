import { DoctAutoComplete, DoctTextField } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectBasicInfoDetails,
  selectCreateEventResponse,
  selectTicketCategory,
} from '../../../../../createEvent.slice';
import TicketPriceCard from '../TicketPriceCard';

function ManageIndianRegistration({
  control,
  errors,
  touched,
  handleFormSubmit,
  inrTickets,
  selectedRecord,
  reset,
  tarrif,
}) {
  useEffect(() => {
    if (selectedRecord != null) {
      reset(inrTickets[selectedRecord]);
    } else {
      reset({});
    }
  }, [inrTickets]);

  const ticketCategory = useSelector(selectTicketCategory);
  const basicInfoPageDetails = useSelector(selectBasicInfoDetails);
  const apiResponseData = useSelector(selectCreateEventResponse);
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <DoctTypography variant="subtitle2">Attendee Type</DoctTypography>
        <DoctTypography variant="subtitle2" className="text-grey-600">
          Add ticket label for attendee types like students, delegates, etc.
        </DoctTypography>
        <DoctTextField
          showStar={false}
          name="attendeeType"
          label="Ticket Label"
          id="attendeeType"
          control={control}
          isErrors={errors}
          defaultValue=""
          validationRules={{
            required: "It's Required Field",
          }}
          touched={touched}
        />
        <DoctTypography variant="subtitle2">Seat Capacity (optional)</DoctTypography>
        <DoctTextField
          showStar={false}
          name="numberOfSeats"
          label="Add number of seats"
          id="numberOfSeats"
          control={control}
          isErrors={errors}
          defaultValue=""
          validationRules={{
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: 'Not valid',
            },
          }}
          touched={touched}
          disabled={
            apiResponseData.numberOfGathering == 'Unlimited' ||
            basicInfoPageDetails.NumberOfGathering == 'Unlimited'
          }
        />
        <DoctTypography variant="body3" className="text-grey-600 mt-1">
          260 out of 1000 seats available
        </DoctTypography>
        <DoctTypography variant="subtitle2">Ticket Price by Category</DoctTypography>
        {ticketCategory?.ticketCategories?.map((item, index) => {
          return (
            <div key={index}>
              <TicketPriceCard
                control={control}
                errors={errors}
                touched={touched}
                categoryName={item.name}
                index={index}
                text="Indian"
                tarrif={tarrif}
              />
            </div>
          );
        })}
      </form>
    </>
  );
}

export default ManageIndianRegistration;
