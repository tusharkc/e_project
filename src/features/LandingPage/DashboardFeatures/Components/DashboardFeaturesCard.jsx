import React from 'react';
import rightArrorIcon from '../../../../assets/icons/right_arrow_icon.svg';

const DashboardFeaturesCard = ({ title, subtitle, image, id }) => {
  return (
    <>
      <div
        className={`card_body d-flex flex-column align-items-center cursor-pointer ${
          id == 3 ? 'card_margin_3' : ''
        } ${id == 4 ? 'card_margin_4' : ''}`}
      >
        <div className="card_content d-flex align-items-center justify-content-center">
          <div>
            <h6 className="features_card_title my-0 py-0">{title}</h6>
            <p className="features_card_subtitle text-grey-600">{subtitle}</p>
          </div>
          <img src={image} alt="features_image" />
        </div>
        {/* <button className="dashboard_features_button mt-3">
          Expolre More <img src={rightArrorIcon} className="mx-3" alt="right_arrow_icon" />
        </button> */}
      </div>
    </>
  );
};

export default DashboardFeaturesCard;
