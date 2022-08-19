import { DoctModal } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React from 'react';
import * as ROUTE from '../../../../routes/constant';

const SuccessModal = ({ isSuccess }) => {
  return (
    <div>
      <DoctModal
        open={isSuccess}
        className="success_member_modal"
        iconName=""
        width={460}
        handlePrimaryButtonClick={() => {
          window.location.pathname = `/${ROUTE.DASHBOARD}/${ROUTE.MANAGE_MEMBERSHIPS}/${ROUTE.ALL_MEMBERSHIPS}`;
        }}
        primaryBtnText="Go to All Memberships"
      >
        <DoctTypography variant="h5">Edit Membership successfully!</DoctTypography>
        <DoctTypography variant="subtitle3" className="text-grey-600">
          You can find New Membership in All Memberships.
        </DoctTypography>
      </DoctModal>
    </div>
  );
};

export default SuccessModal;
