import { DoctTypography } from '@doct-react/core';
import React from 'react';
import dayjs from 'dayjs';
import { DoctChip } from '@doct-react/app';

const ManageDirectoryCollapsable = ({ column }) => {
  const {
    fullName,
    uniqueId,
    birthDate,
    gender,
    professionalTitle,
    bio,
    lastPaymentRemarks,
    workSpecialities,
    practingLicenseNumber,
    permanentCountry,
    permanentState,
    permanentCity,
    correspondenceAddress,
    permanentAddress,
    educations,
    mobileCode,
    mobileNumber,
    whatsAppNumber,
    whatsAppNumberCode,
    memberId,
    enrollmentDate,
    renewalDate,
    reference,
    profileUrl,
    correspondencePostalCode,
    permanentPostalCode,
    email,
    membership,
  } = column || {};

  const { membershipTitle } = membership || '';

  return (
    <div className="d-flex justify-content-between px-3">
      <div className="user_detail_section_1">
        <DoctTypography variant="subtitle2" className="text-grey-800">
          Member Details
        </DoctTypography>
        {profileUrl && (
          <img
            className="user_detail_profile_img img-fluid"
            src={profileUrl}
            alt="user_profile_image"
          />
        )}

        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Unique Id: </span>
          <span className="text-grey-800">{uniqueId}</span>
        </DoctTypography>
        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Full name: </span>
          <span className="text-grey-800">{fullName}</span>
        </DoctTypography>
        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Birth Date: </span>
          <span className="text-grey-800">
            {birthDate ? new dayjs(birthDate).format('DD MMM YYYY') : '-'}
          </span>
        </DoctTypography>
        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Gender: </span>
          <span className="text-grey-800">{gender}</span>
        </DoctTypography>
        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Professional Title: </span>
          <span className="text-grey-800">{professionalTitle}</span>
        </DoctTypography>
        {bio && (
          <>
            <DoctTypography variant="subtitle2" className="mt-4 mb-0 text-grey-800">
              Bio
            </DoctTypography>
            <DoctTypography variant="subtitle3" className="text-grey-800">
              {bio}
            </DoctTypography>
          </>
        )}

        <DoctTypography variant="subtitle2" className="mt-4 text-grey-800">
          Last Payment Remarks
        </DoctTypography>

        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Remark: </span>
          <span className="text-grey-800">{lastPaymentRemarks ? lastPaymentRemarks : '-'}</span>
        </DoctTypography>
      </div>
      <div className="user_detail_section_2">
        {workSpecialities && workSpecialities[0] != null && (
          <>
            <DoctTypography variant="subtitle2" className="text-grey-800">
              Work Speciality
            </DoctTypography>

            <div className="d-flex flex-wrap">
              {workSpecialities?.map((itemName, index) => {
                return (
                  <div key={index} className="mx-1">
                    <DoctChip showCloseIcon={false} title={itemName}></DoctChip>;
                  </div>
                );
              })}
            </div>
          </>
        )}

        <DoctTypography variant="subtitle2" className="mb-0 text-grey-800">
          Practicing License
        </DoctTypography>

        <DoctTypography variant="subtitle3" className="text-grey-800">
          {practingLicenseNumber ? practingLicenseNumber : ''}
        </DoctTypography>

        <DoctTypography variant="subtitle2" className="mt-4 mb-0 text-grey-800">
          Location Details
        </DoctTypography>

        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Country: </span>
          <span className="text-grey-800">{permanentCountry}</span>
        </DoctTypography>
        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">State/ Province: </span>
          <span className="text-grey-800">{permanentState ? permanentState : '-'}</span>
        </DoctTypography>
        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">City: </span>
          <span className="text-grey-800">{permanentCity}</span>
        </DoctTypography>
        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Correspondence Address: </span>
        </DoctTypography>
        <DoctTypography className="text-grey-800" variant="subtitle3">
          {correspondenceAddress ? correspondenceAddress : ''}
          {correspondenceAddress ? ',' : ''}
          {correspondencePostalCode ? correspondencePostalCode : '-'}
        </DoctTypography>
        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Permanent Address: </span>
        </DoctTypography>
        <DoctTypography className="text-grey-800" variant="subtitle3">
          {permanentAddress ? permanentAddress : ''} {permanentAddress ? ',' : ''}
          {permanentPostalCode ? permanentPostalCode : '-'}
        </DoctTypography>

        {educations && educations[0] != null && (
          <>
            <DoctTypography variant="subtitle2" className="mt-4 text-grey-800">
              Education
            </DoctTypography>
            <div className="d-flex flex-wrap">
              {educations?.map((itemName, index) => {
                return (
                  <div key={index} className="mx-1">
                    <DoctChip showCloseIcon={false} title={itemName}></DoctChip>;
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="user_detail_section_3">
        <DoctTypography variant="subtitle2" className="text-grey-800">
          Contact Details
        </DoctTypography>

        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Mobile: </span>
          <span className="text-grey-800">
            {mobileCode} {mobileNumber}
          </span>
        </DoctTypography>

        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">WhatsApp: </span>
          <span className="text-grey-800">
            {whatsAppNumberCode ? whatsAppNumberCode : ''} {whatsAppNumber ? whatsAppNumber : '-'}
          </span>
        </DoctTypography>

        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Email: </span>
          <span className="text-grey-800">{email}</span>
        </DoctTypography>

        <DoctTypography variant="subtitle2" className="mt-4 text-grey-800">
          Membership Information
        </DoctTypography>

        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Membership: </span>
          <span className="text-grey-800">{membershipTitle}</span>
        </DoctTypography>

        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Member ID: </span>
          <span className="text-grey-800">{memberId ? memberId : '-'}</span>
        </DoctTypography>

        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Enrollment Date: </span>
          <span className="text-grey-800">
            {enrollmentDate ? new dayjs(enrollmentDate).format('DD MMM YYYY') : '-'}
          </span>
        </DoctTypography>

        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Renewal Date: </span>
          <span className="text-grey-800">
            {renewalDate ? new dayjs(renewalDate).format('DD MMM YYYY') : '-'}
          </span>
        </DoctTypography>

        <DoctTypography variant="subtitle3">
          <span className="text-grey-600">Reference/ Proposed By: </span>
          <span className="text-grey-800">{reference ? reference : '-'}</span>
        </DoctTypography>
      </div>
    </div>
  );
};

export default ManageDirectoryCollapsable;
