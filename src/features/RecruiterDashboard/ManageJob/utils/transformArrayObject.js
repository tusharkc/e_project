export const transformArrayValues = (values) => {
  const modifiedValues = { ...values };
  let modifiedArray = [];
  Object.keys(modifiedValues).map((item) => {
    if (modifiedValues[item]?.value) {
      modifiedValues[item] = modifiedValues[item]?.value;
    } else if (Array.isArray(modifiedValues[item])) {
      modifiedValues[item].map((arrayIteration) => {
        if (arrayIteration?.value) {
          modifiedArray.push(arrayIteration?.value);
          modifiedValues[item] = modifiedArray;
        }
      });
    }
  });

  return modifiedValues;
};
