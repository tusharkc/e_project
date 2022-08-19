import React from 'react';
import { AddNewMemberFormBody, AddNewMemberFormBodyContainer } from './components';
import './addNewMember.scss';
import { useProfileForm } from './components/hooks/useForm.ProfileForm';
import SuccessModal from './components/SuccessModal';
import FailureModal from './components/FailureModal';

const AddNewMemberForm = () => {
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
    clearErrors,
    qualificationDataOption,
    specialtyDataOption,
    setQualificationSearchText,
    setSpecialtySearchText,
    setWorkSpecialityArray,
    setEducationsArray,
    educationsArray,
    workSpecialityArray,
  } = useProfileForm();

  return (
    <form onSubmit={handleFormSubmit}>
      <FailureModal isSuccessfull={isSuccessFull} />
      <SuccessModal isSuccess={isSuccessFull} />
      <AddNewMemberFormBodyContainer setStatus={setStatus}>
        <AddNewMemberFormBody
          setWorkSpecialityArray={setWorkSpecialityArray}
          setEducationsArray={setEducationsArray}
          setSpecialtySearchText={setSpecialtySearchText}
          setQualificationSearchText={setQualificationSearchText}
          specialtyDataOption={specialtyDataOption}
          qualificationDataOption={qualificationDataOption}
          control={control}
          errors={errors}
          register={register}
          watch={watch}
          touched={touched}
          setValue={setValue}
          clearErrors={clearErrors}
          educationsArray={educationsArray}
          workSpecialityArray={workSpecialityArray}
        />
      </AddNewMemberFormBodyContainer>
    </form>
  );
};

export default AddNewMemberForm;
