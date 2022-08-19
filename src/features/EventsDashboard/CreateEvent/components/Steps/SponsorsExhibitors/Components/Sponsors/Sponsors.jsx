import { DoctForm, DoctModal } from '@doct-react/app';
import { DoctButton, DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import image from '../../../../../../../../assets/icons/photo-upload.svg';
import sponsoredImg from '../../../../../../../../assets/images/Create Events Form/sponsored_exhibitors/sponsor_img.svg';
import { imageHandler } from '../../../../../../../../helper/helperFunction';
import {
  fetchEventById,
  saveSponsorsDetails,
  selectCreateEventResponse,
  selectSponsorsAndExhibitorsDetails,
  selectSponsorsDetails,
} from '../../../../../createEvent.slice';
import ManageSponsors from './ManageSponsors';
import SponsorCard from './SponsorCard';

function Sponsors({ setSponsors, sponsors }) {
  const dispatch = useDispatch();
  const sponsorDetails = useSelector(selectSponsorsDetails);
  const sponsorAndExhibitors = useSelector(selectSponsorsAndExhibitorsDetails);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const { id } = useParams();

  useEffect(() => {
    if (id == undefined) return;
    dispatch(fetchEventById(id));
  }, [id]);

  const [photoSrc, setPhotoSrc] = useState(image);
  const [selectedRecords, setSelectedRecords] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(false);
  const manageActionHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const spons = [...sponsors];

    if (Object.keys(apiResponseData).length) {
      if (id == undefined) return;
      apiResponseData?.sponsors?.map((item) => {
        if (spons.includes(item) != true) {
          spons.push(item);
        }
      });
    }

    setSponsors(spons);
  }, [Object.keys(apiResponseData).length]);

  useEffect(() => {
    const spons = [...sponsors];
    if (Object.keys(sponsorDetails).length >= 1) {
      spons.push(sponsorDetails);
    }

    if (sponsorAndExhibitors?.Sponsors?.length >= 1) {
      sponsorAndExhibitors.Sponsors.map((item) => {
        if (spons.includes(item) != true) {
          spons.push(item);
        }
      });
    }

    setSponsors(spons);
  }, [sponsorDetails, sponsorAndExhibitors]);

  const { handleSubmit, control, touched, errors, watch, register, reset } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const deleteRecordHandler = (index) => {
    let newArray = [...sponsors];
    newArray.splice(index, 1);
    setSponsors(newArray);
  };

  const handleModalSubmit = handleSubmit((values) => {
    if (editingData) {
      sponsors[selectedRecords] = { ...sponsors[selectedRecords], ...values };
      if (sponsors[selectedRecords]?.sponsorPictureFile?.length) {
        delete sponsors[selectedRecords].sponsorPictureUrl;
      }
      setSelectedRecords(null);
      manageActionHandler();
      setEditingData(false);
    } else {
      dispatch(saveSponsorsDetails(values));
      setSelectedRecords(null);
      manageActionHandler();
      setEditingData(false);
    }
  });

  return (
    <div>
      {sponsors.length ? (
        <DoctRow>
          <DoctCol sm={12}>
            <div className="sponsors_section bg-grey-100 mt-3 border-radius mx-auto px-4 py-3">
              <DoctTypography variant="h6" className="text-grey-800">
                Sponsors
              </DoctTypography>
              <DoctTypography variant="textLabel1" className="text-grey-400 mt-1">
                {sponsors.length ? `${sponsors.length} Sponsors` : 'Not added yet'}
              </DoctTypography>
              <DoctButton
                type="primary"
                variant="text"
                icon="plus"
                text="Add Sponsor"
                className="mx-sm-n4 mt-2 background_transparent"
                onButtonClickHandler={(e) => {
                  setSelectedRecords(null);
                  manageActionHandler();
                  e.preventDefault();
                }}
              />
              <DoctRow>
                {sponsors.map((item, index) => {
                  return (
                    <div key={index} className="d-flex col-4">
                      <SponsorCard
                        image={imageHandler(item?.sponsorPictureUrl || item.sponsorPictureFile)}
                        name={item.sponsorName}
                        setIsModalOpen={setIsModalOpen}
                        additionalFun={() => {
                          setSelectedRecords(index);
                          setEditingData(true);
                        }}
                        deleteRecordHandler={deleteRecordHandler}
                        index={index}
                      />
                    </div>
                  );
                })}
              </DoctRow>
            </div>
          </DoctCol>
        </DoctRow>
      ) : (
        <div className="sponsors_section bg-grey-100 mt-3 border-radius mx-auto px-4 py-3">
          <DoctTypography variant="h6" className="text-grey-800">
            Sponsors
          </DoctTypography>
          <DoctTypography variant="textLabel1" className="text-grey-400 mt-1">
            Not added yet
          </DoctTypography>
          <div className="d-flex text-center justify-content-center align-items-center">
            <div>
              <div>
                <img src={sponsoredImg} alt="sponsered-image" />
              </div>
              <div>
                <DoctTypography variant="body2" className="mt-1 text-grey-600">
                  Add event sponsors/ supporting organisations.
                </DoctTypography>
              </div>
              <div className="d-flex text-center justify-content-center align-items-center">
                <DoctButton
                  variant="contained"
                  icon="plus"
                  text="Add Sponsor"
                  className="doct_btn_sponsors mb-3"
                  onButtonClickHandler={(e) => {
                    setSelectedRecords(null);
                    manageActionHandler();
                    e.preventDefault();
                  }}
                />
              </div>
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
        title={editingData ? 'Edit Sponsor' : 'Add Sponsor'}
        width={360}
      >
        <ManageSponsors
          touched={touched}
          setPhotoSrc={setPhotoSrc}
          photoSrc={photoSrc}
          register={register}
          handleModalSubmit={handleModalSubmit}
          control={control}
          errors={errors}
          sponsors={sponsors}
          selectedRecord={selectedRecords}
          reset={reset}
        />
      </DoctModal>
    </div>
  );
}

export default Sponsors;
