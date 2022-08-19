import axios from 'axios';

export const getSpecialtyNames = async (searchText) => {
  const url = `${process.env.REACT_APP_BASE_API_URL}/contentcenter/specialties/names${
    searchText ? `?searchText=${searchText}` : ''
  }`;
  try {
    const specialtyOptionList = [];
    const response = await axios(url);

    await response?.data?.map((item) => {
      specialtyOptionList.push({ title: item.name, id: item.id });
    });

    return specialtyOptionList;
  } catch (error) {
    console.log(error);
  }
};

export const getSubjectTagsNames = async (searchText) => {
  const url = `${process.env.REACT_APP_BASE_API_URL}/contentcenter/subject-tags/names${
    searchText ? `?searchText=${searchText}` : ''
  }`;
  try {
    const subjectTagsOptionList = [];
    const response = await axios(url);

    await response?.data?.map((item) => {
      subjectTagsOptionList.push({ title: item.name, id: item.id });
    });

    return subjectTagsOptionList;
  } catch (error) {
    console.log(error);
  }
};
