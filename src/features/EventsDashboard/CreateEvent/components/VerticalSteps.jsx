import { DoctTypography } from '@doct-react/core';
import React from 'react';

function VerticalSteps({ stepsList = [], currentStep }) {
  return (
    <ul className="bg-grey-100 pt-6px pb-6px border-radius box-shadow">
      {stepsList.map(({ label, index, icon }) => {
        const getClassName = () => {
          const indexOfStep = index;
          let defaultClass = 'steps-vertical-list-item panel-height-5x d-flex align-items-center ';

          if (indexOfStep > currentStep) return defaultClass;
          if (indexOfStep == currentStep) {
            defaultClass += 'steps-vertical-list-item-active';
            return defaultClass;
          }
          defaultClass += 'steps-vertical-list-item-completed';
          return defaultClass;
        };

        return (
          <li key={label} className={getClassName()}>
            <DoctTypography
              variant="subtitle2"
              className="steps-vertical-list-text my-0 d-inline-flex align-items-center"
            >
              <span className="steps-vertical-list-item-index-counter d-inline-flex justify-content-center align-items-center text-white mr-3 position-relative">
                {icon ? icon : index}
              </span>
              <span className="steps-vertical-list-text-content position-relative">{label}</span>
            </DoctTypography>
          </li>
        );
      })}
    </ul>
  );
}

export default React.memo(VerticalSteps);
