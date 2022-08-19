import React from 'react';
import { EditMembershipFooter } from './components/EditMembershipFooter';
import { EditMembershipHeader } from './components/EditMembershipHeader';

export const EditmembershipLayout = ({ children }) => {
  return (
    <>
      <EditMembershipHeader />
      {children}
      <EditMembershipFooter />
    </>
  );
};
