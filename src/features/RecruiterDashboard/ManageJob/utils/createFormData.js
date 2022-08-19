export const createFormData = (values) => {
  const formData = new FormData();

  Object.keys(values).map((item) => {
    if (Array.isArray(values[item])) {
      values[item]?.forEach((arrayObj) => formData.append(`${item}[]`, arrayObj));
    } else if (values[item]) {
      formData.append(item, values[item]);
    }
  });

  return formData;
};
