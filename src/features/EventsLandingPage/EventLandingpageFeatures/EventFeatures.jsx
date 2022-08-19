import './EventFeature.scss';
import React from 'react';
import { DoctCol, DoctContainer, DoctRow } from '@doct-react/core';
import EventFeaturesCard from './components/EventFeaturesCard';
import { EventfeaturesData } from './components/eventStaticdata';
import documentIcon from '../../../assets/images/event_landing_page/features_icons/document_icon.png';
import megaphoneIcon from '../../../assets/images/event_landing_page/features_icons/promotion_icon.svg';
import sevenIcon from '../../../assets/images/event_landing_page/features_icons/numbers_seven.svg';
import eightIcon from '../../../assets/images/event_landing_page/features_icons/numbers_eight.svg';
const EventFeatures = () => {
  return (
    <DoctContainer>
      <h2 className="events_feature_handing font-weight-bold text-center">Features</h2>

      <div className="events_landingpage_features_background_section mt-5">
        <DoctRow>
          {EventfeaturesData.map((item, index) => {
            return (
              <DoctCol sm={4} className="mx-auto" key={index}>
                <EventFeaturesCard
                  title={item.title}
                  subtitle={item.subtitle}
                  image={item.image}
                  number={item.number}
                />
              </DoctCol>
            );
          })}
          <div className="events_features_last_two_card d-flex justify-content-center w-100 align-items-center">
            <div className="seventh_card px-5 mx-5">
              <img src={documentIcon} alt="document_img" />
              <div className="d-flex">
                <h6 className="font-weight-bold">E-Certificate</h6>
                <span>
                  <img src={sevenIcon} alt="number_seven" className="number_seven" />
                </span>
              </div>
              <p className="text-grey-500 mt-4">
                Effortlessly send the certificates
                <br /> digitally
              </p>
            </div>

            <div className="eight_card px-5 mb-2">
              <img src={megaphoneIcon} alt="document_img" />
              <div className="d-flex">
                <h6 className="font-weight-bold ">Promotions</h6>
                <span>
                  <img src={eightIcon} alt="number_eight" className="number_eight" />
                </span>
              </div>
              <p className="text-grey-500 mt-4 ">SMS & Email to promote your events</p>
            </div>
          </div>
        </DoctRow>
      </div>
    </DoctContainer>
  );
};

export default EventFeatures;
