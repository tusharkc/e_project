import { DoctLoading, DoctModal } from '@doct-react/app';

import { memo } from 'react';

function ModalManageAttendees({ isOpen, setIsOpen, children, isLoading }) {
  return (
    <DoctModal
      iconName={''}
      primaryBtnText="Save"
      secondaryBtnText="Cancel"
      open={isOpen}
      handlePrimaryButtonClick={() => {
        setIsOpen(true);
      }}
      handleClose={() => {
        setIsOpen(false);
      }}
      title={'Edit Attendee Details'}
      width={360}
      className={`modal-content-position-relative disabled_modal_outside_click ${
        isLoading ? 'modal-loading' : ''
      }`}
    >
      <>
        {isLoading && (
          <div className="absolute-center loader-transparent-bg pointer-event-none inside-modal-loader">
            <DoctLoading />
          </div>
        )}

        {children}
      </>
    </DoctModal>
  );
}

export default memo(ModalManageAttendees);
