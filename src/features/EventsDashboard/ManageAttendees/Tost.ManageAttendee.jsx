import { useState } from 'react';
import { useEffect } from 'react';
import { memo } from 'react';
import { Tost } from '../../../shared';

function TostManageAttendee({ isError, isSuccess }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isError || isSuccess) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="position-fixed tost-container">
      <Tost
        variant={isSuccess ? 'positive' : 'danger'}
        text={isSuccess ? 'Record updated successfully!' : 'Oops! something went wrong'}
        onPressedClose={() => setShow(false)}
      />
    </div>
  );
}

export default memo(TostManageAttendee);
