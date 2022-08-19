import { DoctModal } from '@doct-react/app';
import { DoctButton, DoctTypography } from '@doct-react/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { MANAGE_EVENTS } from '../../../../routes/constant';
import { setDefaultState } from '../createEvent.slice';

export const ManageCloseEvent = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <DoctModal open={open} handleClose={handleClose} iconName="" showFooter={false}>
        <DoctTypography variant="h6">Are you sure you want to close?</DoctTypography>
        <DoctTypography variant="body3" className="text-grey-600 mb-3">
          You can save draft to continue later from where you left or discard all the progress.
        </DoctTypography>

        <Link to={`${MANAGE_EVENTS}`} className="">
          <DoctButton
            className="float-right mx-2 discard_btn "
            text="Yes"
            variant="contained"
            size="medium"
            onButtonClickHandler={() => {
              dispatch(setDefaultState());
            }}
          />
        </Link>
        <DoctButton
          className="float-right save_draft_btn text-grey-600"
          text="No"
          variant="contained"
          size="medium"
          onButtonClickHandler={handleClose}
        />
      </DoctModal>
    </>
  );
};
