import axios from 'axios';

const BASE_URL = '/enterprisecenter/tenant/membership';

export const addNewMembership = async (postvalues) => {
  let formData = new FormData();

  formData.append('membershipTitle', postvalues.membershipTitle);
  formData.append('currency', postvalues.currency);
  formData.append('fees', postvalues.fees);
  formData.append('renewalPaymentTerms', postvalues.renewalPaymentTerms);
  postvalues.benefits?.forEach((item) => {
    formData.append('benefits[]', item);
  });

  postvalues.criterias?.forEach((item) => {
    formData.append('criterias[]', item);
  });

  const url = `${process.env.REACT_APP_BASE_API_URL}${BASE_URL}`;

  try {
    await axios({
      method: 'post',
      url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {});
  } catch (error) {
    console.log(error);
  }
};
