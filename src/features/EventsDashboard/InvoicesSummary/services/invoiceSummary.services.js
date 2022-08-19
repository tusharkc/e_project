import * as API_ENDPOINT from '../../../../api/apiEndpoints';
import axios from 'axios';
import qs from 'qs';

const BASE_URL = `${process.env.REACT_APP_BASE_API_URL}${API_ENDPOINT.EVENT_BASE_API_ROUTE}${API_ENDPOINT.BUSINESS_BASE_API_ROUTE}/${API_ENDPOINT.EVENT}`;

async function APIInvoicesSummary(responseData, setErrorFormSubmit) {
  const { id, route, fromDate, toDate, type, fileName, responseType } = responseData;

  let urlApi = `${BASE_URL}/${id}/${route}`;

  let queryObj = {};

  if (fromDate && toDate) {
    queryObj['fromDate'] = fromDate;
    queryObj['toDate'] = toDate;
  }

  if (type) {
    queryObj['type'] = type;
  }

  if (Object.keys(queryObj)) {
    urlApi += `?${qs.stringify(queryObj)}`;
  }

  try {
    const response = await axios.get(urlApi, responseType);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (e) {
    if (responseType.responseType == 'arraybuffer') {
      setErrorFormSubmit(
        JSON.parse(String.fromCharCode.apply(null, new Uint8Array(e?.response?.data))),
      );
      return;
    }
    e?.response?.data?.text()?.then((obj) => {
      setErrorFormSubmit(JSON.parse(obj));
    });
  }
}

export default APIInvoicesSummary;
