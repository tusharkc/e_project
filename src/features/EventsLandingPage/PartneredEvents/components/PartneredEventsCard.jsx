import React from 'react';

const PartneredEventsCard = ({
  image,
  venue,
  title,
  handler,
  location,
  specialities,
  state,
  organizername,
}) => {
  return (
    <>
      <div className="partnered_event_section my-4 mx-auto">
        <img src={image} className="partnered_event_images mx-3 mt-3" alt="events_image" />
        <div className="mx-3">
          <h6 className="events_type text-grey-500">
            {venue} &#62; {specialities}
          </h6>
          <h6 className="events_name font-weight-bold mt-1 my-0 py-0">{title}</h6>
          <p className="text-grey-500">by {organizername}</p>
          <p className="features_card_subtitle text-grey-600 mt-2">{handler}</p>
          <h6 className="organization_location">
            {state},{location}
          </h6>
        </div>
      </div>
    </>
  );
};

export default PartneredEventsCard;
