import { DoctForm, DoctModal } from '@doct-react/app';
import { DoctButton, DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import scheduleImg from '../../../../../../../../assets/images/Create Events Form/schedule_speaker/schedule img.svg';
import ManageSpeakers from './ManageSpeakers';
import image from '../../../../../../../../assets/icons/photo-upload.svg';
import {
  saveSpeakersDetails,
  selectCreateEventResponse,
  selectScheduleAndSpeakersDetails,
  selectSpeakerDetails,
} from '../../../../../createEvent.slice';
import { useDispatch, useSelector } from 'react-redux';
import SpeakerPresenterCard from './SpeakerPresenterCard';
import { imageHandler } from '../../../../../../../../helper/helperFunction';
import { useParams } from 'react-router-dom';

function Speakers({ setSpeakers, speakers }) {
  const dispatch = useDispatch();
  const speakerDetails = useSelector(selectSpeakerDetails);
  const speakersAndSchedule = useSelector(selectScheduleAndSpeakersDetails);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoSrc, setPhotoSrc] = useState(image);
  const [selectedRecords, setSelectedRecords] = useState(null);
  const [editingData, setEditingData] = useState(false);

  const manageActionHandler = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    const keySpeakers = [...speakers];

    if (Object.keys(apiResponseData).length) {
      if (id == undefined) return;
      apiResponseData?.keySpeakers?.map((item) => {
        if (keySpeakers.includes(item) != true) {
          keySpeakers.push(item);
        }
      });
    }

    setSpeakers(keySpeakers);
  }, [Object.keys(apiResponseData).length]);

  useEffect(() => {
    const keySpeakers = [...speakers];
    if (Object.keys(speakerDetails).length >= 1) {
      keySpeakers.push(speakerDetails);
    }

    if (speakersAndSchedule?.KeySpeakers?.length >= 1) {
      speakersAndSchedule?.KeySpeakers?.map((item) => {
        if (keySpeakers.includes(item) != true) {
          keySpeakers.push(item);
        }
      });
    }

    setSpeakers(keySpeakers);
  }, [speakerDetails, speakersAndSchedule]);

  const { handleSubmit, control, touched, errors, watch, register, reset } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const deleteRecordHandler = (index) => {
    let newArray = [...speakers];
    newArray.splice(index, 1);
    setSpeakers(newArray);
  };

  const handleModalSubmit = handleSubmit((values) => {
    if (editingData) {
      speakers[selectedRecords] = { ...speakers[selectedRecords], ...values };
      if (speakers[selectedRecords]?.keySpeakerProfileFile?.length) {
        delete speakers[selectedRecords].keySpeakerProfileUrl;
      }
      setSelectedRecords(null);
      manageActionHandler();
      setEditingData(false);
    } else {
      dispatch(saveSpeakersDetails(values));
      setSelectedRecords(null);
      manageActionHandler();
      setEditingData(false);
    }
  });

  return (
    <>
      {speakers.length ? (
        <DoctRow className="mb-5">
          <DoctCol sm={12}>
            <div className="speaker_presenter_section_second bg-grey-100 border-radius mt-3">
              <DoctTypography variant="h6" className="text-grey-800 px-3 pt-3 mb-3">
                Speakers/ Presenters
              </DoctTypography>
              <DoctTypography variant="textLabel2" className="text-grey-400 px-3 mt-sm-n3">
                {speakers.length} speakers
              </DoctTypography>
              <DoctButton
                type="primary"
                variant="text"
                icon="plus"
                text="Add Speaker"
                className="mt-n3 mx-sm-n2 background_transparent"
                onButtonClickHandler={(e) => {
                  setSelectedRecords(null);
                  manageActionHandler();
                  e.preventDefault();
                }}
              />

              <DoctRow>
                {speakers.map((item, index) => {
                  return (
                    <DoctCol xs={3} key={index} className="py-2 ml-4">
                      <SpeakerPresenterCard
                        image={imageHandler(
                          item?.keySpeakerProfileUrl || item.keySpeakerProfileFile,
                        )}
                        name={item.fullName}
                        professionalTitle={item.professionalTitle}
                        setIsModalOpen={setIsModalOpen}
                        additionalFun={() => {
                          setSelectedRecords(index);
                          setEditingData(true);
                        }}
                        deleteRecordHandler={deleteRecordHandler}
                        index={index}
                      />
                    </DoctCol>
                  );
                })}
              </DoctRow>

              <DoctTypography variant="body3" className="text-grey-400 px-3">
                This will be listed on Docthub event detail page in “Key Speakers” section.
              </DoctTypography>
            </div>
          </DoctCol>
        </DoctRow>
      ) : (
        <div className="speaker_schedule_section bg-grey-100 mt-3 border-radius mx-auto px-4 py-3 mb-5">
          <DoctTypography variant="h6" className="text-grey-800 speaker_presenter_text">
            Speakers/ Presenters
          </DoctTypography>
          <DoctTypography variant="textLabel1" className="text-grey-400 mt-1 no_speaker_text">
            No speakers
          </DoctTypography>
          <div className="d-flex text-center justify-content-center align-items-center">
            <div>
              <img src={scheduleImg} alt="schedule-speaker-image" />
              <div>
                <DoctTypography variant="body2" className="mt-1 text-grey-600">
                  Add key speaker/ presenter/ chair person for this event.
                </DoctTypography>
              </div>
              <div className="d-flex text-center justify-content-center align-items-center">
                <DoctButton
                  variant="contained"
                  icon="plus"
                  text="Add Speaker"
                  className="doct_btn_set_catrgories mb-3"
                  onButtonClickHandler={(e) => {
                    setSelectedRecords(null);
                    manageActionHandler();
                    e.preventDefault();
                  }}
                />
              </div>
              <DoctTypography variant="body3" fontWeight="regular" className="mt-1 text-grey-400">
                This will be listed on Docthub event detail page in “Key Speakers” section.
              </DoctTypography>
            </div>
          </div>
        </div>
      )}
      <DoctModal
        iconName={''}
        primaryBtnText={'Save'}
        open={isModalOpen}
        className={'disable_modal_outside_click'}
        handlePrimaryButtonClick={handleModalSubmit}
        handleClose={() => {
          setSelectedRecords(null);
          manageActionHandler();
          setEditingData(false);
        }}
        title={editingData ? 'Edit Speakers' : 'Add Speakers'}
        width={360}
      >
        <ManageSpeakers
          touched={touched}
          setPhotoSrc={setPhotoSrc}
          photoSrc={photoSrc}
          register={register}
          handleModalSubmit={handleModalSubmit}
          control={control}
          errors={errors}
          speakers={speakers}
          selectedRecord={selectedRecords}
          reset={reset}
        />
      </DoctModal>
    </>
  );
}

export default Speakers;
