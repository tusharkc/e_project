import { DoctForm } from '@doct-react/app';
import dayjs from 'dayjs';

import APIInvoicesSummary from '../services/invoiceSummary.services';

const responseTypeForZip = {
  responseType: 'arraybuffer',
};

const responseTypeForXlsx = {
  responseType: 'blob',
};

export default function useFormInvoiceSummary(setIsDownloadLoading, setErrorFormSubmit) {
  const { handleSubmit, control, errors, formState, reset, register, watch, setError, setValue } =
    DoctForm({
      mode: 'onChange',
      defaultValues: {},
    });

  const handleFormSubmit = handleSubmit((data) => {
    if (Number(data.typeOfDate)) {
      if (!data?.fromDate || !data?.toDate) {
        setError('dateRange', {
          type: 'manual',
          message: `It's Required Field`,
        });
        return;
      }
    }

    setIsDownloadLoading(true);
    let responseData = {};
    responseData = { ...responseData, id: data?.event?.value, route: data?.downloadOption?.route };
    if (data?.fromDate) {
      responseData.fromDate = dayjs(data?.fromDate).format('YYYY-MM-DD');
    }
    if (data?.toDate) {
      responseData.toDate = dayjs(data?.toDate).format('YYYY-MM-DD');
    }
    if (data?.downloadOption?.route == 'summary') {
      responseData.type = data?.downloadOption?.type;
      responseData.responseType = responseTypeForXlsx;
      responseData.fileName = 'file.xlsx';
    } else {
      responseData.responseType = responseTypeForZip;
      responseData.fileName = 'file.zip';
    }
    APIInvoicesSummary(responseData, setErrorFormSubmit)
      .then(() => {
        setIsDownloadLoading(false);
      })
      .catch((e) => {
        setIsDownloadLoading(false);
      });
  });
  const { touched } = formState;

  return {
    reset,
    handleSubmit,
    control,
    errors,
    touched,
    register,
    handleFormSubmit,
    watch,
    setError,
    setValue,
  };
}
