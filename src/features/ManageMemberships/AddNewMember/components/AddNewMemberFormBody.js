import { DoctForm } from '@doct-react/app';
import React from 'react';
import BasicInformation from './AddNewMemberFormSections/BasicInformation';
import ContactAndLocationInformation from './AddNewMemberFormSections/ContactAndLocationInformation';
import MemberShipInformation from './AddNewMemberFormSections/MemberShipInformation';
import PersonalInformation from './AddNewMemberFormSections/ProfessionalInformation';

const AddNewMemberFormBody = ({
  control,
  errors,
  register,
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
}) => {
  return (
    <div className="bg-grey-200 px-4 py-3">
      <BasicInformation control={control} errors={errors} register={register} />
      <MemberShipInformation control={control} errors={errors} watch={watch} />
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
        specialtyDataOption={specialtyDataOption}
        qualificationDataOption={qualificationDataOption}
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

export default AddNewMemberFormBody;
