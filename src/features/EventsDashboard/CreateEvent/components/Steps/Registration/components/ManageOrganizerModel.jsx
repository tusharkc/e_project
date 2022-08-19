import { DoctForm, DoctTextArea, DoctTextField } from '@doct-react/app';
import React, { useEffect } from 'react';
import UploadImage from '../../../../../../../shared/ui/UploadImage/UploadImage';

function ManageOrganizerModel({
  control,
  errors,
  touched,
  register,
  setPhotoSrc,
  photoSrc,
  members,
  selectedRecord,
  reset,
}) {
  useEffect(() => {
    if (selectedRecord != null) {
      if (
        members[selectedRecord]?.pictureFile?.length > 0 ||
        members[selectedRecord]?.pictureFile
      ) {
        members[selectedRecord]?.pictureFile[0] != undefined
          ? setPhotoSrc(window.URL.createObjectURL(members[selectedRecord].pictureFile[0]))
          : setPhotoSrc(window.URL.createObjectURL(members[selectedRecord].pictureFile));
      } else {
        setPhotoSrc(members[selectedRecord]?.pictureUrl);
      }

      const dT = new DataTransfer();
      if (
        members[selectedRecord]?.pictureFile?.length > 0 ||
        members[selectedRecord]?.pictureFile
      ) {
        members[selectedRecord].pictureFile[0] != undefined
          ? dT.items.add(members[selectedRecord].pictureFile[0])
          : dT.items.add(members[selectedRecord].pictureFile);
      }

      const resetObj = {
        ...members[selectedRecord],
      };

      if (members[selectedRecord]?.pictureUrl) {
        resetObj.pictureUrl = members[selectedRecord]?.pictureUrl;
      } else {
        resetObj.pictureFile = dT.files ? dT.files : null;
      }
      reset(resetObj);
    } else {
      reset({});
    }
  }, [members, selectedRecord]);

  return (
    <>
      <UploadImage
        register={register}
        id={`userProfilePhoto`}
        setPhotoSrc={setPhotoSrc}
        photoSrc={photoSrc}
        text="Add Photo"
        name="pictureFile"
      />
      <DoctTextField
        showStar={false}
        className="mt-2 mb-2"
        name="fullName"
        label="Full Name"
        id="fullName"
        control={control}
        isErrors={errors}
        defaultValue=""
        validationRules={{
          required: "It's Required Field",
        }}
        touched={touched}
      />
      <DoctTextArea
        name="professionalTitle"
        label="Professional Title"
        id="professionalTitle"
        showStar={false}
        control={control}
        isErrors={errors}
        defaultValue=""
        validationRules={{
          maxLength: {
            value: 1000,
            message: 'Max 1000 Characters',
          },
        }}
      />
    </>
  );
}

export default ManageOrganizerModel;
