import { DoctModal } from '@doct-react/app';
import React from 'react';
import { DoctTypography } from '@doct-react/core';
import eventsInquery from '../../../../assets/images/event_under_construction/events_inquery.svg';
const EventsInqueryModal = ({ openModal, handleCloseBtn }) => {
  return (
    <div className="events_under_construction_section d-flex justify-content-center align-items-center text-center ">
      <DoctModal
        showFooter={false}
        width={809}
        className="events_inqury_modal"
        title="_"
        open={openModal}
        iconName=""
        handleClose={handleCloseBtn}
      >
        <div className="text-center">
          <img src={eventsInquery} alt="event-inquery-modal" />
        </div>
        <div className="text-center">
          <DoctTypography variant="h4" className="mt-3">
            Hold on!
          </DoctTypography>
          <DoctTypography variant="h4" className="mt-3">
            We are glad you chose us!
          </DoctTypography>
          <DoctTypography variant="h6" className="mt-4">
            To create an event contact us at <br />
            <span className="text-primary"> events@docthub.com</span> or call us on{' '}
            <span className="text-primary"> (+91) 83208 76943.</span>
          </DoctTypography>
          <DoctTypography variant="h6" className="mt-4 mb-4">
            That&apos;s all! Once the event has been created, you&apos;ll be able to handle <br />{' '}
            and manage it from
            <span className="text-primary"> your dashboard.</span>
          </DoctTypography>
        </div>
      </DoctModal>
    </div>
  );
};

export default EventsInqueryModal;
