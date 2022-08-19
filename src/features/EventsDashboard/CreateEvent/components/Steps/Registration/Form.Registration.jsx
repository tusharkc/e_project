import { DoctForm } from '@doct-react/app';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEventById,
  saveApiData,
  saveRegistartionDetails,
  selectCreateEventResponse,
  selectCurrentStep,
  selectLoading,
  selectRegistartionDetails,
  selectResponseData,
  selectSaveAsDraftClicked,
  setCurrentStep,
  setDefaultState,
  setStepsFormData,
} from '../../../createEvent.slice';
import stepsName from '../stepsName';
import { getSpecialtyNames, getSubjectTagsNames } from './services/EventRegistrationSectionService';
import { useParams } from 'react-router-dom';
import { updateCreateEvent } from '../../../services/CreateEventServices';
import { useNavigate } from 'react-router-dom';

// const defaultValue = {
//   ['mobileCountryCode']: {
//     label: '+91',
//     value: '+91',
//   },
// };

export default function useFormRegistration() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentStep = useSelector(selectCurrentStep);
  const registartionDetails = useSelector(selectRegistartionDetails);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const createdEventResponse = useSelector(selectResponseData);
  const loading = useSelector(selectLoading);
  const draftBtnClicked = useSelector(selectSaveAsDraftClicked);
  const navigate = useNavigate();

  const { handleSubmit, control, errors, formState, reset, touched, watch, setValue, register } =
    DoctForm({
      mode: 'onChange',
      defaultValues: {},
    });

  const [specialtySearchText, setSpecialtySearchText] = useState();
  const [specialityArray, setSpecialityArray] = useState([]);
  const [specialtyDataOption, setSpecialtyDataOption] = useState();

  const [subjectTagsSearchText, setSubjectTagsSearchText] = useState();
  const [subjectTagsArray, setSubjectTagsArray] = useState([]);
  const [subjectTagsDataOption, setSubjectTagsDataOption] = useState();

  const [selectedSpecialityId, setSelectedSpecialityId] = useState([]);
  const [selectedSubjectTagId, setSelectedSubjectTagId] = useState([]);
  const [members, setMembers] = useState([]);
  const [supporters, setSupporters] = useState([]);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [photoSrc, setPhotoSrc] = useState();
  const [profileUrlOnEdit, setProfileUrlOnEdit] = useState(null);
  const [defaultCountryValue, setDefaultCountryValue] = useState();
  const [defaultStateValue, setDefaultStateValue] = useState();

  useEffect(() => {
    if (Object.keys(apiResponseData)?.length) {
      if (id == undefined) return;
      const values = { ...apiResponseData };
      if (values?.BrochureFile) {
        setUploadedFiles([values?.BrochureFile]);
      }
      if (values?.image?.coverImageUrl) {
        setProfileUrlOnEdit(values?.image?.coverImageUrl);
      }
      values.eventTitle = values.name;
      if (values.contactInformation) {
        values['personName'] = values.contactInformation?.personName;
        values['email'] = values.contactInformation?.email;
        values['mobileNo'] = values.contactInformation?.mobileNo;
        values['phoneNo'] = values.contactInformation?.phoneNo;
      }
      if (values.organizer) {
        values['Name'] = values.organizer.name;
        values['OrganizerPinCode'] = values.organizer.organizerPinCode;
      }
      if (values.organizer?.organizerCountry) {
        values['OrganizerCountry'] = {
          label: values.organizer.organizerCountry,
          value: values.organizer.organizerCountry,
        };
        setDefaultCountryValue(values.organizer.organizerCountry);
        values['OrganizerState'] = {
          label: values.organizer.organizerState,
          value: values.organizer.organizerState,
        };
        setDefaultStateValue(values.organizer.organizerState);
        values['OrganizerCity'] = {
          label: values.organizer.organizerCity,
          value: values.organizer.organizerCity,
        };
      }
      if (values.specialities?.length) {
        setSpecialityArray(values.specialities);
      }
      if (values.tags?.length) {
        setSubjectTagsArray(values.tags);
      }
      reset({ ...values });
    } else if (Object.keys(registartionDetails)?.length) {
      const values = { ...registartionDetails };
      if (values?.BrochureFile) {
        setUploadedFiles([values?.BrochureFile]);
      }
      if (values?.CoverImageFile) {
        setPhotoSrc(window.URL.createObjectURL(values?.CoverImageFile));
      }
      if (values.Organizer) {
        values['Name'] = values.Organizer.Name;
        values['OrganizerCountry'] = {
          label: values.Organizer.OrganizerCountry,
          value: values.Organizer.OrganizerCountry,
        };
        setDefaultCountryValue(values.Organizer.OrganizerCountry);
        values['OrganizerState'] = {
          label: values.Organizer.OrganizerState,
          value: values.Organizer.OrganizerState,
        };
        setDefaultStateValue(values.Organizer.OrganizerState);
        values['OrganizerCity'] = {
          label: values.Organizer.OrganizerCity,
          value: values.Organizer.OrganizerCity,
        };
        values['OrganizerPinCode'] = values.Organizer.OrganizerPinCode;
      }
      if (values.specialitiesArray?.length) {
        setSpecialityArray(values.specialitiesArray);
      }
      if (values.subjectTagsArray?.length) {
        setSubjectTagsArray(values.subjectTagsArray);
      }

      reset({ ...values });
    }
  }, [registartionDetails, apiResponseData]);

  useEffect(() => {
    if (id == undefined) return;
    dispatch(fetchEventById(id));
  }, [id]);

  useEffect(() => {
    if (draftBtnClicked == true) {
      handleFormSubmit();
      navigate(-1);
      dispatch(setDefaultState());
    }
  }, [draftBtnClicked]);

  useEffect(() => {
    getSpecialtyNames(specialtySearchText).then((data) => {
      setSpecialtyDataOption(data);
    });

    getSubjectTagsNames(subjectTagsSearchText).then((data) => {
      setSubjectTagsDataOption(data);
    });
  }, [specialtySearchText, subjectTagsSearchText]);

  const handleFormSubmit = handleSubmit((values) => {
    values.SpecialtyIds = selectedSpecialityId;
    values.SubjectTagIds = selectedSubjectTagId;
    values.specialitiesArray = specialityArray;
    values.subjectTagsArray = subjectTagsArray;
    values.BrochureFile = uploadedFiles[0];
    values.ContactInformation = {};
    values.ContactInformation.personName = values.personName ? values.personName : null;
    values.ContactInformation.mobileNo = values.mobileNo;
    values.ContactInformation.phoneNo = values.phoneNo ? values.phoneNo : null;
    values.ContactInformation.email = values.email;
    values.Organizer = {};
    values.Organizer.OrganizingTeam = [];
    values.Organizer.OrganizingTeam = members;
    if (values.imageProfile.length) {
      values.CoverImageFile = values.imageProfile[0];
    } else {
      values.CoverImageFile = registartionDetails.CoverImageFile;
    }
    values.Organizer.Name = values.Name;
    values.Organizer.OrganizerCountry = values.OrganizerCountry.label;
    values.Organizer.OrganizerState = values.OrganizerState.label;
    values.Organizer.OrganizerCity = values.OrganizerCity.label;
    values.Organizer.OrganizerPinCode = values.OrganizerPinCode;
    values.SupportedBy = supporters;
    delete values.ContactInformation?.mobileCountryCode;
    delete values.OrganizerCountry;
    delete values.OrganizerState;
    delete values.OrganizerCity;
    delete values.OrganizerName;
    delete values.OrganizerPinCode;
    if (createdEventResponse?.id) {
      values.Id = createdEventResponse.id;
    }
    if (id) {
      values.Id = id;
      dispatch(saveApiData({ ...values, ...apiResponseData }));
    }

    dispatch(saveRegistartionDetails(values));
    dispatch(updateCreateEvent(values.Id)); // PUT API Call
    if (draftBtnClicked == false) {
      if (loading == false) {
        dispatch(setCurrentStep(currentStep + 1));
        dispatch(setStepsFormData({ [stepsName.registration.name]: values }));
      }
    }
    // if (draftBtnClicked == true) {
    //   navigate(-1);
    //   dispatch(setDefaultState());
    // }
  });

  // select id of selectedSpeciality by name

  const findSpecialityByName = (selectedSpeciality) => {
    const foundSpeciality = specialtyDataOption.find((speciality) => {
      return speciality?.title == selectedSpeciality;
    });

    selectedSpecialityId.includes(foundSpeciality?.id) != true &&
      foundSpeciality?.id != undefined &&
      setSelectedSpecialityId((prevState) => [...prevState, foundSpeciality?.id]);
  };

  // remove speciality from array of ids

  const removeSelectedSpeciality = (selectedSpeciality) => {
    const foundSpeciality = specialtyDataOption.find((speciality) => {
      return speciality?.title == selectedSpeciality;
    });
    setSelectedSpecialityId(selectedSpecialityId.filter((id) => id != foundSpeciality?.id));
  };

  // select id of subjectTags by name

  const findSubjectTagsByName = (selectedSubjectTag) => {
    const foundSubjectTag = subjectTagsDataOption.find((subjectTag) => {
      return subjectTag?.title == selectedSubjectTag;
    });

    selectedSubjectTagId.includes(foundSubjectTag?.id) != true &&
      foundSubjectTag?.id != undefined &&
      setSelectedSubjectTagId((prevState) => [...prevState, foundSubjectTag?.id]);
  };

  const removeSelectedSubjectTag = (selectedSubjectTag) => {
    const foundSubjectTag = specialtyDataOption.find((subjectTag) => {
      return subjectTag?.title == selectedSubjectTag;
    });
    setSelectedSpecialityId(selectedSpecialityId.filter((id) => id != foundSubjectTag?.id));
  };

  return {
    handleFormSubmit,
    control,
    errors,
    formState,
    reset,
    touched,
    register,
    watch,
    setValue,
    specialtyDataOption,
    setSpecialtySearchText,
    setSpecialityArray,
    specialityArray,
    setSubjectTagsSearchText,
    setSubjectTagsArray,
    subjectTagsArray,
    subjectTagsDataOption,
    setUploadedFiles,
    uploadedFiles,
    setMembers,
    members,
    setPhotoSrc,
    photoSrc,
    profileUrlOnEdit,
    findSpecialityByName,
    removeSelectedSpeciality,
    setSupporters,
    supporters,
    findSubjectTagsByName,
    removeSelectedSubjectTag,
    defaultCountryValue,
    defaultStateValue,
  };
}
