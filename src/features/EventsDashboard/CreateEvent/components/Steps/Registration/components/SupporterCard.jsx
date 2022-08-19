import { DoctActionMenu } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React from 'react';
import defaultImage from '../../../../../../../assets/icons/Default_Sponsor.svg';
import '../../Registration/RegistrationStyle.scss';

const options = [
  {
    title: 'Edit',
  },
  {
    title: 'Delete',
  },
];

function SupporterCard({ image, setIsModalOpen, additionalFun, deleteRecordHandler, index, name }) {
  return (
    <div className="box-shadow d-flex align-items-center justify-content-between supportedby_card bg-white py-2 px-2 border-radius ">
      <div className="d-flex align-items-center">
        <img
          src={image ? image : defaultImage}
          className="border-radius supportedby_img border-radius supportedby_img"
          alt="institue logo"
        />

        <DoctTypography
          variant="textLabel2"
          className="font-weight-medium text-grey-800 ml-2 text-truncate-two-lines"
        >
          {name}
        </DoctTypography>
      </div>
      <div>
        <DoctActionMenu
          btnType="inverse"
          className="more_action_menu_organizer mt-sm-n4"
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
    </div>
  );
}

export default SupporterCard;
