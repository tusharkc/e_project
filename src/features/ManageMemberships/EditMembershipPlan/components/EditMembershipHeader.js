import { DoctIcon, DoctTypography } from '@doct-react/core';
import React from 'react';

import { useNavigate } from 'react-router-dom';

export const EditMembershipHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="add_new_membership_section bg-grey-100 d-flex px-5 py-2">
      <span
        className="cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        <DoctIcon name="close" fill="grey" width="24" />
      </span>
      <DoctTypography variant="subtitle2" className="mt-2 mx-3">
        Edit Membership
      </DoctTypography>
    </div>
  );
};
