import { DoctChip, DoctFreeSoloSearchInput, DoctTextField } from '@doct-react/app';
import { DoctButton, DoctCol, DoctIcon, DoctRow, DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { FormHeading } from '../../../UiHelper';
import CoverImg from '../../../../../../../assets/images/Create Events Form/Registration/cover_img_section.svg';
import { TextEditor } from '../../../../../../../shared';
import '../../Registration/RegistrationStyle.scss';
import Toaster from '../../../../Toaster';

function RegistrationSection({
  control,
  errors,
  touched,
  register,
  setSpecialtySearchText,
  setSpecialityArray,
  specialityArray,
  specialtyDataOption,
  setSubjectTagsSearchText,
  setSubjectTagsArray,
  subjectTagsArray,
  subjectTagsDataOption,
  photoSrc,
  setPhotoSrc,
  profileUrlOnEdit,
  findSpecialityByName,
  removeSelectedSpeciality,
  removeSelectedSubjectTag,
  findSubjectTagsByName,
}) {
  const [specialityVal, setSpecialityVal] = useState(null);

  useEffect(() => {
    if (profileUrlOnEdit != null) {
      setPhotoSrc(profileUrlOnEdit);
    }
  }, [profileUrlOnEdit]);

  const removeSpecialityChipHandler = (chip) => {
    setSpecialityArray(specialityArray.filter((list) => list != chip));
  };

  const handleSpecialtyVal = () => {
    if (!specialityVal) return;
    setSpecialityArray((prevState) => [...prevState, specialityVal]);
    setSpecialityVal('');
  };

  const [subjectTagsVal, setSubjectTagsVal] = useState(null);

  const removeSubjectTagsChipHandler = (chip) => {
    setSubjectTagsArray(subjectTagsArray.filter((list) => list != chip));
  };

  const handleSubjectTagsVal = () => {
    if (!subjectTagsVal) return;
    setSubjectTagsArray((prevState) => [...prevState, subjectTagsVal]);
    setSubjectTagsVal('');
  };

  const [toasterMessage, setToasterMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setToasterMessage(false);
    }, 2000);
  }, [toasterMessage]);

  const removeImage = () => {
    setPhotoSrc();
  };

  return (
    <>
      <DoctRow>
        <DoctCol sm={10}>
          <FormHeading>Event Title</FormHeading>
          <DoctTextField
            showStar={false}
            name="name"
            label="Event Title"
            id="name"
            control={control}
            isErrors={errors}
            defaultValue=""
            validationRules={{
              required: "It's Required Field",
            }}
            touched={touched}
          />
          <DoctTypography variant="subtitle2" className="mt-4 text-grey-800">
            Specialty
          </DoctTypography>
          <DoctTypography variant="subtitle2" className="text-grey-600 font-weight-regular">
            You can select multiple specialties.
          </DoctTypography>
          <div className="d-flex">
            <div className="specialty_section">
              <DoctFreeSoloSearchInput
                placeholder="Select specialty"
                onChangeHandler={(val) => {
                  setSpecialityVal(val);
                  findSpecialityByName(val);
                }}
                onInputChangeHandler={(val) => {
                  setSpecialtySearchText(val);
                }}
                name="specialtyName"
                hideSearchIcon={true}
                value={specialityVal}
                options={specialtyDataOption}
                inputValue={specialityVal?.value}
                validationRules={{
                  required: "It's Required Field",
                }}
                onClearHandler={(e) => {
                  if (specialityArray) {
                    e.preventDefault();
                    setSpecialityVal();
                  }
                }}
              />
            </div>
            <div
              className="px-2"
              onClick={(e) => {
                e.preventDefault();
                handleSpecialtyVal();
              }}
            >
              <DoctIcon className="cursor-pointer" name="success" width="40" fill="#00A0C0" />
            </div>
          </div>
          {specialityArray.length != 0 && <div className="mt-1"></div>}
          <div className="mx-n1 d-flex flex-wrap">
            {specialityArray?.map((speciality, index) => (
              <span key={index} className="mx-1 mb-1 mt-1">
                <DoctChip
                  title={speciality}
                  onCloseHandler={() => {
                    removeSpecialityChipHandler(speciality);
                    removeSelectedSpeciality(speciality);
                  }}
                />
              </span>
            ))}
          </div>
          <DoctTypography variant="subtitle2" fontWeight="medium" className="text-grey-800">
            Cover Image
          </DoctTypography>
          <div className="cover_image_section border-radius text-center">
            <img src={CoverImg} alt="cover_image" className="mt-4" />
            <DoctTypography variant="body2" className="text-grey-800">
              Upload 1600 x 900 px image for best fit.
            </DoctTypography>
            <div className=" justify-content-center align-items-center">
              <div className="cover_image_size upload_img_container">
                {photoSrc && <img src={photoSrc} alt="Upload" />}
                {toasterMessage && <Toaster text="Maximum allowed size is 5 MB" />}
                <label className="cursor-pointer">
                  <button
                    className="edit_button doct-button doct-medium-button align-items-center justify-content-center bg-white text-grey-600 px-2 py-2 position-absolute"
                    onClick={(e) => {
                      e.preventDefault();
                      removeImage();
                    }}
                  >
                    Remove/Change
                  </button>
                </label>
              </div>
              <label className="cursor-pointer">
                <div className="mr-4">
                  <input
                    type="file"
                    hidden
                    name="imageProfile"
                    ref={register}
                    onChange={(e) => {
                      e.preventDefault();
                      if (e.target.files[0].size >= 5242880) {
                        setToasterMessage(true);
                      } else {
                        setPhotoSrc(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                    onClick={(event) => {
                      event.target.value = null;
                    }}
                    accept="image/*"
                  />
                </div>
                <div className="upload_img_btn doct-button doct-medium-button align-items-center justify-content-center bg-info text-white px-2 py-2">
                  Upload Cover
                </div>
              </label>
              <DoctTypography variant="body3" className="text-grey-600">
                JPEG, BMP, TIFF, PNG upto 5 MB size
              </DoctTypography>
            </div>
          </div>
          <DoctTypography variant="body3" fontWeight="regular" className="text-grey-600">
            If you do not have cover image, Docthub will use default cover.
          </DoctTypography>
        </DoctCol>
      </DoctRow>
      <DoctRow>
        <DoctCol sm={10} className="my-2">
          <FormHeading>Overview</FormHeading>
          <span className="text_overview_description">
            <TextEditor
              name="description"
              control={control}
              placeholder="Write welcome message, event highlights, invitation to related people."
            />
          </span>
          <DoctTypography variant="subtitle2" className="text-grey-800 mt-4">
            Subject Tags (optional)
          </DoctTypography>
          <DoctTypography variant="subtitle2" className="text-grey-600 font-weight-regular">
            Add multiple keywords/tags relevant to this event to improve SEO.
          </DoctTypography>
          <div className="d-flex">
            <div className="specialty_section">
              <DoctFreeSoloSearchInput
                placeholder="Enter keyword"
                onChangeHandler={(val) => {
                  setSubjectTagsVal(val);
                  findSubjectTagsByName(val);
                }}
                onInputChangeHandler={(val) => {
                  setSubjectTagsSearchText(val);
                }}
                name="subjectTagsNames"
                hideSearchIcon={true}
                value={subjectTagsVal}
                options={subjectTagsDataOption}
                inputValue={subjectTagsVal?.value}
                onClearHandler={(e) => {
                  if (subjectTagsArray) {
                    e.preventDefault();
                    setSubjectTagsVal([]);
                  }
                }}
              />
            </div>
            <div
              className="px-2"
              onClick={(e) => {
                e.preventDefault();
                handleSubjectTagsVal();
              }}
            >
              <DoctIcon className="cursor-pointer" name="success" width="40" fill="#00A0C0" />
            </div>
          </div>
        </DoctCol>
      </DoctRow>
      {subjectTagsArray.length != 0 && <div className="mt-1"></div>}
      <div className="mx-n1 d-flex flex-wrap">
        {subjectTagsArray?.map((subjectTags, index) => (
          <span key={index} className="mx-1 mb-1">
            <DoctChip
              title={subjectTags}
              onCloseHandler={() => {
                removeSubjectTagsChipHandler(subjectTags);
                removeSelectedSubjectTag(subjectTags);
              }}
            />
          </span>
        ))}
      </div>
    </>
  );
}

export default RegistrationSection;
