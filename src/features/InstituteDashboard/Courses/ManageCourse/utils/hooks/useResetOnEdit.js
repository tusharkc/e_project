import { useEffect } from 'react';
import useFieldOptions from '../../../../../../hooks/useFieldOptions/useFieldOptions';
import { returnTransformedResetObject } from '../getResetObj';

const useResetOnEdit = ({
  courseDataById,
  setIntakesArr,
  setFacultiesArr,
  setMinimumEducationArr,
  setAffiliations,
  setCurrentApplyType,
}) => {
  const resetFromObjOnEdit = { ...courseDataById };

  const { optionsArray: minimumEducationData } = useFieldOptions({
    apiRoute: '/qualifications/names',
  });

  const { optionsArray: affiliationData } = useFieldOptions({
    apiRoute: '/affiliations/names',
  });

  useEffect(() => {
    if (courseDataById?.faculties) {
      setFacultiesArr(courseDataById?.faculties);
    }
    if (courseDataById?.intakes) {
      setIntakesArr(courseDataById?.intakes);
    }
    if (courseDataById?.applyType) {
      setCurrentApplyType(courseDataById?.applyType);
    }

    if (minimumEducationData && courseDataById?.qualificationIds) {
      const educationChipsData = [];
      courseDataById?.qualificationIds?.map((qualificationId) => {
        educationChipsData.push(
          minimumEducationData.find((education) => {
            return education?.id == qualificationId;
          }),
        );

        setMinimumEducationArr(educationChipsData);
      });
    }

    if (affiliationData && courseDataById?.affiliationIds) {
      const affiliationChipData = [];
      courseDataById?.affiliationIds?.map((affiliationId) => {
        affiliationChipData.push(
          affiliationData.find((affiliation) => {
            return affiliation?.id == affiliationId;
          }),
        );

        setAffiliations(affiliationChipData);
      });
    }
  }, [courseDataById, minimumEducationData, affiliationData]);

  if (courseDataById) {
    resetFromObjOnEdit['courseTitleId'] = returnTransformedResetObject({
      resultObj: courseDataById,
      deepKey: 'courseTitle',
    });

    resetFromObjOnEdit['courseTypeId'] = returnTransformedResetObject({
      resultObj: courseDataById,
      deepKey: 'courseType',
    });

    resetFromObjOnEdit['specialtyId'] = returnTransformedResetObject({
      resultObj: courseDataById,
      deepKey: 'specialty',
    });

    resetFromObjOnEdit['durationType'] = returnTransformedResetObject({
      resultObj: courseDataById,
      deepKey: 'durationType',
    });
    resetFromObjOnEdit['feesType'] = returnTransformedResetObject({
      resultObj: courseDataById,
      deepKey: 'feesType',
    });
    resetFromObjOnEdit['accomodation'] = returnTransformedResetObject({
      resultObj: courseDataById,
      deepKey: 'accomodation',
    });
    resetFromObjOnEdit['disciplineId'] = {
      label: courseDataById?.specialty?.discipline,
      id: courseDataById?.specialty?.id,
    };

    returnTransformedResetObject({
      resultObj: courseDataById,
      deepKey: 'accomodation',
    });

    resetFromObjOnEdit['intakes'] = null;
  }

  return { resetFromObjOnEdit };
};

export default useResetOnEdit;
