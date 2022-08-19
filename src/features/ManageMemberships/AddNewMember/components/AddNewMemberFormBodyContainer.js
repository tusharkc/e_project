import React from 'react';
import AddNewMemberFormFooter from './AddNewMemberFormFooter';
import AddNewMemberFormHeader from './AddNewMemberFormHeader';

const AddNewMemberFormBodyContainer = ({ children, setStatus }) => {
  return (
    <>
      <AddNewMemberFormHeader setStatus={setStatus} /> {children} <AddNewMemberFormFooter />
    </>
  );
};

export default AddNewMemberFormBodyContainer;
