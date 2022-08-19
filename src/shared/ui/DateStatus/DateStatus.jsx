import React from 'react';
import { DoctTypography } from '@doct-react/core';
import './DateStatus.scss';
import dayjs from 'dayjs';

const DateStatus = ({ className = '', startDate, endDate, paymentStatus }) => (
  <div className={`date-status-box bg-grey-200 overflow-hidden ${className}`}>
    <DoctTypography variant="h5" className="mb-0 text-nowrap">
      {dayjs(startDate).format('DD')}-{dayjs(endDate).format('DD')}
    </DoctTypography>
    <DoctTypography
      variant="textLabel2"
      textTransform="uppercase"
      className="mt-1 mb-0 text-center"
    >
      {dayjs(endDate).format('MMMM')} <br />
      {dayjs(endDate).format('YYYY')}
    </DoctTypography>
    <DoctTypography
      variant="textLabel2"
      className="date-status-box-status p-1 text-center d-block mt-2 text-capitalize"
    >
      {paymentStatus === 'success' ? 'Confirmed' : paymentStatus}
    </DoctTypography>
  </div>
);

export default DateStatus;
