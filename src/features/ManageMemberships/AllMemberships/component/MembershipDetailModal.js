import { DoctModal } from '@doct-react/app';
import { DoctCol, DoctRow, DoctTypography } from '@doct-react/core';
import React from 'react';

const MembershipDetailModal = ({
  openModal,
  handleCloseBtn,
  fees,
  renewalPaymentTerms,
  totalMembers,
  criteria,
  benifits,
  membershipName,
}) => {
  return (
    <div>
      <DoctModal
        className="membership_modal"
        handleClose={handleCloseBtn}
        open={openModal}
        title={membershipName}
        showFooter={false}
        width={810}
      >
        <div className="p-3">
          <DoctRow>
            {/* <DoctCol sm={4} className={'py-2'}>
              <DoctTypography variant="textLabel1" className="font-weight-bold m-0">
                Taxation
              </DoctTypography>
              <DoctTypography variant="subtitle2" className="my-2">
                Excluding all taxes
              </DoctTypography>
            </DoctCol> */}

            <DoctCol sm={4} className={'py-2'}>
              <DoctTypography variant="textLabel1" className="font-weight-bold m-0">
                Fees
              </DoctTypography>
              <DoctTypography variant="subtitle2" className="my-2">
                INR {fees}
              </DoctTypography>
            </DoctCol>

            <DoctCol sm={4} className={'py-2'}>
              <DoctTypography variant="textLabel1" className="font-weight-bold m-0">
                Renewal Payment Terms
              </DoctTypography>
              <DoctTypography variant="subtitle2" className="my-2">
                {renewalPaymentTerms}
              </DoctTypography>
            </DoctCol>

            <DoctCol sm={4} className={'py-2'}>
              <DoctTypography variant="textLabel1" className="font-weight-bold m-0">
                Total Members
              </DoctTypography>
              <DoctTypography variant="subtitle2" className="my-2">
                {totalMembers}
              </DoctTypography>
            </DoctCol>
          </DoctRow>
          {criteria?.length >= 0 && (
            <DoctTypography variant="textLabel1" className="font-weight-bold">
              Criteria
            </DoctTypography>
          )}
          {criteria?.map((item) => {
            return (
              <>
                <DoctTypography variant="body2"> &bull; {item}</DoctTypography>
              </>
            );
          })}
          {benifits?.length >= 0 && (
            <DoctTypography variant="textLabel1" className="font-weight-bold mt-5">
              Benefits
            </DoctTypography>
          )}
          {benifits?.map((item) => {
            return (
              <>
                <DoctTypography variant="body2" className="d-block">
                  &bull; {item}
                </DoctTypography>
              </>
            );
          })}
        </div>
      </DoctModal>
    </div>
  );
};

export default MembershipDetailModal;
