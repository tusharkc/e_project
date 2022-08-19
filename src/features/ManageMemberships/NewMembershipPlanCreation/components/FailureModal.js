import { DoctModal } from '@doct-react/app';
import { DoctTypography, DoctButton } from '@doct-react/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../newMembership.scss';
const FailureModal = ({ isSuccessfull }) => {
  const navigate = useNavigate();
  return (
    <div>
      <DoctModal
        open={isSuccessfull == false && true}
        className="failure_member_modal"
        iconName=""
        width={460}
        handlePrimaryButtonClick={() => {
          navigate(-1);
        }}
        primaryBtnText="Try again"
      >
        <DoctTypography variant="h5" className="text-danger">
          Error in adding a new membership
        </DoctTypography>
        <DoctTypography variant="subtitle3" className="text-grey-600">
          Check the information and try again
        </DoctTypography>
      </DoctModal>
    </div>
  );
};

export default FailureModal;
