import { DoctCol, DoctTypography, DoctIcon, DoctButton, DoctRow } from '@doct-react/core';
import React from 'react';
import { CategoriesData } from './components/CategoriesData';
import InrCard from './components/InrCard';
import { InrData } from './components/InrData';
import TicketCategoriesCard from './components/TicketCategoriesCard';

const TicketsSection = () => {
  return (
    <div>
      <DoctCol xs={10} className="mx-auto">
        <div className="d-flex justify-content-between align-items-center bg-white border-radius mb-2 px-4 py-3 total_atendees_section">
          <DoctTypography
            className="text-grey-800 mx-2 mt-3"
            fontWeight="regular"
            variant="textLabel1"
          >
            Remaining Seats
          </DoctTypography>

          <DoctTypography
            className="number_320 text-grey-800 mt-3"
            fontWeight="medium"
            variant="textLabel1"
          >
            320
          </DoctTypography>
        </div>
      </DoctCol>
    </div>
  );
};

export default TicketsSection;
