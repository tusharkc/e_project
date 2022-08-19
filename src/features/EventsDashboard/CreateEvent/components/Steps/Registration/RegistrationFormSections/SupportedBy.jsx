import { DoctForm, DoctModal } from '@doct-react/app';
import { DoctButton, DoctCol, DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import image from '../../../../../../../assets/icons/photo-upload.svg';
import { imageHandler } from '../../../../../../../helper/helperFunction';
import {
  fetchEventById,
  saveSupportersDetails,
  selectCreateEventResponse,
  selectRegistartionDetails,
  selectSupporterDetails,
} from '../../../../createEvent.slice';
import ManageSupported from '../components/ManageSupported';
import SupporterCard from '../components/SupporterCard';

function SupportedBy({ supporters, setSupporters }) {
  const dispatch = useDispatch();
  const supportedBy = useSelector(selectSupporterDetails);
  const registartionDetails = useSelector(selectRegistartionDetails);
  const apiResponseData = useSelector(selectCreateEventResponse);
  const { id } = useParams();

  useEffect(() => {
    if (id == undefined) return;
    dispatch(fetchEventById(id));
  }, [id]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState(null);
  const [editingData, setEditingData] = useState(false);

  const manageActionHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const supportedByName = [...supporters];

    if (Object.keys(apiResponseData).length) {
      apiResponseData?.supportedBy?.map((item) => {
        if (supportedByName.includes(item) != true) {
          supportedByName.push(item);
        }
      });
    }

    setSupporters(supportedByName);
  }, [Object.keys(apiResponseData).length]);

  useEffect(() => {
    const supportedByName = [...supporters];
    if (Object.keys(supportedBy).length >= 1) {
      supportedByName.push(supportedBy);
    }
    if (registartionDetails?.SupportedBy?.length >= 1) {
      registartionDetails.SupportedBy.map((item) => {
        if (supportedByName.includes(item) != true) {
          supportedByName.push(item);
        }
      });
    }

    setSupporters(supportedByName);
  }, [supportedBy, registartionDetails]);

  const [photoSrc, setPhotoSrc] = useState(image);
  const { handleSubmit, control, touched, errors, watch, register, reset } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const deleteRecordHandler = (index) => {
    let newArray = [...supporters];
    newArray.splice(index, 1);
    setSupporters(newArray);
  };

  const handleFormSubmit = handleSubmit((values) => {
    if (editingData) {
      supporters[selectedRecords] = { ...supporters[selectedRecords], ...values };
      if (supporters[selectedRecords]?.SupportedByPictureFile?.length) {
        delete supporters[selectedRecords].supportedByPictureUrl;
      }
      setSelectedRecords(null);
      manageActionHandler();
      setEditingData(false);
    } else {
      dispatch(saveSupportersDetails(values));
      setSelectedRecords(null);
      manageActionHandler();
      setEditingData(false);
    }
  });
  return (
    <>
      <DoctTypography variant="subtitle2" className="text-grey-800">
        Supported by (optional)
      </DoctTypography>
      <DoctTypography variant="body2" className="text-grey-600">
        Add Supported by Association / Under the AEGIS of.,
      </DoctTypography>
      <DoctButton
        variant="contained"
        icon="plus"
        text="Add Supporter"
        className="doct_btn_add_member mb-3"
        onButtonClickHandler={(e) => {
          setSelectedRecords(null);
          e.preventDefault();
          manageActionHandler();
        }}
      />
      {supporters?.map((item, index) => {
        return (
          <DoctCol xs={12} key={index} className="py-1">
            <SupporterCard
              image={imageHandler(item?.supportedByPictureUrl || item.SupportedByPictureFile)}
              name={item.supportedByName}
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

      <DoctModal
        iconName={''}
        primaryBtnText={'Save'}
        open={isModalOpen}
        className={'disable_modal_outside_click'}
        handlePrimaryButtonClick={handleFormSubmit}
        handleClose={() => {
          setSelectedRecords(null);
          manageActionHandler();
          setEditingData(false);
        }}
        title={'Add Supporter'}
        width={360}
      >
        <ManageSupported
          control={control}
          errors={errors}
          touched={touched}
          setPhotoSrc={setPhotoSrc}
          photoSrc={photoSrc}
          register={register}
          handleFormSubmit={handleFormSubmit}
          supporters={supporters}
          selectedRecord={selectedRecords}
          reset={reset}
        />
      </DoctModal>
    </>
  );
}

export default SupportedBy;
