import { DoctCol, DoctIcon, DoctIconButton, DoctRow, DoctTypography } from '@doct-react/core';
import React from 'react';
import { calculateTotalExperience } from '../../../helper/calculateTotalExperience';

const JobApplicantCollapsibleEl = ({ tableCollapsibleDetailEl }) => {
  const {
    currentSalary,
    noticePeriod,
    educations = [],
    workExperiences = [],
  } = tableCollapsibleDetailEl;

  const today = new Date();

  const calculateExperienceForOrganization = (startYear) => {
    const totalTimeAtOrganization = { days: 0, months: 0, years: 0 };
    const difference = new Date(startYear).getTime() - today.getTime();

    totalTimeAtOrganization.days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return totalTimeAtOrganization;
  };

  return (
    <>
      <DoctRow>
        <DoctCol sm={4}>
          <div>
            <DoctIcon name="infoOutline" fill="grey" width="16" />

            <DoctTypography variant="textLabel2" className="text-grey-600">
              Total Experience: {calculateTotalExperience(workExperiences).years} years{' '}
              {calculateTotalExperience(workExperiences).months} months
            </DoctTypography>

            <DoctTypography variant="textLabel2" className="text-grey-600 m-0">
              Current Salary: {currentSalary} per month
            </DoctTypography>
            <DoctTypography variant="textLabel2" className="text-grey-600 m-0">
              Notice Period: {noticePeriod}
            </DoctTypography>
          </div>
        </DoctCol>
        <DoctCol sm={4}>
          <div className="collapsible_content_container px-3 h-100">
            <DoctIcon name="degreeCollegeOutline" fill="grey" width="16" height="16" />

            {educations?.map((education) => (
              <>
                <div className="my-3">
                  <DoctTypography variant="textLabel2" className="text-grey-600 my-1">
                    {education?.organization}
                  </DoctTypography>

                  <DoctTypography variant="textLabel2" className="text-grey-600 my-1">
                    {education?.degree}
                  </DoctTypography>
                  <DoctTypography variant="textLabel2" className="text-grey-600 m-0">
                    {education?.startYear} - {education?.endYear}
                  </DoctTypography>
                </div>
              </>
            ))}
          </div>
        </DoctCol>
        <DoctCol sm={4}>
          <div>
            <DoctIcon name="workOutline" fill="grey" width="16" />

            {workExperiences?.map((experience) => (
              <>
                <div className="my-3">
                  <DoctTypography variant="textLabel2" className="text-grey-600 my-1">
                    {experience?.company}
                  </DoctTypography>

                  <DoctTypography variant="textLabel2" className="text-grey-600 my-1">
                    {experience?.designation}
                  </DoctTypography>
                  <DoctTypography variant="textLabel2" className="text-grey-600 m-0">
                    {new Date(experience?.startDate).toLocaleString('en-us', {
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    —{' '}
                    {today.toLocaleString('en-us', {
                      month: 'short',
                      year: 'numeric',
                    }) ==
                    new Date(experience?.endDate).toLocaleString('en-us', {
                      month: 'short',
                      year: 'numeric',
                    })
                      ? 'Present'
                      : new Date(experience?.endDate).toLocaleString('en-us', {
                          month: 'short',
                          year: 'numeric',
                        })}
                    {today.toLocaleString('en-us', {
                      month: 'short',
                      year: 'numeric',
                    }) ==
                      new Date(experience?.startDate).toLocaleString('en-us', {
                        month: 'short',
                        year: 'numeric',
                      }) && ` | ${calculateExperienceForOrganization(experience?.startDate).days}`}
                  </DoctTypography>
                </div>
              </>
            ))}
          </div>
        </DoctCol>
      </DoctRow>

      <div className="text-right">
        <DoctIconButton variant="outlined" icon="up" />
      </div>
    </>
  );
};

export default JobApplicantCollapsibleEl;
