import React from 'react';
import SchedulePresenterCard from '../Components/Speakers/SpeakerPresenterCard';
import { SchedulePresenterData } from '../Components/SchedulePresenterData';
import { DoctButton, DoctCol, DoctRow, DoctIcon, DoctTypography } from '@doct-react/core';
const ScheduleSection = () => {
  return (
    <div>
      <div className="speaker_presenter_section_second bg-grey-100 border-radius mt-3">
        <DoctTypography variant="h6" className="text-grey-800 px-3 pt-3 mb-3">
          Speakers/ Presenters
        </DoctTypography>
        <DoctTypography variant="textLabel2" className="text-grey-400 px-3 mt-sm-n3">
          3 speakers
        </DoctTypography>
        <DoctButton
          type="primary"
          variant="text"
          icon="plus"
          text="Add Speaker"
          className="mt-n3 mx-sm-n2"
          //   onButtonClickHandler={() => {
          //     setActiveStep(0);
          //   }}
        />
        <div className="d-flex">
          {SchedulePresenterData.map((item, index) => {
            return (
              <div className="mx-auto" key={index}>
                <SchedulePresenterCard
                  image={item.image}
                  name={item.name}
                  designation={item.designation}
                />
              </div>
            );
          })}
        </div>{' '}
        <DoctTypography variant="body3" className="text-grey-400 px-3">
          This will be listed on Docthub event detail page in “Key Speakers” section.
        </DoctTypography>
      </div>
    </div>
  );
};

export default ScheduleSection;
