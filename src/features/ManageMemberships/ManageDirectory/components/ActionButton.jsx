import { DoctButton } from '@doct-react/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMembershipsQuery } from '../../AllMemberships/services/memberships.services';
const ActionButton = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useMembershipsQuery();

  return (
    <DoctButton
      onButtonClickHandler={() => {
        navigate('/dashboard/add-member');
      }}
      text="New Member"
      icon="plus"
      size="medium"
      disabled={data?.length > 0 ? false : true}
      className="ml-auto"
    />
  );
};

export default ActionButton;
