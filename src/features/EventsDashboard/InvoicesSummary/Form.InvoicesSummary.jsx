import {
  DoctAutoComplete,
  DoctDatePickerV2,
  DoctDateRangePicker,
  DoctRadioGroup,
} from '@doct-react/app';
import { DoctButton, DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useFormInvoiceSummary from './hooks/useForm.InvoiceSummary';
import dayjs from 'dayjs';
import { useGetEventByIdQuery } from '../ManageEvents/services/events.services';

const FORM_INVIOCE_EL = {
  event: {
    name: 'event',
    label: 'Select event',
    id: 'event',
  },
  downloadOption: {
    label: 'Select',
    name: 'downloadOption',
    id: 'downloadOption',
  },
  dateRange: {
    name: 'dateRange',
    label: {
      startDate: 'Start Date',
      endDate: 'End Date',
    },
    id: 'dateRange',
  },
};

function DateRangePicker({ control, errors, watch, setValue }) {
  const fromDate = watch('fromDate');

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
          onChange={() => {
            setValue('toDate', null);
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
  );
}

export default function FormInvoicesSummary({
  eventOptions,
  isDownloadLoading,
  setIsDownloadLoading,
  setErrorFormSubmit,
}) {
  const { control, errors, touched, handleFormSubmit, watch, setError, setValue } =
    useFormInvoiceSummary(setIsDownloadLoading, setErrorFormSubmit);
  const [id, setId] = useState();
  const { data } = useGetEventByIdQuery({ id: id });
  const [isSpecificDateRange, setIsSpecificDateRange] = useState(false);
  const valTypeOfDate = watch('typeOfDate');
  const watchEventSelection = watch('event');

  const downloadOption = [
    {
      label: 'PDF Invoices (zip)',
      type: 'PDF',
      route: 'invoices',
      isDisabled: data?.eventPaymentType == 'Free' ? true : false,
    },
    {
      label: 'Invoice Excel Summary',
      value: 'Invoice Excel Summary',
      type: 'Invoice',
      route: 'summary',
      isDisabled: data?.eventPaymentType == 'Free' ? true : false,
    },
    {
      label: 'Attendees Excel Summary',
      type: 'Attendee',
      value: 'Attendees Excel Summary',
      route: 'summary',
    },
    { label: 'Exhibitors Excel Summary', value: 'Exhibitors Excel Summary', isDisabled: true },
    { label: 'Event Completion Report', value: 'Event Completion Report', isDisabled: true },
  ];

  useEffect(() => {
    setId(watchEventSelection?.value);
    setValue('downloadOption', '');
  }, [watchEventSelection]);

  useEffect(() => {
    setIsSpecificDateRange(Number(valTypeOfDate));
  }, [valTypeOfDate]);

  return (
    <>
      <div className="container-4xx">
        <form onSubmit={handleFormSubmit} action="">
          <div className="form_el">
            <DoctAutoComplete
              name={FORM_INVIOCE_EL.event.name}
              label={FORM_INVIOCE_EL.event.label}
              id={FORM_INVIOCE_EL.event.id}
              control={control}
              isErrors={errors}
              options={eventOptions}
              touched={touched}
              validationRules={{
                required: "It's Required Field",
              }}
              onEndScroll={() => null}
            />
          </div>
          <div className="form_el">
            <DoctTypography variant="subtitle2" className="form_el__title">
              Select download option
            </DoctTypography>
            <DoctAutoComplete
              name={FORM_INVIOCE_EL.downloadOption.name}
              label={FORM_INVIOCE_EL.downloadOption.label}
              id={FORM_INVIOCE_EL.downloadOption.id}
              control={control}
              isErrors={errors}
              options={downloadOption}
              touched={touched}
              validationRules={{
                required: "It's Required Field",
              }}
              onEndScroll={() => null}
              getOptionDisabled={(option) => option.isDisabled}
            />
          </div>
          <div className="form_el">
            <DoctTypography variant="subtitle2" className="form_el__title">
              Select time duration
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
          </div>

          {isSpecificDateRange > 0 && (
            <div className={errors?.dateRange ? 'custom-error' : ''}>
              <DateRangePicker
                control={control}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
              {/* <DoctDateRangePicker
                control={control}
                name={FORM_INVIOCE_EL.dateRange.name}
                id={FORM_INVIOCE_EL.dateRange.id}
                inputFormat={'dd/MM/yyyy'}
                isErrors={true}
              /> */}
              {errors?.dateRange && (
                <p className="MuiFormHelperText-root Mui-error">{errors?.dateRange?.message}</p>
              )}
            </div>
          )}
        </form>
      </div>
      <DoctTypography variant="textLabel1" className="text-grey-400">
        Docthub maintain your events database for upto two years (from the date of event
        completion).
      </DoctTypography>
      <div className="bg-white mx-n3 mx-sm-n4 mb-sm-n4 px-3 px-sm-4">
        <div className="common-box-pannel">
          <DoctButton
            size="medium"
            variant="contained"
            type="primary"
            text="Download"
            className="ml-auto"
            disabled={isDownloadLoading}
            onButtonClickHandler={() => {
              handleFormSubmit();
            }}
          />
        </div>
      </div>
    </>
  );
}

FormInvoicesSummary.propTypes = {
  eventOptions: PropTypes.array,
};
