import {
  DoctAutoComplete,
  DoctDatePicker,
  DoctDropdownSelect,
  DoctTextArea,
  DoctTextField,
  DoctDatePickerV2,
} from '@doct-react/app';
import { DoctTypography, DoctButton } from '@doct-react/core';
import React, { useRef, useState } from 'react';
import uploadProfileImg from '../../../../../assets/images/photo-upload.svg';
import '../../addNewMember.scss';
const BasicInformation = ({ control, errors, register }) => {
  const [userImgSrc, setUserImgSrc] = useState(uploadProfileImg);

  const uploadFiles = () => {
    document.getElementById('selectField').click();
  };
  return (
    <div className="my-2">
      <DoctTypography
        variant="h6"
        className="basic_info_title_border font-weight-regular text-grey-600 p-3 bg-white"
      >
        Basic Information
      </DoctTypography>
      <div className="bg-grey-100 basic_info_contents py-5 d-flex align-items-center justify-content-center">
        <div className="form_container_body">
          <div className="cursor-pointer d-flex align-items-center">
            <img src={userImgSrc} className="user_profiile_img" alt="user-profile-image" />

            <div className="mx-3">
              <div className="mx-3">
                {userImgSrc != uploadProfileImg ? (
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      setUserImgSrc(uploadProfileImg);
                    }}
                  >
                    <DoctButton text="Remove" variant="outlined" size="medium" />
                  </span>
                ) : (
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      uploadFiles();
                    }}
                  >
                    <DoctButton text="Edit" variant="outlined" size="medium" />
                  </span>
                )}
              </div>

              {/* <DoctButton
                text="Edit"
                variant="outlined"
                size="medium"
                onButtonClickHandler={() => {
                  uploadFiles();
                }}
              /> */}
            </div>

            <input
              type="file"
              id="selectField"
              ref={register}
              name="profileFile"
              accept="image/*"
              hidden
              onChange={(e) => {
                setUserImgSrc(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>

          <div className="py-2">
            <DoctTypography variant="subtitle2">Full Name *</DoctTypography>
            <DoctTextField
              label="Full Name"
              control={control}
              showStar={false}
              id="fullName"
              name="fullName"
              isErrors={errors}
              validationRules={{ required: "It's Required Field" }}
            />
          </div>

          <div className="py-2 d-flex align-items-center justify-content-between">
            <div className="w-50">
              <DoctTypography variant="subtitle2">Birth Date</DoctTypography>
              <DoctDatePickerV2
                inputProps={{
                  label: 'Birth Date',
                  id: 'birthDate',
                  dateFormat: 'dd MMM yyyy',
                  autoComplete: 'off',
                }}
                control={control}
                isErrors={errors}
                showStar={false}
                name="birthDate"
                autocomplete="off"
              />
            </div>

            <div className="w-50 pl-3">
              <DoctTypography variant="subtitle2">Gender *</DoctTypography>
              <DoctAutoComplete
                label="Select"
                isErrors={errors}
                id="gender"
                name="gender"
                variant="standard"
                control={control}
                validationRules={{ required: "It's Required Field" }}
                options={[{ label: 'Male' }, { label: 'Female' }]}
              />
            </div>
          </div>

          <DoctTypography variant="subtitle2">Professional Title *</DoctTypography>
          <div className="py-2">
            <DoctTextField
              label="Professional Title"
              showStar={false}
              control={control}
              id="professionalTitle"
              name="professionalTitle"
              isErrors={errors}
              validationRules={{ required: "It's Required Field" }}
            />
          </div>

          <DoctTypography variant="subtitle2">Bio</DoctTypography>

          <div className="py-2">
            <DoctTextArea
              label="Bio"
              showStar={false}
              control={control}
              id="bio"
              name="bio"
              isErrors={errors}
              validationRules={{}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
