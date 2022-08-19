import React from 'react';
import { MembershipCreationFooter } from './components/MembershipCreationFooter';
import { MembershipCreationHeader } from './components/MembershipCreationHeader';

export const NewMemberShipCreationLayout = ({ children }) => {
  return (
    <>
      <MembershipCreationHeader />
      {children}
      <MembershipCreationFooter />
    </>
  );
};
