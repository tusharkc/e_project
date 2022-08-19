import UsingApplyNow from './options/UsingApplyNow';
import UsingInstituteWebsite from './options/UsingInstituteWebsite';
import UsingViewContactDetails from './options/UsingViewContactDetails';

import React from 'react';

const useGetOptionsData = ({ control, error, watch, setValue }) => {
  const optionsData = [
    {
      optionHeading: 'Using “Apply Now” button',
      optionSubtitle: 'Students can apply directly from course detail page through this button.',
      child: <UsingApplyNow control={control} errors={error} setValue={setValue} />,
    },

    {
      optionHeading: 'Apply from your “Institute Website”',
      optionSubtitle:
        'Get listed on Docthub Course Listing Platform & user will see "View Contact Details" for inquiry.',
      child: <UsingInstituteWebsite control={control} errors={error} />,
    },

    {
      optionHeading: 'Can “View Contact Details” to contact',
      optionSubtitle:
        'Get listed on Docthub Course Listing Platform & user will see "View Contact Details" for inquiry.',
      child: <UsingViewContactDetails control={control} errors={error} watch={watch} />,
    },
  ];

  return { optionsData };
};

export default useGetOptionsData;
