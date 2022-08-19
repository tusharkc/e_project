import {
  DoctAutoComplete,
  DoctDatePicker,
  DoctDateRangePicker,
  DoctDatePickerV2,
  DoctTextField,
} from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { getMembershipList } from '../services/createNewMember.service';
import '../../addNewMember.scss';
import dayjs from 'dayjs';
const MemberShipInformation = ({ control, errors, watch }) => {
  const [dropdownOptions, setDropdownOptions] = useState();

  useEffect(() => {
    getMembershipList().then((values) => {
      setDropdownOptions(values);
    });
  }, []);
  const watchStartDate = watch('enrollmentDate');

  return (
    <div className=" my-3">
      <DoctTypography
        variant="h6"
        className="membership_info_title_border p-3 font-weight-regular text-grey-600 bg-white"
      >
        Membership Information
      </DoctTypography>
      <div className="bg-grey-100 membership_info_contents py-5 d-flex align-items-center justify-content-center">
        <div className="form_container_body">
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

            <div className="w-50 pl-3">
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
            <div className="w-50 pl-3">
              <DoctTypography variant="subtitle1">Renewal Date</DoctTypography>
              <DoctDatePickerV2
                inputProps={{
                  label: 'Renewal Date',
                  id: 'renewalDate',
                  dateFormat: 'dd MMM yyyy',
                  minDate: dayjs(watchStartDate).toDate(),
                  autoComplete: 'off',
                }}
                control={control}
                isErrors={errors}
                showStar={false}
                name="renewalDate"
              />
              {/* <DoctDatePicker
                label="Renewal Date"
                control={control}
                id="renewalDate"
                name="renewalDate"
                isErrors={errors}
                className={''}
                validationRules={{}}
              /> */}
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
            <div className="w-50 pl-3">
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
