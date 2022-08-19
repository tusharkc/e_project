import React, { useEffect, useState } from 'react';
import imageSquare from '../../../assets/images/Create Events Form/USER PROFILE.svg';
import Toaster from '../../../features/EventsDashboard/CreateEvent/Toaster';
import './Uploadsquareimg.scss';

function UploadImage({ user = { image: '' }, id, register, photoSrc, setPhotoSrc, text, name }) {
  const [toasterMessage, setToasterMessage] = useState(false);

  useEffect(() => {
    if (user.image) {
      setPhotoSrc(user.image);
    } else {
      setPhotoSrc(imageSquare);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToasterMessage(false);
    }, 2000);
  }, [toasterMessage]);
  if (user.image) {
    return (
      <div className="mb-4 mt-2">
        <div className="profile_photo_square">
          <img src={photoSrc} alt="image" />
        </div>
        <label className="cursor-pointer ml-4" htmlFor={id}>
          <div>
            <input
              id={id}
              type="file"
              hidden
              name={name}
              ref={register}
              onChange={(e) => {
                setPhotoSrc(null);
                if (e.target.files[0].size >= 2097152) {
                  setToasterMessage(true);
                } else {
                  if (e.target?.files?.length != 0) {
                    setPhotoSrc(URL.createObjectURL(e.target.files[0]));
                  } else {
                    setPhotoSrc(imageSquare);
                  }
                }
              }}
              onClick={(event) => {
                event.target.value = null;
              }}
              accept="image/*"
            />
          </div>
          <div className="upload_btn doct-button doct-medium-button align-items-center justify-content-center bg-info text-white text-center px-2 py-2 mt-3">
            {text}
          </div>
        </label>
      </div>
    );
  }

  return (
    <>
      {toasterMessage && <Toaster text="Maximum allowed size is 2 MB" />}
      <label className="cursor-pointer  mb-4">
        <div>
          <input
            id={id}
            type="file"
            hidden
            name={name}
            ref={register}
            onChange={(e) => {
              setPhotoSrc(null);
              if (e.target?.files[0]?.size >= 2097152) {
                setToasterMessage(true);
                setPhotoSrc(imageSquare);
              } else {
                if (e.target?.files?.length != 0) {
                  setPhotoSrc(URL.createObjectURL(e.target.files[0]));
                } else {
                  setPhotoSrc(imageSquare);
                }
              }
            }}
            onClick={(event) => {
              event.target.value = null;
            }}
            accept="image/*"
          />
          <div className="profile_photo_square">
            <img src={photoSrc} alt="Upload" />
          </div>
        </div>
        <div className="upload_btn doct-button doct-medium-button mt-3 align-items-center justify-content-center bg-info text-white text-center px-2 py-2">
          {text}
        </div>
      </label>
    </>
  );
}

export default UploadImage;
