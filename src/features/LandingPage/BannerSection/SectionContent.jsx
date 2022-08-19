import React from 'react';
import CoursesOutlinedIcon from '../../../assets/icons/courses_coloured_outlined_icon.svg';
import EventsOutlinedIcon from '../../../assets/icons/events_coloured_outlined_icon.svg';
import JobsOutlinedIcon from '../../../assets/icons/jobs_coloured_outlined_icon.svg';

const SectionContent = () => {
  return (
    <div className="landingpage_text_content_container">
      <div className="landingpage_services_icon_container">
        <img src={CoursesOutlinedIcon} alt="courses_icon" />
        <img src={EventsOutlinedIcon} alt="events_icon" className="mx-3" />
        <img src={JobsOutlinedIcon} alt="events_icon" />
      </div>

      <div className="content-container">
        <p className="banner_heading_subtitle">Healthcare Organization Dashboard</p>
        <h2 className="banner_heading_title mb-5">Enabling Healthcare Organizations Digitally</h2>

        <a
          target="_blank"
          rel="noreferrer noopener"
          href={process.env.REACT_APP_ACCOUNT_APP_BUSINESS_LINK}
          className="dashboard_landing_page_common_button"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default SectionContent;
