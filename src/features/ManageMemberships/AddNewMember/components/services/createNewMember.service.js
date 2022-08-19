import axios from 'axios';

const BASE_ROUTE = '/enterprisecenter/tenant/membership';
const GET_ALL_MEMBERSHIPS_ROUTE = '/enterprisecenter/tenant/memberships';

export const createNewMember = async (dataToPost) => {
  const url = `${process.env.REACT_APP_BASE_API_URL}${BASE_ROUTE}/${dataToPost.membership}/create/member`;
  const formData = new FormData();
  formData.append('profileFile', dataToPost.profileFile);
  Object.keys(dataToPost).map((item) => {
    if (item != 'educations' && item != 'workSpecialities') {
      formData.append(`${item}`, `${dataToPost[item]}`);
    }
  });

  dataToPost.educations?.forEach((item) => {
    formData.append('educations[]', item);
  });

  dataToPost.workSpecialities?.forEach((item) => {
    formData.append('workSpecialities[]', item);
  });

  try {
    await axios({
      method: 'post',
      url,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(() => {});
  } catch (error) {
    console.error(error);
  }
};

export const getMembershipList = async () => {
  const url = `${process.env.REACT_APP_BASE_API_URL}${GET_ALL_MEMBERSHIPS_ROUTE}`;

  try {
    const response = await axios(url);
    const optionsList = [];

    await response.data.map((membership) => {
      optionsList.push({ label: membership.membershipTitle, value: membership.id });
    });

    return optionsList;
  } catch (error) {
    console.log(error);
  }
};

export const getQualificationNames = async (searchText) => {
  const url = `${process.env.REACT_APP_BASE_API_URL}/contentcenter/qualifications/names${
    searchText ? `?searchText=${searchText}` : ''
  }`;
  try {
    const response = await axios(url);
    const qualificationOptionList = [];

    await response?.data?.map((item) => {
      qualificationOptionList.push({ title: item.name });
    });

    return qualificationOptionList;
  } catch (error) {
    console.log(error);
  }
};

export const getSpecialtyNames = async (searchText) => {
  const url = `${process.env.REACT_APP_BASE_API_URL}/contentcenter/specialties/names${
    searchText ? `?searchText=${searchText}` : ''
  }`;
  try {
    const specialtyOptionList = [];
    const response = await axios(url);

    await response?.data?.map((item) => {
      specialtyOptionList.push({ title: item.name });
    });

    return specialtyOptionList;
  } catch (error) {
    console.log(error);
  }
};
