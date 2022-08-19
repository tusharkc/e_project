import BasicInfo from '../components/courseListingFormSections/BasicInfo';
import SeatsDurationsFees from '../components/courseListingFormSections/Seats&Durations&Fees';
import ListFaculties from '../components/courseListingFormSections/ListFaculties/ListFaculties';
import SelectApplyingOptions from '../components/courseListingFormSections/SelectApplyingOption/SelectApplyingOptions';
import AdditionalInfo from '../components/courseListingFormSections/AdditionalInfo';
import React from 'react';
import useFormCourses from './useForm.Courses';

export const useTenantCourses = () => {
  const {
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
  } = useFormCourses();

  const courseFormParts = [
    {
      formSectionHeading: '1. Course Basic Info',
      childElement: (
        <BasicInfo
          control={control}
          error={errors}
          affiliations={affiliations}
          setAffiliations={setAffiliations}
          watch={watch}
        />
      ),
    },
    {
      formSectionHeading: '2. Seats, Duration, Fees',
      childElement: (
        <SeatsDurationsFees
          control={control}
          error={errors}
          watch={watch}
          intakesArr={intakesArr}
          setIntakesArr={setIntakesArr}
        />
      ),
    },
    {
      formSectionHeading: '3. Add Faculties',
      childElement: (
        <ListFaculties
          control={control}
          error={errors}
          watch={watch}
          reset={reset}
          facultiesArr={facultiesArr}
          setFacultiesArr={setFacultiesArr}
          setValue={setValue}
        />
      ),
    },
    {
      formSectionHeading: '4. Admission Info, Upload Brochure',
      childElement: (
        <AdditionalInfo
          minimumEducationIdArr={minimumEducationIdArr}
          setMinimumEducationIdArr={setMinimumEducationIdArr}
          control={control}
          error={errors}
          watch={watch}
          minimumEducationArr={minimumEducationArr}
          setMinimumEducationArr={setMinimumEducationArr}
          setUploadedBrochure={setUploadedBrochure}
          uploadedBrochure={uploadedBrochure}
        />
      ),
    },
    {
      formSectionHeading: '5. Choose Applying Option',
      childElement: (
        <SelectApplyingOptions
          setValue={setValue}
          setCurrentApplyType={setCurrentApplyType}
          control={control}
          error={errors}
          watch={watch}
          activeApplyType={currentApplyType}
        />
      ),
    },
  ];
  return {
    courseFormParts,
    handleCourseFormSubmit,
    isPreview,
    courseDetails,
    handleOnPreviewApproved,
    setIsPreview,
    setIsDraftMode,
    isDraftMode,
  };
};
