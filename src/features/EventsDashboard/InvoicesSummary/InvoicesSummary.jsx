import { DoctLoading } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import { useEffect, useState } from 'react';
import { useGetInvoicesQuery, useGetInvoicesSummeryQuery, useGetInvoiceSummaryQuery } from '.';
import { Tost } from '../../../shared/ui';
import { useGetAllEventsQuery, useGetEventsQuery } from '../ManageEvents';
import FormInvoicesSummary from './Form.InvoicesSummary';

export function usePrepareOptionsEvents(data) {
  const array = [];
  const { events = [] } = data || {};
  events?.map((el) => {
    if (el.name != null) {
      array.push({
        label: el.name,
        value: el.id,
      });
    }
  });
  return { eventOptions: array };
}

export default function InvoicesSummary() {
  const { data, isLoading } = useGetAllEventsQuery();

  const [formData, setFormData] = useState({});
  const [erorFormSubmit, setErrorFormSubmit] = useState(null);

  const [showTost, setShowTost] = useState(false);

  const { eventOptions } = usePrepareOptionsEvents(data);
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);

  useEffect(() => {
    setFormData({});
  }, [formData?.id]);

  useEffect(() => {
    if (showTost) {
      setTimeout(() => {
        onTostCloseHandler();
      }, 2000);
    }
  }, [showTost]);

  useEffect(() => {
    if (erorFormSubmit?.Status == 400) {
      setShowTost(true);
    }
  }, [erorFormSubmit]);

  const onTostCloseHandler = () => {
    setShowTost(false);
    setErrorFormSubmit(null);
  };

  return (
    <div className="p-sm-4 bg-grey-100-sm position-relative border-radius overflow-hidden box-shadow">
      {isDownloadLoading && (
        <div className="position-absolute absolute-center higher-z-index">
          <DoctLoading />
        </div>
      )}

      {showTost && (
        <div className="position-fixed tost-container">
          <Tost
            variant={'informative'}
            text={erorFormSubmit?.Title || 'No data found'}
            onPressedClose={onTostCloseHandler}
          />
        </div>
      )}

      <DoctTypography variant="h6" className="mb-4">
        Download Invoices & Summary
      </DoctTypography>
      <FormInvoicesSummary
        eventOptions={eventOptions}
        isDownloadLoading={isDownloadLoading}
        setIsDownloadLoading={setIsDownloadLoading}
        setErrorFormSubmit={setErrorFormSubmit}
      />
    </div>
  );
}
