import { DoctAutoComplete, DoctTextField } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { EventStatus } from '../../../../../../../helper/enums/eventStatus';
import { selectCreateEventResponse } from '../../../../createEvent.slice';

function PaymentSettlement({ formName, touched }) {
  const apiResponseData = useSelector(selectCreateEventResponse);
  return (
    <div>
      <DoctTypography variant="h6" className="text-grey-800">
        Payment Settlement
      </DoctTypography>
      <DoctTypography variant="textLabel1" className="text-grey-600">
        Add your bank account details of Online ticket payout.
      </DoctTypography>
      <DoctTextField
        {...formName.bankName}
        showStar={false}
        className="mb-3"
        validationRules={{
          required: "It's Required Field",
        }}
        defaultValue=""
        touched={touched}
        disabled={
          apiResponseData.status == EventStatus.ACTIVE ||
          apiResponseData.status == EventStatus.ACTIVATIONREQUESTED
            ? true
            : false
        }
      />
      <DoctTextField
        {...formName.accountHolderName}
        showStar={false}
        className="mb-3"
        defaultValue=""
        validationRules={{
          required: "It's Required Field",
        }}
        touched={touched}
        disabled={
          apiResponseData.status == EventStatus.ACTIVE ||
          apiResponseData.status == EventStatus.ACTIVATIONREQUESTED
            ? true
            : false
        }
      />
      <DoctTextField
        {...formName.accountNumber}
        showStar={false}
        className="mb-3"
        validationRules={{
          required: "It's Required Field",
        }}
        defaultValue=""
        touched={touched}
        disabled={
          apiResponseData.status == EventStatus.ACTIVE ||
          apiResponseData.status == EventStatus.ACTIVATIONREQUESTED
            ? true
            : false
        }
      />
      <DoctAutoComplete
        {...formName.accountType}
        className="mb-3"
        options={[
          { label: 'Saving Account', value: 'Saving' },
          { label: 'Current Account', value: 'Current' },
        ]}
        onEndScroll={() => {}}
        validationRules={{
          required: "It's Required Field",
        }}
        onClearInput={() => {}}
        disabled={
          apiResponseData.status == EventStatus.ACTIVE ||
          apiResponseData.status == EventStatus.ACTIVATIONREQUESTED
            ? true
            : false
        }
      />
      <DoctTextField
        {...formName.ifscCode}
        showStar={false}
        className="mb-3"
        validationRules={{
          required: "It's Required Field",
        }}
        defaultValue=""
        touched={touched}
        disabled={
          apiResponseData.status == EventStatus.ACTIVE ||
          apiResponseData.status == EventStatus.ACTIVATIONREQUESTED
            ? true
            : false
        }
      />
      <DoctTextField
        {...formName.branchName}
        showStar={false}
        className="mb-5"
        validationRules={{}}
        defaultValue=""
        touched={touched}
        disabled={
          apiResponseData.status == EventStatus.ACTIVE ||
          apiResponseData.status == EventStatus.ACTIVATIONREQUESTED
            ? true
            : false
        }
      />
    </div>
  );
}

export default PaymentSettlement;
