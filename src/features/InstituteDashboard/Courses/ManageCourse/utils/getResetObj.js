export const returnTransformedResetObject = ({ resultObj, deepKey }) => {
  const resetObj = {};

  if (resultObj[deepKey]) {
    if (resultObj[deepKey]?.name) {
      resetObj['label'] = resultObj[deepKey]?.name;
    } else {
      resetObj['label'] = resultObj[deepKey];
    }

    if (resultObj[deepKey]?.id) {
      resetObj['id'] = resultObj[deepKey]?.id;
    }
  }
  return resetObj;
};
