import React from 'react';
import PartneredEventsCard from './components/PartneredEventsCard';

import { DoctCol, DoctContainer, DoctRow, Doctbutton } from '@doct-react/core';
import './PartneredEvents.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import underlineImage from '../../../assets/images/event_landing_page/partnered_events/can_be_here_underline.svg';

const PartneredEvents = () => {
  const [data, setData] = useState([]);
  const getBlogData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/eventcenter/events/summary`)
      .then((response) => {
        setData(response?.data);
      });
  };
  useEffect(() => {
    getBlogData();
  }, []);
  return (
    <DoctContainer>
      <div className="main_event ">
        <h2 className="partenered_events_heading text-center font-weight-bold">Partnered Events</h2>
        <DoctRow>
          {data?.partneredEvents?.map((item, index) => {
            return (
              <>
                <DoctCol sm={4} key={index}>
                  <PartneredEventsCard
                    title={item.name}
                    venue={item.type}
                    image={item.image.coverImageUrl}
                    location={item.venue.state}
                    specialities={item.specialities[0]}
                    // city={item.venue.city}
                    state={item.venue.city}
                    organizername={item.organizer.name}
                  />
                </DoctCol>
              </>
            );
          })}
          <div className="create_event_section">
            <h3 className="font-weight-bold heading_create_events position-relative ">
              <span className="text_create_event">Your</span> event <br /> can be here
              <img
                src={underlineImage}
                alt="can_be_here_underline"
                className=" can_be_here_underline position-absolute"
              />
            </h3>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href={process.env.REACT_APP_ACCOUNT_APP_BUSINESS_LINK}
            >
              <button className=" create_event_button cursor-pointer mx-4 mt-4">
                Create an Event Now &#62;
              </button>
            </a>
          </div>
        </DoctRow>
      </div>
    </DoctContainer>
  );
};

export default PartneredEvents;
