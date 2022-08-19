import { DoctForm } from '@doct-react/app';
import { useState } from 'react';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  editMember,
  getDefaultMemberInfo,
  getQualificationNames,
  getSpecialtyNames,
} from '../services/editMember.service';

const defaultValues = {
  mobileCountryCode: {
    label: '+91',
  },
  whatsappCountryCode: {
    label: '+91',
  },
};

export const useEditProfileForm = () => {
  const { handleSubmit, control, errors, register, watch, setValue, touched, reset, clearErrors } =
    DoctForm({
      mode: 'onChange',
      defaultValues: {},
    });

  const [profileUrlOnEdit, setProfileUrlOnEdit] = useState(null);

  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const id = query.get('id');
  const memberId = query.get('memberId');

  const [educationsArray, setEducationsArray] = useState([]);
  const [workSpecialityArray, setWorkSpecialityArray] = useState([]);

  useEffect(() => {
    getDefaultMemberInfo(memberId, id).then((memberDetails) => {
      memberDetails.gender = { label: memberDetails.gender };
      memberDetails.membership = {
        label: memberDetails.membership.membershipTitle,
        value: memberDetails.membership.id,
      };

      memberDetails.correspondenceCountry = {
        label: memberDetails.correspondenceCountry,
      };
      memberDetails.correspondenceState = {
        label: memberDetails.correspondenceState,
      };
      memberDetails.correspondenceCity = { label: memberDetails.correspondenceCity };
      memberDetails.permanentCountry = { label: memberDetails.permanentCountry };
      memberDetails.permanentState = { label: memberDetails.permanentState };
      memberDetails.permanentCity = { label: memberDetails.permanentCity };

      if (memberDetails?.profileUrl?.length > 0) {
        setProfileUrlOnEdit(memberDetails?.profileUrl);
      }

      let memberDetailsObj = { ...memberDetails, ...defaultValues };

      if (memberDetails?.whatsAppNumber == memberDetails?.mobileNumber) {
        memberDetailsObj.mobileNumberAsWhatsApp = true;
      }

      if (memberDetails?.permanentCity.label === memberDetails?.correspondenceCity.label) {
        memberDetailsObj.correspondenceAddressasPermanentAddress = true;
      }
      if (memberDetails.birthDate) {
        memberDetailsObj.birthDate = new Date(memberDetails.birthDate);
      }

      if (memberDetails.enrollmentDate) {
        memberDetailsObj.enrollmentDate = new Date(memberDetails.enrollmentDate);
      }

      if (memberDetails.renewalDate) {
        memberDetailsObj.renewalDate = new Date(memberDetails.renewalDate);
      }

      setEducationsArray(memberDetails?.educations || []);
      setWorkSpecialityArray(memberDetails?.workSpecialities || []);
      reset(memberDetailsObj);
    });
  }, [profileUrlOnEdit]);

  const [qualificationDataOption, setQualificationDataOption] = useState();
  const [specialtyDataOption, setSpecialtyDataOption] = useState();
  const [qualificationSearchText, setQualificationSearchText] = useState();
  const [specialtySearchText, setSpecialtySearchText] = useState();

  useEffect(() => {
    getQualificationNames(qualificationSearchText).then((data) => {
      setQualificationDataOption(data);
    });

    getSpecialtyNames(specialtySearchText).then((data) => {
      setSpecialtyDataOption(data);
    });
  }, [qualificationSearchText, specialtySearchText]);

  const [status, setStatus] = useState('Active');
  const [isSuccessFull, setIsSuccessFull] = useState(false);

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
    values.correspondenceCity = values.correspondenceCity?.label;
    values.permanentCity = values.permanentCity?.label;
    values.correspondenceCountry = values.correspondenceCountry?.label;
    values.permanentCountry = values.permanentCountry?.label;
    values.correspondenceState = values.correspondenceState?.label;
    values.permanentState = values.permanentState?.label;

    const omitNullVal = {};

    Object.keys(values).map((key) => {
      if (values[key]) {
        omitNullVal[key] = values[key];
      }
    });

    editMember(omitNullVal, id, memberId)
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
  };
};
