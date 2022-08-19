import { DoctTextField } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React, { useEffect } from 'react';
import UploadImage from '../../../../../../../../shared/ui/UploadImage/UploadImageSquare';

function ManageSponsors({
  register,
  setPhotoSrc,
  photoSrc,
  control,
  touched,
  errors,
  sponsors,
  selectedRecord,
  reset,
}) {
  useEffect(() => {
    if (selectedRecord != null) {
      if (
        sponsors[selectedRecord]?.sponsorPictureFile?.length > 0 ||
        sponsors[selectedRecord]?.sponsorPictureFile
      ) {
        sponsors[selectedRecord].sponsorPictureFile[0] != undefined
          ? setPhotoSrc(window.URL.createObjectURL(sponsors[selectedRecord].sponsorPictureFile[0]))
          : setPhotoSrc(window.URL.createObjectURL(sponsors[selectedRecord].sponsorPictureFile));
      } else {
        setPhotoSrc(sponsors[selectedRecord]?.sponsorPictureUrl);
      }

      const dT = new DataTransfer();

      if (
        sponsors[selectedRecord]?.sponsorPictureFile?.length > 0 ||
        sponsors[selectedRecord]?.sponsorPictureFile
      ) {
        sponsors[selectedRecord]?.sponsorPictureFile[0] != undefined
          ? dT.items.add(sponsors[selectedRecord]?.sponsorPictureFile[0])
          : dT.items.add(sponsors[selectedRecord]?.sponsorPictureFile);
      }

      const resetObj = {
        ...sponsors[selectedRecord],
      };

      if (sponsors[selectedRecord]?.sponsorPictureUrl) {
        resetObj.sponsorPictureUrl = sponsors[selectedRecord]?.sponsorPictureUrl;
      } else {
        resetObj.sponsorPictureFile = dT.files ? dT.files : null;
      }
      reset(resetObj);
    } else {
      reset({});
    }
  }, [sponsors, selectedRecord]);

  return (
    <>
      <UploadImage
        register={register}
        id={`userProfilePhoto`}
        setPhotoSrc={setPhotoSrc}
        photoSrc={photoSrc}
        text="Add Logo/Image"
        name={'sponsorPictureFile'}
      />
      <DoctTypography variant="textLabel2" className="text-grey-600 text-center">
        Upload JPEG, PNG file up to 2 MB size
      </DoctTypography>
      <DoctTextField
        showStar={false}
        className="mt-2 mb-2"
        name="sponsorName"
        label="Sponsor Name"
        id="sponsorName"
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

export default ManageSponsors;
