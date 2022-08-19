import { DoctIcon, DoctTypography } from '@doct-react/core';
import React from 'react';

const ApplyingOptionsAccordian = ({
  optionHeading,
  optionSubtitle,
  child,
  id,
  selectedId,
  setSelectedId,
}) => {
  return (
    <div className="py-2 my-2 bg-white ">
      <div
        onClick={() => {
          setSelectedId(id);
          if (selectedId == id) {
            setSelectedId(null);
          }
        }}
        className="d-flex align-items-center justify-content-between px-2 border-radius cursor-pointer"
      >
        <div>
          <DoctTypography variant="textLabel1" fontWeight="medium" className="mx-0 my-1">
            {optionHeading}
          </DoctTypography>
          <DoctTypography variant="body3" fontWeight="medium" className="text-grey-600 mx-0 my-1">
            {optionSubtitle}
          </DoctTypography>
        </div>
        <DoctIcon name={`${id == selectedId ? 'up' : 'down'}`} width="30" fill="grey" />
      </div>
      {id == selectedId && <div className="bg-grey-100  mx-2 border-radius">{child}</div>}
    </div>
  );
};

export default ApplyingOptionsAccordian;
