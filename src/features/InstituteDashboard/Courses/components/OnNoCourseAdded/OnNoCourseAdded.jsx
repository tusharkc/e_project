import { DoctButton, DoctTypography } from '@doct-react/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import noCourseAddedIllustration from '../../../../../assets/images/courses/no_course_added.svg';
import * as ROUTE from '../../../../../routes/constant';

const OnNoCourseAdded = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center text-grey-600 w-100">
      <img src={noCourseAddedIllustration} alt="no_course_added_yet" />
      <DoctTypography variant="body1" fontWeight="bold" className="my-2">
        List your first course!
      </DoctTypography>
      <DoctTypography variant="body2">
        Since you haven&apos;t listed a course yet, list a <br /> course now.
      </DoctTypography>

      <DoctButton
        onButtonClickHandler={() => {
          navigate(`/${ROUTE.DASHBOARD}/${ROUTE.INSTITIUTE}/${ROUTE.INSTITUTE_ADD_COURSE}`);
        }}
        text="List a Course"
        icon="plus"
        className="mx-auto"
        size="medium"
      />
    </div>
  );
};

export default OnNoCourseAdded;
