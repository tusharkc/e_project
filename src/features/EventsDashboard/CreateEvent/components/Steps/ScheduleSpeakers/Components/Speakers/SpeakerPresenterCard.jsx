import React from 'react';
import { DoctTypography } from '@doct-react/core';
import { DoctActionMenu } from '@doct-react/app';
import DefaultUserPicture from '../../../../../../../../assets/icons/DefaultUserPicture.svg';
const options = [
  {
    title: 'Edit',
  },
  {
    title: 'Delete',
  },
];

const SpeakerPresenterCard = ({
  name,
  professionalTitle,
  image,
  setIsModalOpen,
  additionalFun,
  index,
  deleteRecordHandler,
}) => {
  return (
    <div className="organiser_card_body border-radius px-3 py-2 bg-white">
      <div className="d-flex justify-content-around py-2">
        <img
          src={image ? image : DefaultUserPicture}
          className="img-organiser mr-auto"
          alt="organizer-image"
        />
        <DoctActionMenu
          btnType="inverse"
          className="more_action_menu_organizer mt-sm-n2 mr-sm-n3"
          options={options}
          onClick={(item) => {
            if (item.title == 'Edit') {
              setIsModalOpen(true);
              additionalFun();
            }
            if (item.title == 'Delete') {
              deleteRecordHandler(index);
            }
          }}
        />
      </div>
      <DoctTypography
        variant="textLabel1"
        className="text-grey-800 mt-1 organiser_card_name text-truncate"
      >
        {name}
      </DoctTypography>
      <DoctTypography
        variant="textLabel2"
        className="text-grey-400 mt-sm-n3 organiser_card_designation text-truncate-two-lines"
      >
        {professionalTitle}
      </DoctTypography>
    </div>
  );
};

export default SpeakerPresenterCard;
