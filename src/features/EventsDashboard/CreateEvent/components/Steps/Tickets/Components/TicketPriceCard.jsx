import { DoctAutoComplete, DoctTextField } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React from 'react';

function TicketPriceCard({ categoryName, control, errors, touched, index, text, tarrif }) {
  return (
    <>
      <div className="ticket_container bg-primary-100 border-radius px-2 py-2 mb-2">
        <DoctTypography variant="subtitle2" className="text-grey-800">
          {categoryName}
        </DoctTypography>
        <div className="d-inline-flex">
          <DoctTextField
            showStar={false}
            className="mr-2 w-50"
            name={`category.${categoryName}.code`}
            label="Code"
            id="code"
            control={control}
            isErrors={errors}
            defaultValue={text == 'Indian' ? 'INR' : 'USD'}
            touched={touched}
            disabled
          />
          <DoctTextField
            showStar={false}
            className=""
            name={`category.${categoryName}.amount`}
            label="Price"
            id="amount"
            control={control}
            isErrors={errors}
            defaultValue=""
            validationRules={{
              required: "It's Required Field",
            }}
            touched={touched}
          />
        </div>
        {tarrif && (
          <DoctTypography variant="subtitle2" className="text-grey-600 MB-1">
            Prices are{' '}
            {tarrif == 'ExcludingAllTaxes' ? ' Excluding All Taxes' : ' Including All Taxes'}
          </DoctTypography>
        )}
      </div>
    </>
  );
}

export default TicketPriceCard;
