import { DoctIcon, DoctTypography } from '@doct-react/core';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import thunderIcon from '../../../../../../../assets/icons/thunder_outilne_icon.svg';
import EventPlaceholderImage from '../../../../../../../assets/images/event-placeholder.png';

const PreviewPublishCard = ({
  image,
  eventstype,
  specialities,
  eventname,
  location,
  date,
  eventsby,
  views,
  interested,
  regstatus,
}) => {
  return (
    <div className="mt-5">
      <div className="event-card-image-wrapper border-radius-tl border-radius-tr overflow-hidden">
        <img
          src={image || EventPlaceholderImage}
          alt="preview-publish-image"
          className="w-100 h-100 object-fit-cover"
        />
      </div>
      <div className="event_card_preview_section box-shadow px-3 py-2 mt-sm-n3 bg-white border-radius">
        <div className="d-inline-flex mt-3">
          <DoctTypography variant="subtitle3" className="text-grey-600 mr-1">
            {eventstype} &gt;
          </DoctTypography>

          <Tooltip title={specialities.length > 1 ? specialities.join(', ') : ''} placement="top">
            <span className="tooltip-wrapper d-flex align-items-center">
              {specialities && (
                <DoctTypography
                  variant="overline"
                  fontWeight="regular"
                  textTransform="normal"
                  className="text-grey-600 event-card-tag d-inline-block"
                >
                  {specialities[0]}
                </DoctTypography>
              )}
              {specialities && specialities.length > 1 && (
                <DoctTypography
                  variant="overline"
                  fontWeight="regular"
                  textTransform="normal"
                  className="text-grey-600 event-card-tag d-inline-block mb-0"
                >
                  , +{specialities.length - 1}
                </DoctTypography>
              )}
            </span>
          </Tooltip>
        </div>
        <DoctTypography variant="subtitle1" className="mt-sm-n2 mb-3 text-grey-800">
          {eventname}
        </DoctTypography>
        <DoctTypography variant="textLabel2" className="mt-sm-n3 text-grey-600">
          {location}
        </DoctTypography>
        <div className="d-flex mt-sm-n2">
          <DoctIcon name="calendar" height="18" width="18" fill="#00A0C0" />
          <DoctTypography variant="textLabel1" className="mt-sm-auto text-primary ml-2">
            {date}
          </DoctTypography>
        </div>
        <DoctTypography variant="textLabel2" className="mt-sm-n2 text-grey-600">
          {eventsby}
        </DoctTypography>
        <DoctTypography variant="textLabel2" className="text-grey-600">
          {views}
        </DoctTypography>
        <div className="d-flex mt-sm-n3">
          <img src={thunderIcon} alt="thunderIcon" />
          <DoctTypography variant="textLabel2" className="text-grey-800 ml-2">
            {regstatus}
          </DoctTypography>
        </div>
      </div>
    </div>
  );
};

export default PreviewPublishCard;
