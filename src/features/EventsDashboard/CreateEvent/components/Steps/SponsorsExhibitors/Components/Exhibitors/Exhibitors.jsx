import { DoctForm, DoctModal } from '@doct-react/app';
import { DoctButton, DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import exhibitorImg from '../../../../../../../../assets/images/Create Events Form/sponsored_exhibitors/exhibitor_img.svg';
import {
  saveExhibitorsDetails,
  selectCreateEventResponse,
  selectExhibitorsDetails,
  selectSponsorsAndExhibitorsDetails,
} from '../../../../../createEvent.slice';
import ExhibitorsTable from './ExhibitorsTable';
import ManageExhibitors from './ManageExhibitors';
import qs from 'qs';
import { useParams } from 'react-router-dom';

function Exhibitors({ setExhibitors, exhibitors, setExhibitorLayout, exhibitorLayout }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const exhibitorsDetails = useSelector(selectExhibitorsDetails);
  const sponsorAndExhibitors = useSelector(selectSponsorsAndExhibitorsDetails);
  const apiResponseData = useSelector(selectCreateEventResponse);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState(null);
  const [editingData, setEditingData] = useState(false);

  const manageActionHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { handleSubmit, control, touched, errors, reset, register } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  useEffect(() => {
    const exhi = [...exhibitors];

    if (Object.keys(apiResponseData).length) {
      if (id == undefined) return;
      apiResponseData?.exhibitors?.map((item) => {
        if (exhi.includes(item) != true) {
          exhi.push(item);
        }
      });
    }

    setExhibitors(exhi);
  }, [Object.keys(apiResponseData).length]);

  useEffect(() => {
    const exhi = [...exhibitors];
    if (Object.keys(exhibitorsDetails).length >= 1) {
      exhi.push(exhibitorsDetails);
    }

    if (sponsorAndExhibitors?.Exhibitors?.length >= 1) {
      sponsorAndExhibitors?.Exhibitors?.map((item) => {
        if (exhi.includes(item) != true) {
          exhi.push(item);
        }
      });
    }

    setExhibitors(exhi);
  }, [exhibitorsDetails, sponsorAndExhibitors]);

  const deleteRecordHandler = (index) => {
    let newArray = [...exhibitors];
    newArray.splice(index, 1);
    setExhibitors(newArray);
  };

  const handleModal = handleSubmit((values) => {
    if (editingData) {
      exhibitors[selectedRecords] = values;
      setSelectedRecords(null);
      manageActionHandler();
      setEditingData(false);
    } else {
      dispatch(saveExhibitorsDetails(values));
      setSelectedRecords(null);
      manageActionHandler();
      setEditingData(false);
    }
  });

  const uploadFiles = () => {
    document.getElementById('selectField').click();
  };

  const RemoveFile = () => {
    setExhibitorLayout([]);
  };
  return (
    <div>
      {exhibitors.length ? (
        <div className="sponsors_section bg-grey-100 mt-3 border-radius mx-auto px-4 py-3 mb-5">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <DoctTypography variant="h6" className="text-grey-800 ">
                Exhibitors
              </DoctTypography>
              <DoctTypography variant="textLabel1" className="text-grey-400 mt-1">
                {exhibitors.length ? `${exhibitors.length} Exhibitors` : 'Not added yet'}
              </DoctTypography>
            </div>
            <DoctButton
              text="Upload Layout"
              variant="text"
              size="medium"
              icon="cloudBackup"
              type="secondary"
              onButtonClickHandler={(e) => {
                e.preventDefault();
                uploadFiles();
              }}
            />

            <input
              type="file"
              id="selectField"
              ref={register}
              name="profileFile"
              accept=".pdf, .doc, .docx"
              hidden
              onChange={(e) => {
                setExhibitorLayout(e.target.files[0]);
              }}
              onClick={(event) => {
                event.target.value = null;
              }}
            />
          </div>
          <div className="d-flex justify-content-end mt-n4">
            {exhibitorLayout?.name && (
              <div>
                <span className="bg-white py-2 mr-2 text-label-2">{exhibitorLayout?.name}</span>
                <button
                  onClick={RemoveFile}
                  className="border-low-opacity-black bg-danger border-radius text-grey-100"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <DoctButton
            type="primary"
            variant="text"
            icon="plus"
            text="Add Exhibitor"
            className="mx-sm-n4 mt-2 background_transparent"
            onButtonClickHandler={(e) => {
              e.preventDefault();
              setSelectedRecords(null);
              manageActionHandler();
            }}
          />

          <table className="bg-white d-none d-sm-block border-radius">
            <thead>
              <tr>
                <th>
                  <DoctTypography variant="textLabel2" className="text-left px-2 text-grey-400">
                    COMPANY NAME
                  </DoctTypography>
                </th>
                <th>
                  <DoctTypography variant="textLabel2" className="text-grey-400 px-4 text-left">
                    CITY/ COUNTRY
                  </DoctTypography>
                </th>
                <th>
                  <DoctTypography variant="textLabel2" className="text-grey-400 px-4 text-left">
                    BOOTH
                  </DoctTypography>
                </th>
                <th style={{ width: '40px' }}>
                  <DoctTypography variant="textLabel2" className="text-grey-400 px-2 text-left">
                    &nbsp;
                  </DoctTypography>
                </th>
              </tr>
            </thead>
          </table>
          {exhibitors.map((item, index) => {
            return (
              <div key={index}>
                <ExhibitorsTable
                  companyName={item.companyName}
                  boothNumber={item.boothNumber}
                  city={item.city}
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
        </div>
      ) : (
        <div className="sponsors_section bg-grey-100 mt-3 border-radius mx-auto px-4 py-3 mb-5">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <DoctTypography variant="h6" className="text-grey-800 ">
                Exhibitors
              </DoctTypography>
              <DoctTypography variant="textLabel1" className="text-grey-400 mt-1">
                Not added yet
              </DoctTypography>
            </div>
            <DoctButton
              text="Upload Layout"
              variant="text"
              size="medium"
              icon="cloudBackup"
              type="secondary"
              onButtonClickHandler={(e) => {
                e.preventDefault();
                uploadFiles();
              }}
            />

            <input
              type="file"
              id="selectField"
              ref={register}
              name="profileFile"
              accept=".pdf, .doc, .docx"
              hidden
              onChange={(e) => {
                setExhibitorLayout(e.target.files[0]);
              }}
              onClick={(event) => {
                event.target.value = null;
              }}
            />
          </div>
          <div className="d-flex justify-content-end mt-n4">
            {exhibitorLayout?.name && (
              <div>
                <span className="bg-white py-2 mr-2 text-label-2">{exhibitorLayout?.name}</span>
                <button
                  onClick={RemoveFile}
                  className="border-low-opacity-black bg-danger border-radius text-grey-100"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div className="d-flex text-center justify-content-center align-items-center">
            <div>
              <img src={exhibitorImg} alt="exhibitor-image" />
              <div>
                <DoctTypography variant="body2" className="mt-1 text-grey-600">
                  Add exhibitors here.
                </DoctTypography>
              </div>
              <div className="d-flex text-center justify-content-center align-items-center">
                <DoctButton
                  variant="contained"
                  icon="plus"
                  text="Add Exhibitor"
                  className="doct_btn_exhibitor mb-3"
                  onButtonClickHandler={(e) => {
                    setSelectedRecords(null);
                    e.preventDefault();
                    manageActionHandler();
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
        handlePrimaryButtonClick={handleModal}
        handleClose={() => {
          setSelectedRecords(null);
          setEditingData(false);
          manageActionHandler();
        }}
        title={`${selectedRecords ? 'Edit Exhibitors' : 'Add Exhibitors'}`}
        width={360}
      >
        <ManageExhibitors
          touched={touched}
          control={control}
          errors={errors}
          handleModal={handleModal}
          exhibitors={exhibitors}
          selectedRecord={selectedRecords}
          reset={reset}
        />
      </DoctModal>
    </div>
  );
}

export default Exhibitors;
