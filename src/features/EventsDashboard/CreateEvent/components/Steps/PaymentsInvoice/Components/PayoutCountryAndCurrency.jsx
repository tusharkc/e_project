import { DoctAutoComplete } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React from 'react';

function PayoutCountryAndCurrency({ formName }) {
  return (
    <div>
      <DoctTypography variant="h6" className="text-grey-800">
        Payout Country & Currency
      </DoctTypography>
      <DoctTypography variant="textLabel1" className="text-grey-600">
        Default country & currency for payment settlement.
      </DoctTypography>
      <DoctAutoComplete
        {...formName.payoutCountry}
        className="mb-3"
        options={[{ label: 'India', value: 'India' }]}
        validationRules={{
          required: "It's Required Field",
        }}
        onEndScroll={() => {}}
        onClearInput={() => {}}
        disabled
      />
      <DoctAutoComplete
        {...formName.currency}
        className="mb-3"
        options={[{ label: 'INR', value: 'INR' }]}
        validationRules={{
          required: "It's Required Field",
        }}
        onEndScroll={() => {}}
        onClearInput={() => {}}
        disabled
      />
    </div>
  );
}

export default PayoutCountryAndCurrency;
