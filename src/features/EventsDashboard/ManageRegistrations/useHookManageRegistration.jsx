import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EventStatus } from '../../../helper/enums/eventStatus';
import { useGetEventByIdQuery } from '../ManageEvents';
import { resetNotifyUserWithToaster } from './manageRegistration.slice';

function useHookEventStatus({ id }) {
  const { data } = useGetEventByIdQuery({ id });

  const { status, eventPaymentType } = data || {};

  const [activeEvent, setActiveEvent] = useState(false);

  useEffect(() => {
    if (!status) return;
    if (status == EventStatus.ACTIVE) {
      setActiveEvent(true);
    } else {
      setActiveEvent(false);
    }
  }, [status]);

  return { activeEvent, eventPaymentType, status };
}

function useTosterEffect({ isError, isSuccess, isUpdating, onSucess }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      dispatch(
        resetNotifyUserWithToaster({
          variant: 'danger',
          message: 'Oops! something went wrong',
        }),
      );
      return;
    }

    if (isSuccess) {
      dispatch(
        resetNotifyUserWithToaster({
          variant: 'positive',
          message: 'Billing Details updated successfully!',
        }),
      );

      onSucess();

      return;
    }
  }, [isUpdating]);
}

export { useHookEventStatus, useTosterEffect };
