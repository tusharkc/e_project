import React from 'react';
import { EditMemberFormBody, EditMemberFormBodyContainer } from './components';
import './addNewMember.scss';
import { useEditProfileForm } from './components/hooks/useForm.EditProfileForm';
import SuccessModal from './components/SuccessModal';

const EditMemberForm = () => {
  const {
    control,
    errors,
    handleFormSubmit,
    register,
    setStatus,
    isSuccessFull,
    watch,
    touched,
    setValue,
    profileUrlOnEdit,
    clearErrors,
    qualificationDataOption,
    specialtyDataOption,
    setQualificationSearchText,
    setSpecialtySearchText,
    setWorkSpecialityArray,
    setEducationsArray,
    educationsArray,
    workSpecialityArray,
  } = useEditProfileForm();

  return (
    <form onSubmit={handleFormSubmit}>
      <SuccessModal isSuccess={isSuccessFull} />
      <EditMemberFormBodyContainer setStatus={setStatus}>
        <EditMemberFormBody
          setSpecialtySearchText={setSpecialtySearchText}
          setQualificationSearchText={setQualificationSearchText}
          qualificationDataOption={qualificationDataOption}
          specialtyDataOption={specialtyDataOption}
          control={control}
          errors={errors}
          register={register}
          watch={watch}
          touched={touched}
          setValue={setValue}
          profileUrlOnEdit={profileUrlOnEdit}
          clearErrors={clearErrors}
          educationsArray={educationsArray}
          workSpecialityArray={workSpecialityArray}
          setWorkSpecialityArray={setWorkSpecialityArray}
          setEducationsArray={setEducationsArray}
        />
      </EditMemberFormBodyContainer>
    </form>
  );
};

export default EditMemberForm;
