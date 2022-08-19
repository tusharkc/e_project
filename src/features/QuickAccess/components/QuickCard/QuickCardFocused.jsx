import { DoctIcon, DoctTypography } from '@doct-react/core';
import DefaultQuickCard from './DefaultQuickCard';
import EmptyStateCard from './EmptyStateCard';
import DefaultStateImage from '../../../../assets/images/create-event-placeholder.png';
import './QuickCard.scss';
import { useNavigate } from 'react-router-dom';

import EventsInqueryModal from './EventsInqueryModal';
import { useState } from 'react';
import { DASHBOARD } from '../../../../routes/constant';

function EventCardContent() {
  const navigate = useNavigate();
  const isTrue = true;
  const [openModal, setOpenModal] = useState(false);

  if (isTrue) {
    return (
      <>
        <EmptyStateCard
          icon={<img src={DefaultStateImage} />}
          title={'Create an Event Now!'}
          btnText={'Create Event'}
          disabled={false}
          onPressFunction={() => {
            navigate(`?events-dashboard`);
            setOpenModal(true);
          }}
        />

        <EventsInqueryModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleCloseBtn={() => {
            setOpenModal(false);
            navigate(`/${DASHBOARD}`);
          }}
        />
      </>
    );
  }

  return (
    <>
      <div className="bg-white px-3 pt-12px pb-12px border-radius">
        <p className="d-inline-flex my-0 w-100 align-items-center mb-2">
          <DoctTypography variant="overline" className="text-grey-600">
            WORKSHOP
          </DoctTypography>
          <DoctTypography
            variant="textLabel2"
            className="text-label text-label__success text-white my-0 ml-auto"
          >
            ACTIVE
          </DoctTypography>
        </p>
        <DoctTypography variant="textLabel2" className="my-0" fontWeight="medium">
          Certified Scrum Master (CSM) Workshop
        </DoctTypography>
        <DoctTypography
          variant="caption2"
          className="mb-3 mt-1 text-grey-600 d-inline-flex align-items-end"
        >
          <DoctIcon name="date" width="16" height="16" className="mr-1" />
          <span>11 Jul 2020 - 13 Jul 2020</span>
        </DoctTypography>
        <DoctTypography
          variant="textLabel2"
          className="info_label info_label_border_x border-radius my-0 d-inline-flex justify-content-between w-50 bg-grey-200"
        >
          <span>Attendees</span> <span>312</span>
        </DoctTypography>
        <DoctTypography
          variant="textLabel2"
          className="info_label info_label_border_x border-radius my-0 d-inline-flex justify-content-between w-50 bg-grey-200"
        >
          <span>Views</span> <span>2072</span>
        </DoctTypography>
      </div>
      <div className="line-divider-2px bg-grey-100"></div>
      <div className="bg-white h-100 border-radius">
        <div className="bg-semantic-info-01 box_border box_border_white h-100 border-radius pt-12px pb-12px px-3 d-flex flex-column">
          <DoctTypography variant="overline" className="text-grey-600 my-0">
            NEW
          </DoctTypography>
          <DoctTypography variant="h6" className="my-0 text-center mt-3 font-weight-regular">
            1 Draft
          </DoctTypography>
          <DoctTypography variant="textLabel2" className="text-grey-500 my-0 text-center mt-auto">
            Last updated on: 17 Sep 21
          </DoctTypography>
        </div>
      </div>
    </>
  );
}

export default function QuickCardFocused({ emptyStateBgClass }) {
  return (
    <>
      <DefaultQuickCard
        bgClass={emptyStateBgClass}
        title="Events"
        content={<EventCardContent />}
      ></DefaultQuickCard>
    </>
  );
}
