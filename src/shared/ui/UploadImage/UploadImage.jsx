import { DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import image from '../../../assets/icons/photo-upload.svg';
import Toaster from '../../../features/EventsDashboard/CreateEvent/Toaster';
import './UploadImage.scss';

function UploadImage({ user = { image: '' }, id, register, photoSrc, setPhotoSrc, text, name }) {
  const [toasterMessage, setToasterMessage] = useState(false);

  useEffect(() => {
    if (user.image) {
      setPhotoSrc(user.image);
    } else {
      setPhotoSrc(image);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToasterMessage(false);
    }, 2000);
  }, [toasterMessage]);

  if (user.image) {
    return (
      <div className="d-flex align-items-center mb-4 mt-2">
        <div className="profile_photo">
          <img src={photoSrc} alt="image" />
        </div>
        <label className="cursor-pointer ml-4" htmlFor={id}>
          <div className="mr-4">
            <input
              id={id}
              type="file"
              hidden
              name={name}
              ref={register}
              onChange={(e) => {
                setPhotoSrc(null);
                if (e.target.files[0]?.size >= 2097152) {
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
          <span className="doct-button d-flex align-items-center justify-content-center doct-medium-button doct-outlined-button">
            {text}
          </span>
        </label>
      </div>
    );
  }

  return (
    <>
      {toasterMessage && <Toaster text="Maximum allowed size is 2 MB" />}
      <label className="cursor-pointer  mb-4 mt-2 d-flex align-items-center">
        <div className="mr-4">
          <input
            id={id}
            type="file"
            hidden
            name={name}
            ref={register}
            onChange={(e) => {
              setPhotoSrc(null);
              if (e.target.files[0]?.size >= 2097152) {
                setToasterMessage(true);
                setPhotoSrc(image);
              } else {
                if (e.target.files?.length != 0) {
                  setPhotoSrc(URL.createObjectURL(e.target.files[0]));
                } else {
                  setPhotoSrc(image);
                }
              }
            }}
            onClick={(event) => {
              event.target.value = null;
            }}
            accept="image/*"
          />
          <div className="profile_photo">
            <img src={photoSrc} alt="Upload" />
          </div>
        </div>
        <div className="mt-5">
          <span className="doct-button d-flex align-items-center justify-content-center bg-info text-white doct-info-button doct-medium-button doct-contained-button">
            {text}
          </span>
          <DoctTypography variant="textLabel2" className="text-grey-600 justify-content-end d-flex">
            Upload JPEG, PNG file
            <br />
            up to 2 MB size
          </DoctTypography>
        </div>
      </label>
    </>
  );
}

export default UploadImage;
