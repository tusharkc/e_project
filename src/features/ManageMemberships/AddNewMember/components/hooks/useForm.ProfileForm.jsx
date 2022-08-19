import { DoctForm } from '@doct-react/app';
import { useEffect, useState } from 'react';
import {
  createNewMember,
  getQualificationNames,
  getSpecialtyNames,
} from '../services/createNewMember.service';

const defaultValues = {
  mobileCountryCode: {
    label: '+91',
  },
  whatsappCountryCode: {
    label: '+91',
  },
};

export const useProfileForm = () => {
  const { handleSubmit, control, errors, register, watch, setValue, touched, clearErrors, reset } =
    DoctForm({
      mode: 'onChange',
      defaultValues: {},
    });

  const [qualificationSearchText, setQualificationSearchText] = useState();
  const [specialtySearchText, setSpecialtySearchText] = useState();

  const [educationsArray, setEducationsArray] = useState([]);
  const [workSpecialityArray, setWorkSpecialityArray] = useState([]);

  useEffect(() => {
    reset(defaultValues);
  }, []);

  useEffect(() => {
    getQualificationNames(qualificationSearchText).then((data) => {
      setQualificationDataOption(data);
    });

    getSpecialtyNames(specialtySearchText).then((data) => {
      setSpecialtyDataOption(data);
    });
  }, [qualificationSearchText, specialtySearchText]);

  const [status, setStatus] = useState('Active');
  const [isSuccessFull, setIsSuccessFull] = useState();

  const [qualificationDataOption, setQualificationDataOption] = useState();
  const [specialtyDataOption, setSpecialtyDataOption] = useState();

  const handleFormSubmit = handleSubmit((values) => {
    values.gender = values.gender.label;
    values.membership = values.membership.value;
    values.mobileCode = '+91';
    values.whatsAppNumberCode = '+91';
    if (values.birthDate) {
      values.birthDate = new Date(values.birthDate).toISOString();
    }
    if (values.enrollmentDate) {
      values.enrollmentDate = new Date(values.enrollmentDate).toISOString();
    }
    if (values.renewalDate) {
      values.renewalDate = new Date(values.renewalDate).toISOString();
    }
    values.memberStatus = status;
    values.educations = educationsArray;
    values.workSpecialities = workSpecialityArray;
    values.profileFile = values.profileFile[0];
    values.correspondenceCountry = values.correspondenceCountry.label;
    values.correspondenceState = values.correspondenceState.label;
    values.correspondenceCity = values.correspondenceCity.label;
    values.permanentCountry = values.permanentCountry.label;
    values.permanentState = values.permanentState.label;
    values.permanentCity = values.permanentCity.label;
    const omitNullVal = {};

    Object.keys(values).map((key) => {
      if (values[key]) {
        omitNullVal[key] = values[key];
      }
    });

    createNewMember(omitNullVal)
      .then(() => {
        setIsSuccessFull(true);
      })
      .catch(() => {
        setIsSuccessFull(false);
      });
  });

  return {
    handleFormSubmit,
    control,
    errors,
    register,
    watch,
    setValue,
    touched,
    setStatus,
    isSuccessFull,
    clearErrors,
    qualificationDataOption,
    specialtyDataOption,
    setQualificationSearchText,
    setSpecialtySearchText,
    setWorkSpecialityArray,
    setEducationsArray,
    educationsArray,
    workSpecialityArray,
  };
};
