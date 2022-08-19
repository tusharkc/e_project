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
  specialtyDataOption,
  qualificationDataOption,
  setQualificationSearchText,
  setSpecialtySearchText,
  setWorkSpecialityArray,
  setEducationsArray,
  educationsArray,
  workSpecialityArray,
}) => {
  const [educationVal, setEducationVal] = useState(null);
  const [specialityVal, setSpecialityVal] = useState(null);

  const removeEducationChiphandler = (chip) => {
    setEducationsArray(educationsArray.filter((list) => list != chip));
  };

  const removeWorkSpecialityChipHandler = (chip) => {
    setWorkSpecialityArray(workSpecialityArray.filter((list) => list != chip));
  };

  const handleEducationVal = () => {
    if (!educationVal) return;
    setEducationsArray((prevState) => [...prevState, educationVal]);
    setEducationVal('');
  };

  const handleSpecialtyVal = () => {
    if (!specialityVal) return;
    setWorkSpecialityArray((prevState) => [...prevState, specialityVal]);
    setSpecialityVal('');
  };

  return (
    <div className="my-2">
      <DoctTypography
        variant="h6"
        className="professional_info_title_border p-3 text-grey-500 bg-white"
      >
        Professional Information
      </DoctTypography>
      <div className="professional_info_contents bg-grey-100 d-flex align-items-center justify-content-center">
        <div className="form_container_body mt-3">
          <DoctTypography variant="subtitle2">Education</DoctTypography>

          <DoctRow>
            <DoctCol sm={10} className={`${educationsArray?.length != 0 && 'my-2'}`}>
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

          {educationsArray?.length != 0 && <div className="mt-1"></div>}
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

          <DoctTypography variant="subtitle2">Work Speciality</DoctTypography>

          <DoctRow>
            <DoctCol sm={10} className={`${workSpecialityArray?.length != 0 && 'my-2'}`}>
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

          {workSpecialityArray?.length != 0 && <div className="mt-1"></div>}
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
