import { DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import { DoctActionMenu } from '@doct-react/app';
import React from 'react';
import IconTicket from '../../../../../../../../assets/images/Create Events Form/Tickets/IconTicket.svg';
const options = [
  {
    title: 'Edit',
  },
  {
    title: 'Delete',
  },
];

const InrCard = ({
  regtype,
  seats,
  category,
  setIsModalOpen,
  additionalFun,
  deleteRecordHandler,
  index,
  ticketCategory,
}) => {
  return (
    <div className="d-flex">
      <div className="py-3">
        <img src={IconTicket} alt="INR" className="px-2" />
      </div>
      <DoctTypography variant="subtitle2" className="p-2 text-grey-600 text-truncate-small-line">
        {regtype}
      </DoctTypography>

      {seats && (
        <DoctTypography variant="textLabel2" className="text-grey-600 mb-3 p-2">
          {seats} Seats
        </DoctTypography>
      )}
      {/* <DoctTypography variant="textLabel2" className="text-white bg-warning mt-sm-n3">
          SOLD OUT
        </DoctTypography> */}

      <DoctRow>
        <div className="d-flex">
          {Object.entries(category).map(([key, { code, amount }]) => {
            return (
              <>
                <DoctTypography variant="textLabel2" className="text-grey-800 px-4">
                  {key} <br />
                  <span>{code + ' ' + amount}</span>
                </DoctTypography>
              </>
            );
          })}
        </div>{' '}
        <DoctActionMenu
          btnType="inverse"
          options={options}
          onClick={(item) => {
            if (item.title == 'Edit') {
              if (ticketCategory == undefined) {
                setIsModalOpen(false);
              } else {
                setIsModalOpen(true);
                additionalFun();
              }
            }
            if (item.title == 'Delete') {
              deleteRecordHandler(index);
            }
          }}
          className="position-absolute right-0 tickets_more_menu px-4 mt-2"
        />
      </DoctRow>
    </div>
  );
};

export default InrCard;
