import {
  DoctAutoComplete,
  DoctDatePicker,
  DoctDatePickerV2,
  DoctDateRangePicker,
  DoctTextField,
} from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { getMembershipList } from '../services/editMember.service';
import '../../addNewMember.scss';
const MemberShipInformation = ({ control, errors }) => {
  const [dropdownOptions, setDropdownOptions] = useState();

  useEffect(() => {
    getMembershipList().then((values) => {
      setDropdownOptions(values);
    });
  }, []);

  return (
    <div className=" my-2">
      <DoctTypography
        variant="h6"
        className="membership_info_title_border p-3 text-grey-500 bg-white"
      >
        Membership Information
      </DoctTypography>
      <div className="bg-grey-100 membership_info_contents d-flex align-items-center justify-content-center">
        <div className="form_container_body mt-3">
          <div className="py-2 d-flex">
            <div className="w-50">
              <DoctTypography variant="subtitle1">Membership *</DoctTypography>
              <DoctAutoComplete
                label="Membership"
                isErrors={errors}
                id="membership"
                name="membership"
                variant="standard"
                control={control}
                options={dropdownOptions || []}
                validationRules={{ required: "It's Required Field" }}
              />
            </div>

            <div className="w-50 px-3">
              <DoctTypography variant="subtitle1" className="py-0 my-0">
                Member ID
              </DoctTypography>
              <DoctTypography variant="subtitle3" className="py-0 my-2 text-grey-600">
                Add for your internal reference
              </DoctTypography>
              <DoctTextField
                label="Membership ID"
                showStar={false}
                id="memberId"
                name="memberId"
                control={control}
                isErrors={errors}
                validationRules={{}}
              />
            </div>
          </div>
          <div className="d-flex w-100">
            <div className="w-50">
              <DoctTypography variant="subtitle1">Enrollment Date</DoctTypography>
              <DoctDatePickerV2
                inputProps={{
                  label: 'Enrollment Date',
                  id: 'enrollmentDate',
                  dateFormat: 'dd MMM yyyy',
                  autoComplete: 'off',
                }}
                control={control}
                isErrors={errors}
                showStar={false}
                name="enrollmentDate"
              />
            </div>
            <div className="w-50 px-3">
              <DoctTypography variant="subtitle1">Renewal Date</DoctTypography>
              <DoctDatePickerV2
                inputProps={{
                  label: 'Renewal Date',
                  id: 'renewalDate',
                  dateFormat: 'dd MMM yyyy',
                  autoComplete: 'off',
                }}
                control={control}
                isErrors={errors}
                showStar={false}
                name="renewalDate"
              />
            </div>
          </div>

          <div className="py-2 d-flex">
            <div className="w-50">
              <DoctTypography variant="subtitle1">Last Payment Remarks</DoctTypography>
              <DoctTextField
                label="Last Payment Remarks"
                control={control}
                id="lastPaymentRemarks"
                name="lastPaymentRemarks"
                isErrors={errors}
                className={''}
                validationRules={{}}
              />
            </div>
            <div className="w-50 px-3">
              <DoctTypography variant="subtitle1">Reference/ Proposed By</DoctTypography>

              <DoctTextField
                label="Reference/ Proposed By"
                className={''}
                id="reference"
                name="reference"
                control={control}
                isErrors={errors}
                validationRules={{}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberShipInformation;
