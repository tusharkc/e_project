import { DoctTypography } from '@doct-react/core';
import React from 'react';
import offerTick from '../../../../../assets/icons/offerTick.svg';

const OfferCard = ({
  offerTitle,
  offerSpecifications = [],
  ctaElement,
  cardBg = 'bg-white',
  offerTitleColor = 'text-primary-500',
}) => {
  return (
    <div className={`mx-2 offer_card p-4 border-radius ${cardBg}`}>
      <DoctTypography className={offerTitleColor} variant="h4">
        {offerTitle}
      </DoctTypography>

      {offerSpecifications.map((specification) => (
        <>
          <div className="d-flex align-items-center">
            <img src={offerTick} alt="offerTick" />
            <DoctTypography variant="body1" className="mx-2 my-2 text-grey-600">
              {specification}
            </DoctTypography>
          </div>
        </>
      ))}

      {ctaElement}
    </div>
  );
};

export default OfferCard;
