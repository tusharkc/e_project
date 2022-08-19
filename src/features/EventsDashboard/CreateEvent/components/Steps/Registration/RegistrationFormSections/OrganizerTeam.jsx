import { DoctForm, DoctModal, DoctTextField } from '@doct-react/app';
import { DoctButton, DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveMembersDetails,
  selectCreateEventResponse,
  selectMembersDetails,
  selectRegistartionDetails,
} from '../../../../createEvent.slice';
import ManageOrganizerModel from '../components/ManageOrganizerModel';
import OrganiserCard from '../components/OrganiserCard';
import image from '../../../../../../../assets/icons/photo-upload.svg';
import { imageHandler } from '../../../../../../../helper/helperFunction';

function OrganizerTeam({ userMember, setMembers, members }) {
  const memberDetails = useSelector(selectMembersDetails);
  const registartionDetails = useSelector(selectRegistartionDetails);
  const apiResponseData = useSelector(selectCreateEventResponse);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState(null);
  const [editingOrganizer, setEditingOrganizer] = useState(false);

  const manageActionHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [photoSrc, setPhotoSrc] = useState(image);

  useEffect(() => {
    const organizingTeamMembers = [...members];

    if (Object.keys(apiResponseData).length) {
      apiResponseData?.organizer?.organizingTeam.map((item) => {
        if (organizingTeamMembers.includes(item) != true) {
          organizingTeamMembers.push(item);
        }
      });
    }

    setMembers(organizingTeamMembers);
  }, [Object.keys(apiResponseData).length]);

  useEffect(() => {
    const organizingTeamMembers = [...members];
    if (Object.keys(memberDetails).length >= 1) {
      organizingTeamMembers.push(memberDetails);
    }
    if (registartionDetails?.Organizer?.OrganizingTeam?.length >= 1) {
      registartionDetails.Organizer?.OrganizingTeam.map((item) => {
        if (organizingTeamMembers.includes(item) != true) {
          organizingTeamMembers.push(item);
        }
      });
    }

    setMembers(organizingTeamMembers);
  }, [memberDetails, registartionDetails]);

  const { handleSubmit, control, touched, errors, watch, register, reset, setValue } = DoctForm({
    mode: 'onChange',
    defaultValues: {},
  });

  const deleteRecordHandler = (index) => {
    let newArray = [...members];
    newArray.splice(index, 1);
    setMembers(newArray);
  };

  const handleFormSubmit = handleSubmit((values) => {
    if (editingOrganizer) {
      members[selectedRecords] = { ...members[selectedRecords], ...values };
      if (members[selectedRecords]?.pictureFile?.length) {
        delete members[selectedRecords].pictureUrl;
      }
      setSelectedRecords(null);
      manageActionHandler();
      setEditingOrganizer(false);
    } else {
      dispatch(saveMembersDetails(values));
      setSelectedRecords(null);
      manageActionHandler();
      setEditingOrganizer(false);
    }
  });
  return (
    <>
      <DoctRow>
        <DoctCol sm={12}>
          <DoctTypography variant="subtitle2" className="text-grey-800 font-weight-medium">
            Organizing Team (optional)
          </DoctTypography>

          <DoctTypography variant="body2" className="text-grey-600">
            Add organizing team members with profile picture, name, title info.
          </DoctTypography>
          <DoctButton
            variant="contained"
            icon="plus"
            text="Add Member"
            className="doct_btn_add_member mb-3"
            onButtonClickHandler={(e) => {
              setSelectedRecords(null);
              e.preventDefault();
              manageActionHandler();
            }}
          />

          <DoctRow>
            {members?.map((item, index) => {
              return (
                <DoctCol sm={5} key={index} className="py-2 mr-3">
                  <OrganiserCard
                    image={imageHandler(item?.pictureUrl || item.pictureFile)}
                    name={item.fullName}
                    designation={item.professionalTitle}
                    setIsModalOpen={setIsModalOpen}
                    additionalFun={() => {
                      setSelectedRecords(index);
                      setEditingOrganizer(true);
                    }}
                    deleteRecordHandler={deleteRecordHandler}
                    index={index}
                  />
                </DoctCol>
              );
            })}
          </DoctRow>
        </DoctCol>
      </DoctRow>

      <DoctModal
        iconName={''}
        primaryBtnText={'Save'}
        open={isModalOpen}
        className={'disable_modal_outside_click'}
        handlePrimaryButtonClick={handleFormSubmit}
        handleClose={() => {
          setSelectedRecords(null);
          manageActionHandler();
          setEditingOrganizer(false);
        }}
        title={editingOrganizer ? 'Edit Member' : 'Add Member'}
        width={360}
      >
        <ManageOrganizerModel
          control={control}
          errors={errors}
          touched={touched}
          member={userMember}
          setPhotoSrc={setPhotoSrc}
          photoSrc={photoSrc}
          register={register}
          handleFormSubmit={handleFormSubmit}
          members={members}
          selectedRecord={selectedRecords}
          reset={reset}
        />
      </DoctModal>
    </>
  );
}

export default OrganizerTeam;
