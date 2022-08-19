import React, { useEffect } from 'react';
import useFieldOptions from '../../../../hooks/useFieldOptions/useFieldOptions';

const useResetFormValues = ({ resetData, setQualificationArray, setKeySkillArray }) => {
  const resetFormValues = { ...resetData };

  const { optionsArray: minimumEducationData } = useFieldOptions({
    apiRoute: '/qualifications/names',
  });

  useEffect(() => {
    if (minimumEducationData && resetFormValues?.qualificationIds) {
      const educationChipsData = [];
      resetFormValues?.qualificationIds?.map((qualificationId) => {
        educationChipsData?.push(
          minimumEducationData.find((education) => {
            return education?.id == qualificationId;
          }),
        );

        setQualificationArray(educationChipsData);
      });
    }
    if (resetFormValues?.keySkills) {
      resetFormValues?.keySkills?.map((skill) => {
        setKeySkillArray((prevState) => [...prevState, skill]);
      });
    }
  }, [minimumEducationData]);

  resetFormValues['startYear'] = {
    label: resetFormValues?.startYear,
    value: resetFormValues?.startYear,
  };

  resetFormValues['endYear'] = {
    label: resetFormValues?.endYear,
    value: resetFormValues?.endYear,
  };

  resetFormValues['industry'] = {
    label: resetFormValues?.industry?.replace(/([A-Z])/g, ' $1').trim(),
    value: resetFormValues?.industry,
  };

  resetFormValues['employementType'] = {
    label: resetFormValues?.employementType?.replace(/([A-Z])/g, ' $1').trim(),
    value: resetFormValues?.employementType,
  };

  resetFormValues['salaryType'] = {
    label: resetFormValues?.salaryType?.replace(/([A-Z])/g, ' $1').trim(),
    value: resetFormValues?.salaryType,
  };

  resetFormValues['countryId'] = {
    label: 'India',
    value: 1,
  };

  resetFormValues['stateId'] = {
    label: resetFormValues?.state?.name,
    value: resetFormValues?.state?.id,
  };

  resetFormValues['cityId'] = {
    label: resetFormValues?.city?.name,
    value: resetFormValues?.city?.id,
  };

  return { resetFormValues };
};

export default useResetFormValues;
