/* eslint-disable prettier/prettier */
import {
  DoctCheckbox,
  DoctDatePickerV2,
  DoctDateRangePicker,
  DoctPageLoading,
  DoctRadioGroup,
} from '@doct-react/app';
import { DoctTypography, DoctRow, DoctCol } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import qs from 'qs';
import ManageMembershipDropdown from './Membership/ManageMembershipDropdown';
import LocationOptionDropdown from './Location/LocationOptionDropdown';
import useFormManageDirectoryFilter from './useFormManageDirectory.Filter';
import { useGetFilterDataOptionsQuery } from '../services/members.services';
import dayjs from 'dayjs';
import useQueryHooks from '../../../../hooks/useQueryHooks';
import { useNavigate } from 'react-router-dom';

const ManageDirectoryFilter = ({ defaultValue }) => {
  const { data: filterDataOptions, isLoading } = useGetFilterDataOptionsQuery();

  // const [memberStatuses, setMemberStatuses] = useState([]);
  // const [allDataFromApi, setAllDataFromApi] = useState();

  // useEffect(() => {
  //   if (filterDataOptions) {
  //     setAllDataFromApi(filterDataOptions);
  //   }
  // }, [filterDataOptions]);

  const DATE_TIME = {
    dateRange: {
      name: 'dateRange',
      label: {
        startDate: 'Start Date',
        endDate: 'End Date',
      },
      id: 'dateRange',
    },
  };

  const {
    control,
    errors,
    handleFormSubmit,
    reset,
    watch,
    fromDate,
    toDate,
    filterObj,
    setFilterObj,
  } = useFormManageDirectoryFilter(isLoading, defaultValue);

  const [isSpecificDateRange, setIsSpecificDateRange] = useState(false);

  const valTypeOfDate = watch('typeOfDate');

  useEffect(() => {
    if (valTypeOfDate == 1) {
      setIsSpecificDateRange(true);
    } else {
      setIsSpecificDateRange(false);
    }
  }, [valTypeOfDate]);

  useEffect(() => {
    const filterObj = {};

    if (defaultValue?.fromDate?.filter((el) => el)?.length) {
      filterObj.fromDate = new Date(defaultValue?.fromDate);
    }

    if (defaultValue?.toDate?.filter((el) => el)?.length) {
      filterObj.toDate = new Date(defaultValue?.toDate);
    }

    if (
      defaultValue?.fromDate?.filter((el) => el)?.length &&
      defaultValue?.toDate?.filter((el) => el)?.length
    ) {
      setIsSpecificDateRange(true);
      filterObj.typeOfDate = 1;
    }
    reset(filterObj);
  }, []);

  return (
    <>
      {isLoading ? (
        <DoctPageLoading />
      ) : (
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <DoctTypography variant="subtitle2" className="mt-0 form-heading-mb">
            Renewal Date
          </DoctTypography>
          <DoctRadioGroup
            name="typeOfDate"
            id="typeOfDate"
            control={control}
            options={[
              { value: 0, label: 'All time' },
              { value: 1, label: 'Specific Date range' },
            ]}
            errors={{}}
            isErrors={errors}
          />
          {isSpecificDateRange && (
            <div className={errors?.dateRange ? 'custom-error' : ''}>
              <DoctDateRangePicker
                control={control}
                name={DATE_TIME.dateRange.name}
                id={DATE_TIME.dateRange.id}
                inputFormat={'dd/MM/yyyy'}
                isErrors={true}
              />
              <DoctRow>
                <DoctCol xs={6}>
                  <DoctDatePickerV2
                    inputProps={{
                      label: 'From date',
                      id: 'fromDate',
                      dateFormat: 'dd MMM yyyy',
                      autoComplete: 'off',
                    }}
                    control={control}
                    isErrors={errors}
                    showStar={false}
                    name="fromDate"
                  />
                </DoctCol>
                <DoctCol xs={6}>
                  {fromDate ? (
                    <DoctDatePickerV2
                      inputProps={{
                        label: 'To date',
                        id: 'toDate',
                        dateFormat: 'dd MMM yyyy',
                        minDate: dayjs(fromDate).toDate(),
                        autoComplete: 'off',
                      }}
                      control={control}
                      isErrors={errors}
                      showStar={false}
                      name="toDate"
                    />
                  ) : (
                    <DoctDatePickerV2
                      inputProps={{
                        label: 'To date',
                        id: 'toDate',
                        dateFormat: 'dd MMM yyyy',
                        autoComplete: 'off',
                      }}
                      control={control}
                      isErrors={errors}
                      showStar={false}
                      name="toDate"
                    />
                  )}
                </DoctCol>
              </DoctRow>
              {errors?.dateRange && (
                <p className="MuiFormHelperText-root Mui-error">{errors?.dateRange?.message}</p>
              )}
            </div>
          )}
          <div className="line-divider bg-grey-300 my-3 mx-n3"></div>
          <DoctTypography variant="subtitle2" className="mt-0 form-heading-mb">
            Status
          </DoctTypography>

          {filterDataOptions?.facets?.memberStatuses.map((status, index) => (
            <DoctCheckbox
              onChange={(e) => {
                let obj = { ...filterObj };
                if (e.target.checked) {
                  obj.memberStatuses = [...obj.memberStatuses, e.target.value];
                } else {
                  obj.memberStatuses = obj.memberStatuses.filter((value) => {
                    return value != e.target.value;
                  });
                }
                // setStatusFilterData(obj);
                setFilterObj(obj);
              }}
              key={index}
              name={`${status.value}`}
              label={`${status.value}`}
              id={`${status.value}`}
              control={control}
              checkboxProps={{ value: status.value }}
              isErrors={errors}
              validationRules={{}}
              className="d-block"
              isChecked={defaultValue?.['memberStatuses']?.find((val) => {
                return val == status.value;
              })}
            />
          ))}

          <ManageMembershipDropdown
            watch={watch}
            dropDownOptions={filterDataOptions?.facets?.memberships}
            control={control}
            error={errors}
            filterObj={filterObj}
            setFilterObj={setFilterObj}
            defaultValue={defaultValue}
          />

          <LocationOptionDropdown
            watch={watch}
            dropdownOptions={filterDataOptions?.facets}
            control={control}
            errors={errors}
            filterObj={filterObj}
            setFilterObj={setFilterObj}
            defaultValue={defaultValue}
          />
        </form>
      )}
    </>
  );
};

export default ManageDirectoryFilter;
