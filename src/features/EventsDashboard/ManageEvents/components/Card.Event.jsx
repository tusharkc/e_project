import { DoctButton, DoctIcon, DoctTypography } from '@doct-react/core';

import EventIcon from '@material-ui/icons/Event';
import dayjs from 'dayjs';

import './Card.Event.scss';
import useEventCardStatus from '../hooks/useEventCardStatus';
import PropTypes from 'prop-types';

import EventPlaceholderImage from '../../../../assets/images/event-placeholder.png';
import { EventStatus } from '../../../../helper/enums/eventStatus';
import { useNavigate } from 'react-router-dom';

import { DASHBOARD, EVENTS } from '../../../../routes/constant';

function BadgeWithAction({ labelClass, labelTextColor, labelText }) {
  return (
    <span className={`${labelClass} manage_event_card_label position-relative`}>
      <DoctTypography
        variant="textLabel2"
        className={`${labelTextColor} font-weight-medium my-0 d-inline-flex align-items-center`}
      >
        {labelText} <DoctIcon width="16" height="16" name="down" className="" />
      </DoctTypography>
      <span className="position-absolute card_dropdown_menu flex-column">
        <span className="card_dropdown_menu-item w-100 cursor-pointer d-inline-flex">
          <DoctTypography variant="body2" className="my-0 text-capitalize">
            Active
          </DoctTypography>
          <DoctIcon width="20" height="20" name="check" className="text-grey-500 ml-auto" />
        </span>
        <span className="card_dropdown_menu-item w-100 cursor-pointer">
          <DoctTypography variant="body2" className="my-0 text-capitalize">
            Pause Online Registration
          </DoctTypography>
        </span>
      </span>
    </span>
  );
}
BadgeWithAction.propTypes = {
  labelClass: PropTypes.string,
  labelTextColor: PropTypes.string,
  labelText: PropTypes.string,
};

export default function CardEvent({
  type = 'Workshop',
  status,
  name,
  startDate,
  endDate,
  image: { coverImageUrl } = {},
  id,
  code,
}) {
  const {
    eventStatusData: {
      className,
      btnText,
      labelClass,
      labelTextColor,
      labelText,
      isButtonDisabled,
      btnVariant,
    },
  } = useEventCardStatus(status);

  const navigate = useNavigate();

  return (
    <div className={`manage_event_card white-paper overflow-hidden d-inline-block ${className}`}>
      <span className="manage_event_card__header bg-grey-100 w-100 d-inline-flex justify-content-between align-items-center px-12px py-2 text-uppercase">
        <DoctTypography variant="overline" className="text-grey-600">
          {type}
        </DoctTypography>
        {/* {status == EventStatus.ACTIVE && (
          <BadgeWithAction
            labelClass={labelClass}
            labelTextColor={labelTextColor}
            labelText={labelText}
          />
        )} */}
        {/* {status != EventStatus.ACTIVE && (
          <span className={labelClass}>
            <DoctTypography
              variant="textLabel2"
              className={`${labelTextColor} font-weight-medium my-0`}
            >
              {labelText}
            </DoctTypography>
          </span>
        )} */}
        <span className={labelClass}>
          <DoctTypography
            variant="textLabel2"
            className={`${labelTextColor} font-weight-medium my-0`}
          >
            {labelText}
          </DoctTypography>
        </span>
      </span>
      <DoctTypography
        variant="subtitle2"
        className="manage_event_card_title my-0 px-3 pt-12px pb-1"
      >
        {name}
      </DoctTypography>
      <p className="manage_event_card_date d-inline-flex align-items-center pb-12px px-12px mb-0 text-grey-600 mt-0">
        <EventIcon className="vertical-align-sub icon-18" />
        <DoctTypography variant="subtitle2" className="my-0 pl-1">
          {dayjs(startDate).format('DD MMM YYYY')} - {dayjs(endDate).format('DD MMM YYYY')}
        </DoctTypography>
      </p>
      <div className="manage_event_card-image-wrapper">
        <img src={coverImageUrl || EventPlaceholderImage} alt={name} />
      </div>
      <div className="line-divider bg-grey-200 mt-12px mx-3" />
      <DoctButton
        size="medium"
        variant="text"
        type={btnVariant}
        text={btnText}
        className="mx-auto"
        disabled={isButtonDisabled}
        onButtonClickHandler={() => {
          navigate(`/${DASHBOARD}/${EVENTS}/${id}/edit`);
        }}
      />
    </div>
  );
}

CardEvent.propTypes = {
  type: PropTypes.string,
  status: PropTypes.string,
  name: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  image: PropTypes.object,
};
