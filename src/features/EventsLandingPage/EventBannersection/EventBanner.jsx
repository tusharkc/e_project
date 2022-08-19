import React from 'react';
import './EventBannerstyle.scss';
import eventicon from '../../../assets/images/event_landing_page/banner_images/Events Logo.png';
import pausebutton from '../../../assets/images/event_landing_page/banner_images/pause_icon.png';
import underline from '../../../assets/images/event_landing_page/banner_images/redefineUnderline.png';

const Banner = () => {
  return (
    <div className="banner_section d-flex justify-content-center text-center align-items-center">
      <div className="banner__section_description position-relative">
        <div className="d-flex justify-content-center text-center align-items-center ">
          <img src={eventicon} />
          <span className="event_header font-weight-bold text-white mt-2 mx-1">Events</span>
        </div>

        <div className="banner_section_title text-white">
          <h1 className="mt-5">Redefine the traditional methods</h1>
          <img src={underline} className="redefine_underline ml-2 position-absolute" />
          <h6 className="mt-4">
            Docthub Events offers a one-stop solution to organize and streamline Medical <br />
            Conferences, Workshops, CMEs, Exhibitions and much more!
          </h6>
        </div>
        <div className="banner_video_section d-flex justify-content-center align-items-center mt-5">
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={process.env.REACT_APP_ACCOUNT_APP_BUSINESS_LINK}
          >
            <button className="event_landing_page_common_button mx-5 cursor-pointer">
              Get Started
            </button>
          </a>

          <a href="#" className="d-flex justify-content-center align-items-center">
            <img src={pausebutton} />

            <span className="video_section_intro mx-2">Video Introduction</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
