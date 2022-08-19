import { DoctFileUpload } from '@doct-react/app';
import { DoctButton, DoctCol, DoctIcon, DoctTypography } from '@doct-react/core';
import { useDispatch, useSelector } from 'react-redux';
import './RegistrationStyle.scss';
import {
  selectCurrentStep,
  selectLoading,
  selectResponseData,
  selectShowError,
  setCurrentStep,
  setShowError,
} from '../../../createEvent.slice';
import { StepTitle } from '../../UiHelper';
import stepsName from '../stepsName';
import { FixedPanel, Tost } from '../../../../../../shared/ui';
import CurrentAndTotalSteps from '../../CurrentAndTotalSteps';
import useFormRegistration from './Form.Registration';
import RegistrationSection from './RegistrationFormSections/RegistrationSection';
import ContactInfoSection from './RegistrationFormSections/ContactInfoSection';
import { useEffect, useState } from 'react';
import FormGroup from '../../../../../../shared/FormGroup';
import OrganiserSection from './RegistrationFormSections/OrganiserSection';

export default function Registration() {
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const [erorFormSubmit, setErrorFormSubmit] = useState(null);
  const [showTost, setShowTost] = useState(false);

  const {
    handleFormSubmit,
    control,
    errors,
    touched,
    setValue,
    specialtyDataOption,
    setSpecialtySearchText,
    setSpecialityArray,
    specialityArray,
    setSubjectTagsSearchText,
    setSubjectTagsArray,
    subjectTagsArray,
    subjectTagsDataOption,
    register,
    userMember,
    setUploadedFiles,
    uploadedFiles,
    setMembers,
    members,
    setPhotoSrc,
    photoSrc,
    profileUrlOnEdit,
    findSpecialityByName,
    removeSelectedSpeciality,
    supporters,
    setSupporters,
    watch,
    findSubjectTagsByName,
    removeSelectedSubjectTag,
    defaultCountryValue,
    defaultStateValue,
  } = useFormRegistration();

  const loading = useSelector(selectLoading);
  const showError = useSelector(selectShowError);
  const [countryCode, setCountryCode] = useState();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowError(false));
    }, 2000);
  }, [showError]);

  useEffect(() => {
    if (uploadedFiles.length) {
      setValue('hiddenFileUpload', 'file');
    } else {
      setValue('hiddenFileUpload', null);
    }
  }, [uploadedFiles]);

  useEffect(() => {
    if (showTost) {
      setTimeout(() => {
        onTostCloseHandler();
      }, 2000);
    }
  }, [showTost]);

  const onTostCloseHandler = () => {
    setShowTost(false);
    setErrorFormSubmit(null);
  };

  return (
    <>
      <div className="mb-5">
        {showError && (
          <div className="position-fixed tost-container">
            <Tost
              variant={'error'}
              text={erorFormSubmit?.Title || 'Oops! something went wrong'}
              onPressedClose={onTostCloseHandler}
            />
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <DoctCol xs={8} className="mx-auto">
            <StepTitle>{stepsName.registration.label}</StepTitle>
            <RegistrationSection
              findSubjectTagsByName={findSubjectTagsByName}
              removeSelectedSubjectTag={removeSelectedSubjectTag}
              removeSelectedSpeciality={removeSelectedSpeciality}
              findSpecialityByName={findSpecialityByName}
              control={control}
              errors={errors}
              touched={touched}
              setSpecialtySearchText={setSpecialtySearchText}
              setSpecialityArray={setSpecialityArray}
              specialityArray={specialityArray}
              specialtyDataOption={specialtyDataOption}
              setSubjectTagsSearchText={setSubjectTagsSearchText}
              setSubjectTagsArray={setSubjectTagsArray}
              subjectTagsArray={subjectTagsArray}
              subjectTagsDataOption={subjectTagsDataOption}
              register={register}
              photoSrc={photoSrc}
              setPhotoSrc={setPhotoSrc}
              profileUrlOnEdit={profileUrlOnEdit}
            />
            <FormGroup className="mt-3" title="Upload Brochure (optional)">
              <DoctFileUpload
                uploadTitle="You can upload event details brochure for download."
                uploadMaxFilesMessage="Upload document in PDF, JPEG, PNG formats up to 5 MB size."
                maxFiles={1}
                uploadedFiles={uploadedFiles || []}
                setUploadedFiles={setUploadedFiles}
                accept=".pdf, .png, .jpg, .jpeg"
                maxFileSizeInMb={5}
              />
            </FormGroup>
            <div className="horizontal_line_grey position-relative mt-5 mb-4"></div>
            <OrganiserSection
              userMember={userMember}
              setMembers={setMembers}
              members={members}
              setSupporters={setSupporters}
              supporters={supporters}
              control={control}
              errors={errors}
              touched={touched}
              setValue={setValue}
              watch={watch}
              defaultCountryValue={defaultCountryValue}
              defaultStateValue={defaultStateValue}
              setCountryCode={setCountryCode}
            />
            <div className="horizontal_line_grey position-relative mt-5 mb-3"></div>
            <ContactInfoSection
              control={control}
              errors={errors}
              touched={touched}
              countryCode={countryCode}
              setValue={setValue}
            />
          </DoctCol>
        </form>
      </div>
      <FixedPanel
        container
        className="backdrop-filter"
        contentClassName="d-flex align-items-center py-12px"
      >
        <CurrentAndTotalSteps />
        <DoctButton
          text="Back"
          variant="outline"
          className="mr-2"
          onButtonClickHandler={() => {
            dispatch(setCurrentStep(currentStep - 1));
          }}
        />
        <DoctButton
          disabled={loading}
          text="Save & Next"
          className=""
          onButtonClickHandler={() => {
            handleFormSubmit();
          }}
        />
      </FixedPanel>
    </>
  );
}
