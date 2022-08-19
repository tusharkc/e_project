import { DoctTabWrapper, DoctTabContent } from '@doct-react/app';
import LayoutLoading from '../../../layout/Layout.loading';
import CardEvent from './components/Card.Event';
import { useState } from 'react';
import { EventStatus } from '../../../helper/enums/eventStatus';
import { useGetEventsQuery } from './services/events.services';
import NoDataFound from '../../../shared/ui/NoDataFound';
import usePrepareEventTabList from './hooks/usePrepareTab';

import './Events.scss';

function ListingOfCard({ isLoading, events }) {
  return (
    <LayoutLoading isLoading={isLoading}>
      <>
        {!events?.length && !isLoading && <NoDataFound />}
        {events?.map(({ endDate, name, status, type, startDate, id, code, image }) => {
          return (
            <CardEvent
              key={name}
              type={type}
              status={status}
              name={name}
              startDate={startDate}
              endDate={endDate}
              image={{ coverImageUrl: image.coverImageUrl ? image.coverImageUrl : '' }}
              id={id}
              code={code}
            />
          );
        })}
      </>
    </LayoutLoading>
  );
}

export default function MangeEvents() {
  const { data, isLoading } = useGetEventsQuery('');
  const { data: dataActive } = useGetEventsQuery({ status: EventStatus.ACTIVE });
  const { data: dataClosed } = useGetEventsQuery({ status: EventStatus.CLOSED });
  const { data: dataDraft } = useGetEventsQuery({ status: EventStatus.DRAFT });
  const { data: dataCompleted } = useGetEventsQuery({
    status: EventStatus.COMPLETED,
  });
  const { data: dataActivationRequested } = useGetEventsQuery({
    status: EventStatus.ACTIVATIONREQUESTED,
  });

  const { events } = data || {};
  const { events: eventActive } = dataActive || {};
  const { events: eventDraft } = dataDraft || {};
  const { events: eventClosed } = dataClosed || {};
  const { events: eventCompleted } = dataCompleted || {};
  const { events: eventActivationRequested } = dataActivationRequested || {};

  const [value, setValue] = useState(0);

  const tabOptionsArray = usePrepareEventTabList();

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <DoctTabWrapper
        value={value}
        handleChange={handleChange}
        tabOptions={tabOptionsArray}
        indicatorColor="primary"
      />
      <div className="mt-4"></div>
      {value == 0 && (
        <DoctTabContent value={value} index={0}>
          <div className="manage_page__card_grid mx-auto">
            <ListingOfCard events={events} isLoading={isLoading} />
          </div>
        </DoctTabContent>
      )}
      {value == 1 && (
        <DoctTabContent value={value} index={1}>
          <div className="manage_page__card_grid mx-auto">
            <ListingOfCard events={eventActive} isLoading={isLoading} />
          </div>
        </DoctTabContent>
      )}
      {value == 2 && (
        <DoctTabContent value={value} index={2}>
          <div className="manage_page__card_grid mx-auto">
            <ListingOfCard events={eventClosed} isLoading={isLoading} />
          </div>
        </DoctTabContent>
      )}
      {value == 3 && (
        <DoctTabContent value={value} index={3}>
          <div className="manage_page__card_grid mx-auto">
            <ListingOfCard events={eventDraft} isLoading={isLoading} />
          </div>
        </DoctTabContent>
      )}
      {value == 4 && (
        <DoctTabContent value={value} index={4}>
          <div className="manage_page__card_grid mx-auto">
            <ListingOfCard events={eventCompleted} isLoading={isLoading} />
          </div>
        </DoctTabContent>
      )}
      {value == 5 && (
        <DoctTabContent value={value} index={5}>
          <div className="manage_page__card_grid mx-auto">
            <ListingOfCard events={eventActivationRequested} isLoading={isLoading} />
          </div>
        </DoctTabContent>
      )}
    </>
  );
}
