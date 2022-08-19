import React from 'react';
import { DoctTypography } from '@doct-react/core';

const TicketCategoriesCard = ({ categories, from, to }) => {
  return (
    <div className="px-3 categories_data_mapping mr-4 ml-3">
      <div className="d-flex">
        <div className="line_straight position-absolute mx-sm-n2 my-3"></div>
        <DoctTypography
          variant="textLabel2"
          fontWeight="regular"
          className="text-grey-800 mt-3 position-relative"
        >
          {categories}
        </DoctTypography>
      </div>
      <DoctTypography variant="body3" fontWeight="regular" className="text-grey-600 mt-sm-n2">
        From {from}
      </DoctTypography>
      <DoctTypography variant="body3" fontWeight="regular" className="text-grey-600 mt-sm-n3">
        To {to}
      </DoctTypography>
    </div>
  );
};

export default TicketCategoriesCard;
