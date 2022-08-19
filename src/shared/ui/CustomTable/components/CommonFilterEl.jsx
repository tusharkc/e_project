import { DoctDatePickerV2, DoctDateRangePicker, DoctFormCheckbox } from '@doct-react/app';
import { DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import qs from 'qs';
import { useEffect } from 'react';
import { transformStatus } from '../constants.customTable';
import useFormFilter from '../useForm.Filter';
import dayjs from 'dayjs';

function DateRangePicker({ control, errors, fromDate, setValue }) {
  return (
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
          onChange={() => setValue('toDate', null)}
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
  );
}

export default function CommonFilterEl({ defaultValue }) {
  const { control, errors, handleFormSubmit, reset, fromDate, setValue } =
    useFormFilter(defaultValue);

  useEffect(() => {
    const cloneDefaultValue = { ...defaultValue };
    delete cloneDefaultValue?.code;
    const filterObj = {};
    const stringValDefaultVal = qs.stringify(cloneDefaultValue);

    if (stringValDefaultVal.search('online') > -1) filterObj.online = true;
    if (stringValDefaultVal.search('offline') > -1) filterObj.offline = true;
    if (stringValDefaultVal.search('complementary') > -1) filterObj.complementary = true;
    if (stringValDefaultVal.search('confirmed') > -1) filterObj.confirmed = true;
    if (stringValDefaultVal.search(transformStatus['pending']) > -1)
      filterObj[transformStatus['pending']] = true;
    if (stringValDefaultVal.search('cancelled') > -1) filterObj.cancelled = true;

    if (defaultValue?.fromDate) {
      filterObj.fromDate = new Date(defaultValue?.fromDate);
    }

    if (defaultValue?.toDate) {
      filterObj.toDate = new Date(defaultValue?.toDate);
    }

    reset(filterObj);
  }, []);

  return (
    <>
      <form onSubmit={handleFormSubmit} autoComplete="off">
        <DoctTypography variant="subtitle2" className="mt-0 form-heading-mb">
          Select Date Range
        </DoctTypography>
        <div className="d-flex">
          <DateRangePicker
            control={control}
            errors={errors}
            fromDate={fromDate}
            setValue={setValue}
          />
        </div>
        <div className="line-divider bg-grey-300 my-3 mx-n3"></div>
        <DoctTypography variant="subtitle2" className="mt-0 form-heading-mb">
          Registration Type
        </DoctTypography>
        <DoctFormCheckbox
          name="online"
          label="Online"
          id="checkbox"
          control={control}
          isErrors={errors}
          validationRules={{}}
          className="d-block"
        />
        <DoctFormCheckbox
          name="offline"
          label="Offline"
          id="checkbox"
          control={control}
          isErrors={errors}
          validationRules={{}}
          className="d-block"
        />
        <DoctFormCheckbox
          name="complementary"
          label="Complementary"
          id="checkbox"
          control={control}
          isErrors={errors}
          validationRules={{}}
          className="d-block"
        />
        <div className="line-divider bg-grey-300 my-3 mx-n3"></div>
        <DoctTypography variant="subtitle2" className="mt-0 form-heading-mb">
          Order Status
        </DoctTypography>
        <DoctFormCheckbox
          name="confirmed"
          label="Confirmed"
          id="checkbox"
          control={control}
          isErrors={errors}
          validationRules={{}}
          className="d-block"
        />
        <DoctFormCheckbox
          name={transformStatus['pending']}
          label={transformStatus['created']}
          id="checkbox"
          control={control}
          isErrors={errors}
          validationRules={{}}
          className="d-block"
        />
        <DoctFormCheckbox
          name="cancelled"
          label="Cancelled"
          id="checkbox"
          control={control}
          isErrors={errors}
          validationRules={{}}
          className="d-block"
        />
      </form>
    </>
  );
}
