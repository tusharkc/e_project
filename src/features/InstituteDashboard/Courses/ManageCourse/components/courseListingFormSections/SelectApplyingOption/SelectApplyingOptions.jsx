import { DoctTypography } from '@doct-react/core';
import React from 'react';
import ApplyingOptionsAccordian from './components/ApplyingOptionsAccordian';
import useGetOptionsData from './components/optionsData';

const SelectApplyingOptions = ({
  setCurrentApplyType,
  control,
  error,
  watch,
  activeApplyType,
  setValue,
}) => {
  const { optionsData } = useGetOptionsData({
    control: control,
    error: error,
    watch: watch,
    setValue: setValue,
  });

  return (
    <>
      <DoctTypography variant="subtitle1" className="text-grey-800">
        How you wants Applicants to Apply for this Course?
      </DoctTypography>

      {optionsData.map((option, i) => (
        <ApplyingOptionsAccordian
          key={i}
          optionSubtitle={option.optionSubtitle}
          id={i}
          setSelectedId={setCurrentApplyType}
          selectedId={activeApplyType}
          optionHeading={option.optionHeading}
          child={option.child}
        />
      ))}
    </>
  );
};

export default SelectApplyingOptions;
