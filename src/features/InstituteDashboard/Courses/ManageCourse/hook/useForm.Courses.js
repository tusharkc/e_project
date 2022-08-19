import { DoctForm } from '@doct-react/app';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCourseFormValues,
  selectRawFormValues,
  setInstituteCourseFormValues,
  setRawFormValues,
} from '../ManageCourseSlice';
import { useEffect, useState } from 'react';
import {
  useAddCourseMutation,
  useEditCourseMutation,
  useGetCourseDetalsByIdQuery,
} from '../services/manageCourse.services';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as ROUTES from '../../../../../routes/constant';
import useResetOnEdit from '../utils/hooks/useResetOnEdit';

const useFormCourses = () => {
  const location = useLocation();
  const { pathname } = location;
  const courseDetails = useSelector(selectCourseFormValues);
  const rawFormValues = useSelector(selectRawFormValues);
  const [addCourse] = useAddCourseMutation();
  const [editCourse] = useEditCourseMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [intakesArr, setIntakesArr] = useState([]);
  const [facultiesArr, setFacultiesArr] = useState([]);
  const [minimumEducationArr, setMinimumEducationArr] = useState([]);
  const [minimumEducationIdArr, setMinimumEducationIdArr] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [isDraftMode, setIsDraftMode] = useState(false);
  const [currentApplyType, setCurrentApplyType] = useState(0);
  const [affiliations, setAffiliations] = useState([]);
  const courseId = pathname.replace(/[^0-9]/g, '');
  const { data: courseDataById } = useGetCourseDetalsByIdQuery({ id: courseId });
  const { resetFromObjOnEdit } = useResetOnEdit({
    courseDataById,
    setIntakesArr,
    setFacultiesArr,
    setMinimumEducationArr,
    setCurrentApplyType,
    setAffiliations,
  });
  const [uploadedBrochure, setUploadedBrochure] = useState([]);

  const defaultValues = {};

  // below useEffect is for reseting the form on pressing back button

  useEffect(() => {
    if (rawFormValues) {
      reset(rawFormValues);
    }
  }, [rawFormValues]);

  // below useEffect is for reseting the form on Edit

  useEffect(() => {
    if (resetFromObjOnEdit) {
      reset(resetFromObjOnEdit);
    }
  }, [courseDataById]);

  // Below function is responsible for transforming the data in order to send it to the api

  const transformCourseValues = (values) => {
    const affiliationIds = [];

    affiliations?.forEach((affiliation) => {
      affiliationIds.push(affiliation?.id);
    });

    const transformedValues = { ...values };
    transformedValues['courseTitle'] = transformedValues?.courseTitleId?.label;
    transformedValues['courseTitleId'] = transformedValues?.courseTitleId?.id;
    transformedValues['courseTypeId'] = transformedValues?.courseTypeId?.id;
    transformedValues['disciplineId'] = transformedValues?.disciplineId?.id;
    transformedValues['durationType'] = transformedValues?.durationType?.label;
    transformedValues['accomodation'] = transformedValues?.accomodation?.label;
    transformedValues['feesType'] = transformedValues?.feesType?.label;
    transformedValues['specialtyId'] = transformedValues?.specialtyId?.id;
    transformedValues['intakes'] = intakesArr;
    transformedValues['qualificationIds'] = minimumEducationIdArr;
    transformedValues['faculties'] = facultiesArr;
    transformedValues['affiliation'] = affiliationIds;
    transformedValues['applyType'] = currentApplyType;
    transformedValues['deleteBrochure'] = false;
    transformedValues['brochureUrl'] = uploadedBrochure;

    if (isDraftMode) {
      transformedValues['status'] = 'Draft';
    } else {
      transformedValues['status'] = 'ActivationRequested';
    }

    return transformedValues;
  };

  const { handleSubmit, control, errors, reset, watch, setValue } = DoctForm({
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  // below code is responsible for transforming and adding the values entered by the user in state.

  const handleCourseFormSubmit = handleSubmit((values) => {
    const rawFormData = { ...values };
    rawFormData['qualificationIds'] = minimumEducationIdArr;
    dispatch(setRawFormValues(values));
    dispatch(setInstituteCourseFormValues(transformCourseValues(values)));
    setIsPreview(true);
  });

  // below code is sending the data to api and navigating the user.

  const handleOnPreviewApproved = handleSubmit(() => {
    const formData = new FormData();

    Object.keys(courseDetails).map((item) => {
      if (Array.isArray(courseDetails[item])) {
        courseDetails[item]?.forEach((arrayObj) => formData.append(`${item}[]`, arrayObj));
      } else if (courseDetails[item]) {
        formData.append(item, courseDetails[item]);
      }
    });

    if (!courseId) {
      addCourse({ formValues: formData })
        .then(() => {
          dispatch(setRawFormValues(null));
          dispatch(setInstituteCourseFormValues(null));
          navigate(`/${ROUTES.DASHBOARD}/${ROUTES.INSTITUTE}/${ROUTES.COURSE_ACTION_SUCCSSFUL}`);
        })
        .catch(() => {
          navigate(`/${ROUTES.DASHBOARD}/${ROUTES.INSTITUTE}/${ROUTES.ERROR_IN_COURSE_ACTION}`);
        });
    } else {
      editCourse({ formValues: formData, id: courseId })
        .then(() => {
          dispatch(setRawFormValues(null));
          dispatch(setInstituteCourseFormValues(null));
          navigate(`/${ROUTES.DASHBOARD}/${ROUTES.INSTITUTE}/${ROUTES.COURSE_ACTION_SUCCSSFUL}`);
        })
        .catch(() => {
          navigate(`/${ROUTES.DASHBOARD}/${ROUTES.INSTITUTE}/${ROUTES.ERROR_IN_COURSE_ACTION}`);
        });
    }
  });

  return {
    control,
    errors,
    watch,
    reset,
    handleCourseFormSubmit,
    isPreview,
    courseDetails,
    intakesArr,
    setIntakesArr,
    facultiesArr,
    setFacultiesArr,
    minimumEducationArr,
    setMinimumEducationArr,
    handleOnPreviewApproved,
    setMinimumEducationIdArr,
    minimumEducationIdArr,
    setIsPreview,
    setIsDraftMode,
    isDraftMode,
    setCurrentApplyType,
    affiliations,
    setAffiliations,
    currentApplyType,
    setValue,
    uploadedBrochure,
    setUploadedBrochure,
  };
};

export default useFormCourses;
