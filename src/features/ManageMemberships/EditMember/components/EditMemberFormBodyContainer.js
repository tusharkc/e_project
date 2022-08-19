import React from 'react';
import EditMemberFormFooter from './EditMemberFormFooter';
import EditMemberFormHeader from './EditMemberFormHeader';

const EditMemberFormBodyContainer = ({ children, setStatus }) => {
  return (
    <>
      <EditMemberFormHeader setStatus={setStatus} /> {children} <EditMemberFormFooter />
    </>
  );
};

export default EditMemberFormBodyContainer;
