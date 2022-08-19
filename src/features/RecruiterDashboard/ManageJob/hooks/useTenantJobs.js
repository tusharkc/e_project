import React from 'react';
import JobBasicInfo from '../components/JobFormParts/JobBasicInfo';
import JobDescription from '../components/JobFormParts/JobDescription';
import JobOrganizationInfo from '../components/JobFormParts/JobOrganizationInfo';
import useFormJobs from './useForm.jobs';

const useTenantJobs = () => {
  const {
    control,
    errors,
    watch,
    setValue,
    handleJobFormSubmit,
    qualificationArray,
    setQualificationArray,
    keySkillArray,
    setKeySkillArray,
    isPreview,
    setIsPreview,
    modifiedJobFormValues,
    handleOnPreviewApproved,
    setApplicationStatus,
  } = useFormJobs();

  const formParts = [
    {
      formSectionHeading: '1. Basic Info',
      childElement: (
        <JobBasicInfo
          qualificationArray={qualificationArray}
          setQualificationArray={setQualificationArray}
          control={control}
          errors={errors}
          watch={watch}
        />
      ),
    },
    {
      formSectionHeading: '2. Job Description',
      childElement: (
        <JobDescription
          setKeySkillArray={setKeySkillArray}
          keySkillArray={keySkillArray}
          control={control}
          errors={errors}
        />
      ),
    },
    {
      formSectionHeading: '3. Organization Info',
      childElement: <JobOrganizationInfo setValue={setValue} control={control} errors={errors} />,
    },
  ];

  return {
    formParts,
    handleOnPreviewApproved,
    handleJobFormSubmit,
    isPreview,
    setIsPreview,
    modifiedJobFormValues,
    setApplicationStatus,
  };
};

export default useTenantJobs;
