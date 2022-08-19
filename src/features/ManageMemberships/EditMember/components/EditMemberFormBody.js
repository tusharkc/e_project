import { DoctForm } from '@doct-react/app';
import React from 'react';
import BasicInformation from './EditMemberFormSections/BasicInformation';
import ContactAndLocationInformation from './EditMemberFormSections/ContactAndLocationInformation';
import MemberShipInformation from './EditMemberFormSections/MemberShipInformation';
import PersonalInformation from './EditMemberFormSections/ProfessionalInformation';

const EditMemberFormBody = ({
  control,
  errors,
  register,
  watch,
  touched,
  setValue,
  handleEducationSubmission,
  handleSpecialitySubmission,
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
}) => {
  return (
    <div className="bg-grey-200 px-4 py-3">
      <BasicInformation
        control={control}
        errors={errors}
        register={register}
        profileUrlOnEdit={profileUrlOnEdit}
      />
      <MemberShipInformation control={control} errors={errors} />
      <ContactAndLocationInformation
        control={control}
        errors={errors}
        watch={watch}
        setValue={setValue}
        touched={touched}
        clearErrors={clearErrors}
      />
      <PersonalInformation
        setSpecialtySearchText={setSpecialtySearchText}
        setQualificationSearchText={setQualificationSearchText}
        qualificationDataOption={qualificationDataOption}
        specialtyDataOption={specialtyDataOption}
        control={control}
        errors={errors}
        watch={watch}
        setWorkSpecialityArray={setWorkSpecialityArray}
        setEducationsArray={setEducationsArray}
        educationsArray={educationsArray}
        workSpecialityArray={workSpecialityArray}
      />
    </div>
  );
};

export default EditMemberFormBody;
