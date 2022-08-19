import {
  DoctChip,
  DoctDatePicker,
  DoctFreeSoloSearchInput,
  DoctTextArea,
  DoctTextField,
} from '@doct-react/app';
import { DoctTypography, DoctButton, DoctRow, DoctCol, DoctIcon } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import '../../addNewMember.scss';

const ProfessionalInformation = ({
  control,
  errors,
  watch,
  // handleEducationSubmission,
  // handleSpecialitySubmission,
  qualificationDataOption,
  specialtyDataOption,
  setQualificationSearchText,
  setSpecialtySearchText,
  setWorkSpecialityArray,
  setEducationsArray,
  educationsArray,
  workSpecialityArray,
}) => {
  const [educationVal, setEducationVal] = useState(null);
  // const [educationsArray, setEducationsArray] = useState([]);
  const [specialityVal, setSpecialityVal] = useState(null);
  // const [workSpecialityArray, setWorkSpecialityArray] = useState([]);

  // useEffect(() => {
  //   handleEducationSubmission(educationsArray);
  // }, [educationsArray]);

  // const callSpecialitySubmission = () => {
  //   handleSpecialitySubmission(workSpecialityArray);
  // };

  const removeEducationChiphandler = (chip) => {
    setEducationsArray(educationsArray.filter((list) => list != chip));
    // handleEducationSubmission(educationsArray);
  };

  const removeWorkSpecialityChipHandler = (chip) => {
    setWorkSpecialityArray(workSpecialityArray.filter((list) => list != chip));
    // callSpecialitySubmission();
  };

  const handleEducationVal = () => {
    if (!educationVal) return;
    setEducationsArray((prevState) => [...prevState, educationVal]);
    setEducationVal('');
    // handleEducationSubmission(educationsArray);
  };

  const handleSpecialtyVal = () => {
    if (!specialityVal) return;
    setWorkSpecialityArray((prevState) => [...prevState, specialityVal]);
    setSpecialityVal('');
    // callSpecialitySubmission();
  };

  return (
    <div className="my-3">
      <DoctTypography
        variant="h6"
        className="professional_info_title_border p-3 font-weight-regular text-grey-600 bg-white"
      >
        Professional Information
      </DoctTypography>
      <div className="professional_info_contents bg-grey-100 py-5 d-flex align-items-center justify-content-center">
        <div className="form_container_body">
          <DoctTypography variant="subtitle2">Education</DoctTypography>

          <DoctRow>
            <DoctCol sm={10} className={`${educationsArray.length != 0 && 'my-2'}`}>
              <div className="w-100">
                <DoctFreeSoloSearchInput
                  placeholder="Qualifications"
                  onChangeHandler={(val) => {
                    setEducationVal(val);
                  }}
                  onInputChangeHandler={(val) => {
                    setQualificationSearchText(val);
                    setEducationVal(val);
                  }}
                  name="educationName"
                  hideSearchIcon={true}
                  options={qualificationDataOption}
                  value={educationVal}
                  inputValue={educationVal?.value}
                  onClearHandler={(e) => {
                    if (educationsArray) {
                      e.preventDefault();
                      setEducationVal([]);
                    }
                  }}
                />
              </div>
            </DoctCol>

            <DoctCol sm={2}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleEducationVal();
                }}
              >
                <DoctIcon className="cursor-pointer" name="success" width="40" fill="#00A0C0" />
              </div>
            </DoctCol>
          </DoctRow>
          {educationsArray.length != 0 && <div className="mt-1"></div>}
          <div className="mx-n1 d-flex flex-wrap">
            {educationsArray?.map((education, index) => (
              <span key={index} className="mx-1 mb-1">
                <DoctChip
                  title={education}
                  onCloseHandler={() => {
                    removeEducationChiphandler(education);
                  }}
                />
              </span>
            ))}
          </div>

          <DoctTypography variant="subtitle2">Work Specialty</DoctTypography>

          <DoctRow>
            <DoctCol sm={10} className={`${workSpecialityArray.length != 0 && 'my-2'}`}>
              <div className="w-100">
                <DoctFreeSoloSearchInput
                  placeholder="Work Specialty"
                  onChangeHandler={(val) => {
                    setSpecialityVal(val);
                  }}
                  onInputChangeHandler={(val) => {
                    setSpecialtySearchText(val);
                    setSpecialityVal(val);
                  }}
                  name="specialtyName"
                  hideSearchIcon={true}
                  value={specialityVal}
                  options={specialtyDataOption}
                  inputValue={specialityVal?.value}
                  onClearHandler={(e) => {
                    if (workSpecialityArray) {
                      e.preventDefault();
                      setSpecialityVal([]);
                    }
                  }}
                />
              </div>
            </DoctCol>

            <DoctCol sm={2}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleSpecialtyVal();
                }}
              >
                <DoctIcon className="cursor-pointer" name="success" width="40" fill="#00A0C0" />
              </div>
            </DoctCol>
          </DoctRow>

          {workSpecialityArray.length != 0 && <div className="mt-1"></div>}
          <div className="mx-n1 d-flex flex-wrap">
            {workSpecialityArray?.map((workSpeciality, index) => (
              <span key={index} className="mx-1 mb-1">
                <DoctChip
                  title={workSpeciality}
                  onCloseHandler={() => {
                    removeWorkSpecialityChipHandler(workSpeciality);
                  }}
                />
              </span>
            ))}
          </div>

          <DoctTypography variant="subtitle2">Practicing License Number</DoctTypography>

          <DoctRow>
            <DoctCol sm={6}>
              <DoctTextField
                label="Practicing License Number"
                control={control}
                isErrors={errors}
                id="practingLicenseNumber"
                name="practingLicenseNumber"
                validationRules={{}}
              />
            </DoctCol>
          </DoctRow>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInformation;
