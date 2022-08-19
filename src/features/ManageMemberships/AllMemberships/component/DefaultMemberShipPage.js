import { DoctTypography, DoctButton } from '@doct-react/core';
import React from 'react';
import guidenceImg1 from '../../../../assets/images/manage_memberships/guidence_img_1.png';
import guidenceImg2 from '../../../../assets/images/manage_memberships/guidence_img_2.png';
import { Link } from 'react-router-dom';

const DefaultMemberShipPage = () => {
  return (
    <div className="w-100 my-5">
      <DoctTypography variant="subtitle2" fontWeight="medium" className="text-center">
        Managing the membership for any association is a tedious job and requires a lot of manual
        work. These feature allow automation of monotonous tasks and helps to structure the
        membership process.
      </DoctTypography>

      <DoctTypography variant="subtitle2" fontWeight="medium" className="text-center">
        Not only would you be able to save and maintain their contact information, payment history
        and other membership related information all in one place.
      </DoctTypography>

      <div className="information_container w-100 my-5">
        <div className="mx-auto w-75 ">
          <DoctTypography variant="subtitle2">1. Add New Membership</DoctTypography>
          <img src={guidenceImg1} />
          <DoctTypography variant="subtitle2">2. Upload Members</DoctTypography>
          <img src={guidenceImg2} />
          <DoctTypography variant="subtitle2" className="text-center">
            You&apos;re all set for your next step!
          </DoctTypography>
        </div>
        <Link to={'/dashboard/new-memberships'}>
          <DoctButton text="Add New Membership" icon="plus" size="medium" className="mx-auto" />
        </Link>
      </div>
    </div>
  );
};

export default DefaultMemberShipPage;
