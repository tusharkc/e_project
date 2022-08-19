import axios from 'axios';

const BASE_URL = '/enterprisecenter/tenant/membership';

export const getDefaultMembershipValues = async (id) => {
  const url = `${process.env.REACT_APP_BASE_API_URL}${BASE_URL}/${id}`;

  let defaultValues;
  try {
    await axios(url).then((data) => {
      defaultValues = data.data;
    });
  } catch (error) {
    console.log(error);
  }
  return defaultValues;
};

export const editMembership = async (postvalues, id) => {
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

  const url = `${process.env.REACT_APP_BASE_API_URL}${BASE_URL}/${id}`;

  try {
    await axios({
      method: 'put',
      url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {});
  } catch (error) {
    console.log(error);
  }
};
