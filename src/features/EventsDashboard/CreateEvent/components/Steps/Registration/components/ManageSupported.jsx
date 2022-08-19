import { DoctTextField } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React, { useEffect } from 'react';
import UploadImage from '../../../../../../../shared/ui/UploadImage/UploadImageSquare';

function ManageSupported({
  register,
  setPhotoSrc,
  photoSrc,
  control,
  touched,
  errors,
  selectedRecord,
  supporters,
  reset,
}) {
  useEffect(() => {
    if (selectedRecord != null) {
      if (
        supporters[selectedRecord]?.SupportedByPictureFile?.length > 0 ||
        supporters[selectedRecord]?.SupportedByPictureFile
      ) {
        supporters[selectedRecord]?.SupportedByPictureFile[0] != undefined
          ? setPhotoSrc(
              window.URL.createObjectURL(supporters[selectedRecord].SupportedByPictureFile[0]),
            )
          : setPhotoSrc(
              window.URL.createObjectURL(supporters[selectedRecord].SupportedByPictureFile),
            );
      } else {
        setPhotoSrc(supporters[selectedRecord]?.supportedByPictureUrl);
      }

      var dT = new DataTransfer();
      if (
        supporters[selectedRecord]?.SupportedByPictureFile?.length > 0 ||
        supporters[selectedRecord]?.SupportedByPictureFile
      ) {
        supporters[selectedRecord]?.SupportedByPictureFile[0] != undefined
          ? dT.items.add(supporters[selectedRecord].SupportedByPictureFile[0])
          : dT.items.add(supporters[selectedRecord].SupportedByPictureFile);
      }

      const resetObj = {
        ...supporters[selectedRecord],
      };

      if (supporters[selectedRecord]?.supportedByPictureUrl) {
        resetObj.supportedByPictureUrl = supporters[selectedRecord]?.supportedByPictureUrl;
      } else {
        resetObj.SupportedByPictureFile = dT.files ? dT.files : null;
      }
      reset(resetObj);
    } else {
      reset({});
    }
  }, [supporters, selectedRecord]);
  return (
    <>
      <UploadImage
        register={register}
        id={`userProfilePhoto`}
        setPhotoSrc={setPhotoSrc}
        photoSrc={photoSrc}
        text="Add Logo/Image"
        name="SupportedByPictureFile"
      />
      <DoctTypography variant="textLabel2" className="text-grey-600 text-center">
        Upload JPEG, PNG file up to 2 MB size
      </DoctTypography>
      <DoctTextField
        showStar={false}
        className="mt-2 mb-2"
        name="supportedByName"
        label="Supporter Name"
        id="supportedByName"
        control={control}
        isErrors={errors}
        defaultValue=""
        validationRules={{
          required: "It's Required Field",
        }}
        touched={touched}
      />
    </>
  );
}

export default ManageSupported;
