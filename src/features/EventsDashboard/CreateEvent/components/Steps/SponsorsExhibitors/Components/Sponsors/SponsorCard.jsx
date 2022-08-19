import { DoctActionMenu } from '@doct-react/app';
import { DoctCol, DoctIcon, DoctRow, DoctTypography } from '@doct-react/core';
import React from 'react';
import '../../../Registration/RegistrationStyle.scss';
import DefaultUserPicture from '../../../../../../../../assets/icons/Default_Sponsor.svg';

const options = [
  {
    title: 'Edit',
  },
  {
    title: 'Delete',
  },
];

function SponsorCard({ image, name, setIsModalOpen, additionalFun, deleteRecordHandler, index }) {
  return (
    <>
      <div className="sponsor_card_body border-radius px-3 py-2 mr-3 mb-3">
        <div className="d-flex justify-content-between">
          <img
            src={image ? image : DefaultUserPicture}
            className="img-sponsor mt-1"
            alt="organizer-image"
          />
          <DoctActionMenu
            btnType="inverse"
            className="more_action_menu_organizer mr-sm-n3 mt-sm-n2"
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
          className="text-grey-800 organiser_card_name text-truncate"
        >
          {name}
        </DoctTypography>
      </div>
    </>
  );
}

export default SponsorCard;
