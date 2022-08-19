import { DoctButton, DoctContainer, DoctTypography } from '@doct-react/core';
import React from 'react';
import OfferCard from './OfferCard';
import { docthubJobsData, talentAcquisitionData } from './talentAcquisitionCtaData';

const TalentAcquisitionCTA = () => {
  return (
    <>
      <DoctContainer>
        <div className="bg-primary-100 border-radius p-5">
          <div className="d-flex align-items-center justify-content-center">
            <OfferCard
              cardBg="card_bg_low_opacity"
              offerTitle={'Docthub Jobs'}
              offerSpecifications={docthubJobsData}
              ctaElement={
                <div className="d-flex align-items-center justify-content-between mt-4">
                  <DoctTypography variant="subtitle1" className="text-success">
                    FREE PLAN
                  </DoctTypography>
                  <DoctTypography variant="subtitle1" className="text-grey-400">
                    Already in use
                  </DoctTypography>
                </div>
              }
            />
            <OfferCard
              offerTitleColor="text-black"
              offerTitle={'Talent Acquisition'}
              offerSpecifications={talentAcquisitionData}
              ctaElement={
                <div className="my-3">
                  <DoctTypography variant="subtitle1" className="my-4 text-center">
                    8.33% of candidate&apos;s annual CTC + GST
                  </DoctTypography>

                  <DoctButton className="w-100" text="I am Interested!" />
                </div>
              }
            />
          </div>
        </div>
      </DoctContainer>
    </>
  );
};

export default TalentAcquisitionCTA;
