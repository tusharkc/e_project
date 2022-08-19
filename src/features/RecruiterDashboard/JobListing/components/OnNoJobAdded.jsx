import { DoctButton, DoctTypography } from '@doct-react/core';
import React from 'react';
import { useNavigate } from 'react-router';
import OnNoJobAddedImg from '../../../../assets/images/onNoJobAdded.svg';

const OnNoJobAdded = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center py-5">
      <img src={OnNoJobAddedImg} />
      <DoctTypography variant="subtitle1">Post your first job!</DoctTypography>
      <DoctTypography variant="subtitle2" className="post_job_text mx-auto text-grey-600">
        Since you haven&apos;t posted a job yet, post a vacancy first to manage the job profiles.
      </DoctTypography>
      <DoctButton
        size="medium"
        className="mx-auto"
        text="Post a Job"
        icon="plus"
        iconPosition="left"
        onButtonClickHandler={() => {
          navigate('/dashboard/recruiter/post-a-job');
        }}
      />
    </div>
  );
};

export default OnNoJobAdded;
