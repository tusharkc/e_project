import { DoctIcon } from '@doct-react/core';

import stepsName from './stepsName';

import { BasicInfo } from './BasicInfo';
import { Registration } from './Registration';
import { Tickets } from './Tickets';
import { ScheduleSpeakers } from './ScheduleSpeakers';
import { PaymentsInvoice } from './PaymentsInvoice';
import { SponsorsExhibitors } from './SponsorsExhibitors';
import { TermsPolicies } from './TermsPolicies';
import { PreviewPublish } from './PreviewPublish';

const createEventSteps = [
  {
    label: stepsName.basicInfo.label,
    component: <BasicInfo />,
    index: 1,
  },
  {
    label: stepsName.registration.label,
    component: <Registration />,
    index: 2,
  },
  {
    label: stepsName.tickets.label,
    component: <Tickets />,
    index: 3,
  },
  {
    label: stepsName.scheduleAndSpeakers.label,
    component: <ScheduleSpeakers />,
    index: 4,
  },
  {
    label: stepsName.paymentsAndInvoice.label,
    component: <PaymentsInvoice />,
    index: 5,
  },
  {
    label: stepsName.sponsorsAndExhibitors.label,
    component: <SponsorsExhibitors />,
    index: 6,
  },
  {
    label: stepsName.termsAndPolicies.label,
    component: <TermsPolicies />,
    index: 7,
  },
  {
    label: stepsName.previewAndPublish.label,
    component: <PreviewPublish />,
    icon: <DoctIcon width="16" height="16" name="check" />,
    index: 8,
  },
];

export default createEventSteps;
