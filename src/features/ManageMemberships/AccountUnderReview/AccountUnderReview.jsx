import { DoctModal } from '@doct-react/app';
import React, { useState, useEffect } from 'react';
import { DoctTypography, DoctCol } from '@doct-react/core';
import accountReviewImg from '../../../assets/images/manage_memberships/account_review.svg';
import './AccountUnderReview.scss';

const AccountUnderReview = ({ handelClose }) => {
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (window.location.href.search('ManageMemberships') > -1) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [window.location.href]);

  return (
    <>
      <div>
        <DoctModal
          width={809}
          className="events_inqury_modal"
          title="_"
          open={openModal}
          iconName=""
          handleClose={handelClose}
          showFooter={false}
        >
          <div className="text-center">
            <img src={accountReviewImg} alt="event-inquery-modal" />
          </div>
          <div className="text-center">
            <DoctTypography variant="h4" className="text-grey-800 mt-3">
              Thank You!
            </DoctTypography>
            <DoctTypography
              letterSpacing={0}
              variant="subtitle1"
              className="font-weight-medium text-grey-800 mt-3"
            >
              Your account is currently being reviewed and will be <br /> activated within 2-3
              working days. <br /> Once it is activated, you&apos;ll be able to:
            </DoctTypography>
            <DoctCol sm={6} className="mx-auto">
              <div className="bg-primary-100 border-radius account_review_bg_text py-3">
                <DoctTypography variant="subtitle2" className="text-grey-800">
                  Add New Memberships
                </DoctTypography>
                <DoctTypography variant="subtitle2" className="text-grey-800">
                  Upload your existing member&apos;s data via an Excel Sheet
                </DoctTypography>
                <DoctTypography variant="subtitle2" className="text-grey-800">
                  Download members directory in PDF, Excel & Addressable label list
                </DoctTypography>
              </div>
            </DoctCol>
            <DoctTypography variant="h6" className="mt-4">
              For more details contact us at <br />
              <span className="text-primary">enterprise@docthub.com</span> or call us on
              <span className="text-primary"> (+91) 90909 02626.</span>
            </DoctTypography>
          </div>
        </DoctModal>
      </div>
    </>
  );
};

export default AccountUnderReview;
