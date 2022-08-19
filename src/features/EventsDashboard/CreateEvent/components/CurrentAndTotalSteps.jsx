import React from 'react';

import { DoctTypography } from '@doct-react/core';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentStep, selectTotalSteps } from '../createEvent.slice';

function CurrentAndTotalSteps({ mrAuto = true }) {
  const totalSteps = useSelector(selectTotalSteps);
  const currentStep = useSelector(selectCurrentStep);

  return (
    <DoctTypography variant="body1" className={`text-grey-600 my-0 ${mrAuto ? 'mr-auto' : ''}`}>
      {currentStep}/{totalSteps}
    </DoctTypography>
  );
}

export default React.memo(CurrentAndTotalSteps);
