import { DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React from 'react';
import documentIcon from '../../../../assets/icons/institute-dashboard/document.svg';

const ApplicantDocumnetsCards = ({ attachment, i }) => {
  return (
    <div className="bg-white m-1 px-2 d-flex align-items-center justify-content-between">
      <img src={documentIcon} />
      <DoctTypography variant="textLabel2" className="text-grey-800">
        Document {i + 1}
      </DoctTypography>

      <a href={attachment} rel="noreferrer" target="_blank">
        <DoctTypography variant="textLabel2" className="text-primary">
          VIEW
        </DoctTypography>
      </a>
    </div>
  );
};

const ApplicantCollpsable = ({ column }) => {
  const { applicantId, userName, gender, city, mobileNumber, email, attachments } = column;

  return (
    <DoctRow>
      <DoctCol sm={4}>
        <DoctTypography variant="textLabel1" fontWeight="bold" className="text-grey-800">
          Applicant Info
        </DoctTypography>

        <DoctTypography variant="textLabel2" className="text-grey-800">
          Applicant ID: {applicantId}
        </DoctTypography>

        <DoctTypography variant="textLabel2" className="text-grey-800">
          Full name: {userName}
        </DoctTypography>

        <DoctTypography variant="textLabel2" className="text-grey-800">
          Gender: {gender}
        </DoctTypography>

        <DoctTypography variant="textLabel2" className="text-grey-800">
          Current Location: {city}
        </DoctTypography>
      </DoctCol>
      <DoctCol sm={4}>
        <DoctTypography variant="textLabel1" fontWeight="bold" className="text-grey-800">
          Contact Info
        </DoctTypography>

        <DoctTypography variant="textLabel2" className="text-grey-800">
          Mobile: {mobileNumber}
        </DoctTypography>
        <DoctTypography variant="textLabel2" className="text-grey-800">
          Whatsapp: {mobileNumber}
        </DoctTypography>
        <DoctTypography variant="textLabel2" className="text-grey-800">
          Email: {email}
        </DoctTypography>
      </DoctCol>

      <DoctCol sm={8}>
        {attachments?.length > 0 && (
          <DoctTypography variant="textLabel1" fontWeight="bold" className="text-grey-800">
            Documents
          </DoctTypography>
        )}

        <div className="d-flex flex-wrap">
          {attachments?.length > 0 &&
            attachments?.map((attachment, i) => {
              return (
                <div className="w-50" key={i}>
                  <ApplicantDocumnetsCards i={i} attachment={attachment} />
                </div>
              );
            })}
        </div>
      </DoctCol>
    </DoctRow>
  );
};

export default ApplicantCollpsable;
