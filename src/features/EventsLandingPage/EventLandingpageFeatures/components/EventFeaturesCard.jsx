import React, { useEffect, useState } from 'react';

const EventFeaturesCard = ({ title, subtitle, image, number }) => {
  return (
    <div className="events_landingpage_card_body d-flex   mx-5 ">
      <div className="events_landingpage_card_features">
        <img src={image} className="events_features_img_icon" alt="features_image" />
        <div className="d-flex">
          {' '}
          <h6 className="events_features_card_title font-weight-bold my-0 py-0">{title}</h6>
          <span>
            {' '}
            <img
              src={number}
              alt="events_features_numbering"
              className="events_feature_numbering mx-2"
            />
          </span>
        </div>
        <p className="events_features_card_subtitle text-grey-600 mt-4">{subtitle}</p>
      </div>
    </div>
  );
};

export default EventFeaturesCard;
