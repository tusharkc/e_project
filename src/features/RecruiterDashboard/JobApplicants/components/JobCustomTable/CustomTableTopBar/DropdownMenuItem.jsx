import { DoctIcon, DoctTypography } from '@doct-react/core';
import React from 'react';

const DropDownMenuItem = ({ title, status, startYear, endYear, state, city }) => {
  const jobStatusBgStyles = () => {
    if (status == 'Draft') {
      return 'bg-info';
    } else if (status == 'Rejected') {
      return 'bg-danger';
    } else if (status == 'Active') {
      return 'bg-active-green';
    } else if (status == 'ActivationRequested') {
      return 'bg-warning';
    } else if (status == 'Closed' || status == 'Cancelled') {
      return 'bg-grey-600';
    }
  };
  return (
    <div>
      <DoctTypography variant="textLabel1" fontWeight="bold" className="my-0 p-0">
        {title}
      </DoctTypography>

      <div className="d-flex align-items-center">
        <DoctTypography
          variant="textLabel2"
          className={`${jobStatusBgStyles()} d-inline-block p-1 text-white m-0`}
        >
          {status != 'ActivationRequested' ? status?.toUpperCase() : 'UNDER REVIEW'}
        </DoctTypography>

        <span className="d-flex align-items-center mx-2 text-grey-600">
          <DoctIcon width="20" name="location" className="m-0 p-0" />
          <DoctTypography variant="textLabel2" className="ml-1 p-0">
            {city?.name}, {state?.name}
          </DoctTypography>
        </span>

        <span className="text-grey-600 d-flex align-items-center">
          <DoctIcon width="20" name="work" className="m-0 p-0" fill="grey" />
          <DoctTypography variant="textLabel2" className="ml-1 p-0">
            {startYear} - {endYear} Years
          </DoctTypography>
        </span>
      </div>
    </div>
  );
};

export default DropDownMenuItem;
