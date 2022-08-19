import { DoctTextArea, DoctTextField } from '@doct-react/app';
import React, { useEffect } from 'react';
import UploadImage from '../../../../../../../../shared/ui/UploadImage/UploadImage';

function ManageSpeakers({
  register,
  control,
  errors,
  touched,
  setPhotoSrc,
  photoSrc,
  speakers,
  selectedRecord,
  reset,
}) {
  useEffect(() => {
    if (selectedRecord != null) {
      if (
        speakers[selectedRecord]?.keySpeakerProfileFile?.length > 0 ||
        speakers[selectedRecord]?.keySpeakerProfileFile
      ) {
        speakers[selectedRecord].keySpeakerProfileFile[0] != undefined
          ? setPhotoSrc(
              window.URL.createObjectURL(speakers[selectedRecord].keySpeakerProfileFile[0]),
            )
          : setPhotoSrc(window.URL.createObjectURL(speakers[selectedRecord].keySpeakerProfileFile));
      } else {
        setPhotoSrc(speakers[selectedRecord]?.keySpeakerProfileUrl);
      }

      const dT = new DataTransfer();
      if (
        speakers[selectedRecord]?.keySpeakerProfileFile?.length > 0 ||
        speakers[selectedRecord]?.keySpeakerProfileFile
      ) {
        speakers[selectedRecord].keySpeakerProfileFile[0] != undefined
          ? dT.items.add(speakers[selectedRecord].keySpeakerProfileFile[0])
          : dT.items.add(speakers[selectedRecord].keySpeakerProfileFile);
      }

      const resetObj = {
        ...speakers[selectedRecord],
      };

      if (speakers[selectedRecord]?.keySpeakerProfileUrl) {
        resetObj.keySpeakerProfileUrl = speakers[selectedRecord]?.keySpeakerProfileUrl;
      } else {
        resetObj.keySpeakerProfileFile = dT.files ? dT.files : null;
      }
      reset(resetObj);
    } else {
      reset({});
    }
  }, [speakers, selectedRecord]);

  return (
    <>
      <UploadImage
        register={register}
        id={`userProfilePhoto`}
        setPhotoSrc={setPhotoSrc}
        photoSrc={photoSrc}
        text="Add Photo"
        name="keySpeakerProfileFile"
      />
      <DoctTextField
        showStar={false}
        className="mt-2 mb-2"
        name="fullName"
        label="Full name"
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
        validationRules={{
          maxLength: {
            value: 1000,
            message: 'Max 1000 Characters',
          },
        }}
        defaultValue=""
      />
    </>
  );
}

export default ManageSpeakers;
