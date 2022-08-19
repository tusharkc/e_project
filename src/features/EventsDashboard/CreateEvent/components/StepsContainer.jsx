import { DoctCol, DoctContainer, DoctRow } from '@doct-react/core';
import { useCallback } from 'react';
import VerticalSteps from './VerticalSteps';

export default function StepsContainer({ currentStep, steps = [] }) {
  const stepsList = useCallback(() => {
    const prepareStepsName = steps.reduce((prev, current) => {
      const array = [...prev];
      let obj = {};
      obj = { label: current.label, icon: current.icon, index: current.index };
      array.push(obj);
      return array;
    }, []);

    return prepareStepsName;
  }, [steps?.length]);

  return (
    <DoctContainer>
      <DoctRow>
        <DoctCol xs={3}>
          <div className="steps-vertical-list-container">
            <VerticalSteps stepsList={stepsList()} currentStep={currentStep} />
          </div>
        </DoctCol>
        <DoctCol xs={9} className="mb-5">
          {steps[currentStep - 1].component}
        </DoctCol>
      </DoctRow>
    </DoctContainer>
  );
}

// export default React.memo(StepsContainer);
