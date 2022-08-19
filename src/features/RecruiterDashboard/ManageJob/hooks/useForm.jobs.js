import { DoctForm } from '@doct-react/app';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { userSelector } from '../../../../components';
import useQueryHooks from '../../../../hooks/useQueryHooks';
import { DASHBOARD, JOB_FAILED, JOB_SUBMITTED, RECRUITER } from '../../../../routes/constant';
import {
  usePostJobMutation,
  useGetJobByIdQuery,
  useEditJobMutation,
} from '../services/manageJob.services';
import {
  selectJobRawFormValues,
  selectModifiedJobFormValues,
  setModifiedValues,
  setRawFormValues,
} from '../slice/manageJobSlice';
import { createFormData } from '../utils/createFormData';
import { transformArrayValues } from '../utils/transformArrayObject';
import useResetFormValues from './useResetFormValues';

const useFormJobs = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const [postJob, { isSuccess: isPostJobSuccess }] = usePostJobMutation();
  const [editJob, { isSuccess: isEditJobSuccess }] = useEditJobMutation();
  const rawFormValues = useSelector(selectJobRawFormValues);
  const modifiedJobFormValues = useSelector(selectModifiedJobFormValues);
  const [keySkillArray, setKeySkillArray] = useState([]);
  const [qualificationArray, setQualificationArray] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState('ActivationRequested');
  const jobId = pathname.replace(/[^0-9]/g, '');
  const { id, ...query } = useQueryHooks();
  const { data: jobExistingData } = useGetJobByIdQuery({ id: jobId || query?.duplicateId });
  const navigate = useNavigate();
  const user = useSelector(userSelector);

  const { resetFormValues: resetFormValuesFromId } = useResetFormValues({
    resetData: jobExistingData,
    setQualificationArray,
    setKeySkillArray,
  });

  const { handleSubmit, control, errors, reset, watch, setValue } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  useEffect(() => {
    rawFormValues && reset(rawFormValues);
  }, [rawFormValues]);

  useEffect(() => {
    if ((jobId && resetFormValuesFromId) || (query?.duplicateId && resetFormValuesFromId)) {
      reset(resetFormValuesFromId);
    }
  }, [jobExistingData]);

  const handleJobFormSubmit = handleSubmit((values) => {
    values['qualificationIds'] = qualificationArray;
    values['keySkills'] = keySkillArray;
    values['status'] = applicationStatus;
    dispatch(setRawFormValues(values));
    dispatch(setModifiedValues(transformArrayValues(values)));
    setIsPreview(true);
  });

  const handleOnPreviewApproved = handleSubmit((values) => {
    if (!jobId) {
      postJob({ formValues: createFormData(modifiedJobFormValues) })
        .then(() =>
          isPostJobSuccess
            ? navigate(`/${DASHBOARD}/${RECRUITER}/${JOB_SUBMITTED}/${user?.tenant?.id}`)
            : navigate(`/${DASHBOARD}/${RECRUITER}/${JOB_FAILED}/${user?.tenant?.id}`),
        )
        .catch((error) => console.log(error));
    } else {
      editJob({ formValues: createFormData(modifiedJobFormValues), id: jobId })
        .then(() =>
          isEditJobSuccess
            ? navigate(`/${DASHBOARD}/${RECRUITER}/${JOB_SUBMITTED}/${user?.tenant?.id}`)
            : navigate(`/${DASHBOARD}/${RECRUITER}/${JOB_FAILED}/${user?.tenant?.id}`),
        )
        .catch((error) => console.log(error));
    }
  });

  return {
    handleJobFormSubmit,
    control,
    errors,
    watch,
    setValue,
    qualificationArray,
    setQualificationArray,
    keySkillArray,
    setKeySkillArray,
    handleOnPreviewApproved,
    setIsPreview,
    isPreview,
    modifiedJobFormValues,
    setApplicationStatus,
  };
};

export default useFormJobs;
