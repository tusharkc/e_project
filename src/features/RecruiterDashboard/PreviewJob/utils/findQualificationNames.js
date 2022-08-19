import React from 'react';
import useFieldOptions from '../../../../hooks/useFieldOptions/useFieldOptions';

const useFindQualificationNames = () => {
  const { optionsArray: qualificationsArr } = useFieldOptions({
    apiRoute: '/qualifications/names',
  });

  const findQualificationNames = (qualificationId) => {
    const qualificationName = qualificationsArr?.find(
      (qualifications) => qualificationId == qualifications?.value,
    )?.label;

    return qualificationName;
  };

  return { findQualificationNames };
};

export default useFindQualificationNames;
