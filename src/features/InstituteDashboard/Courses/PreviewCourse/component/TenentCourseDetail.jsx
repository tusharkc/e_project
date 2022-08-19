import { DoctChip } from '@doct-react/app';
import { DoctContainer, DoctTypography } from '@doct-react/core';
import React from 'react';
import useFieldOptions from '../../../../../hooks/useFieldOptions/useFieldOptions';

export const TenentCourseDetail = ({ courseDetails = {} }) => {
  const { optionsArray: minimumEducation } = useFieldOptions({
    apiRoute: '/qualifications/names',
  });
  const {
    admissionProcess,
    eligibility,
    overview,
    intakes,
    fees,
    stipend,
    accomodation,
    scholarship,
    faculties,
    qualificationIds,
  } = courseDetails || {};

  return (
    <div className="my-3">
      <DoctContainer>
        <div className="bg-white border-radius">
          <div className="p-3">
            <DoctTypography variant="subtitle1" fontWeight="medium">
              Overview
            </DoctTypography>
            {overview ? (
              <DoctTypography variant="body2" className="text-grey-800">
                <div dangerouslySetInnerHTML={{ __html: overview }} />
              </DoctTypography>
            ) : (
              '-'
            )}
            <div className="line-divider bg-grey-100 border-radius" />
            <div className="my-3">
              <DoctTypography variant="subtitle1" fontWeight="medium" className="text-success">
                Admission Intake
              </DoctTypography>
              {intakes?.length
                ? intakes?.map((intake, i) => (
                    <span key={i} className={`${i > 0 && 'mx-2'}`}>
                      <DoctChip title={intake} showCloseIcon={false} />
                    </span>
                  ))
                : '-'}
            </div>
            <div className="bg-grey-100 border-radius d-flex align-items-center justify-content-between py-3 px-4 course_preview_key_features">
              <DoctTypography variant="textLabel2">
                <span className="text-grey-400">
                  Fee (INR) : <br />
                </span>
                {fees || '-'}
              </DoctTypography>

              <DoctTypography variant="textLabel2">
                <span className="text-grey-400">
                  Stipend (INR): <br />
                </span>
                {stipend || '-'}
              </DoctTypography>

              <DoctTypography variant="textLabel2">
                <span className="text-grey-400">
                  Accomodation: <br />
                </span>
                {accomodation || '-'}
              </DoctTypography>

              <DoctTypography variant="textLabel2">
                <span className="text-grey-400">
                  Scholarship: <br />
                </span>
                {scholarship || '-'}
              </DoctTypography>
            </div>
            <div className="my-3">
              <DoctTypography variant="subtitle1" fontWeight="medium">
                Faculty
              </DoctTypography>
              {faculties?.length > 0
                ? faculties?.map((faculties, i) => (
                    <span key={i} className={`${i > 0 && 'mx-2'}`}>
                      <DoctChip title={faculties} showCloseIcon={false} />
                    </span>
                  ))
                : '-'}
            </div>

            <div className="my-5">
              <div className="line-divider bg-grey-100 border-radius" />
              <DoctTypography variant="subtitle1" fontWeight="medium">
                Eligibility
              </DoctTypography>
              {eligibility ? (
                <DoctTypography variant="body2" className="text-grey-800">
                  <div dangerouslySetInnerHTML={{ __html: eligibility }} />
                </DoctTypography>
              ) : (
                '-'
              )}
            </div>
            <div className="my-5">
              <div className="line-divider bg-grey-100 border-radius" />
              <DoctTypography variant="subtitle1" fontWeight="medium">
                Minimum Education
              </DoctTypography>
              {qualificationIds?.length
                ? qualificationIds?.map((qualificationId, i) =>
                    minimumEducation
                      .filter((qualification) => {
                        return qualificationId == qualification?.id?.toString();
                      })
                      .map((foundQualification) => (
                        <span key={i} className={`${i > 0 && 'mx-2'}`}>
                          <DoctChip title={foundQualification?.label} showCloseIcon={false} />
                        </span>
                      )),
                  )
                : '-'}
            </div>

            <div className="my-5">
              <div className="line-divider bg-grey-100 border-radius" />
              <DoctTypography variant="subtitle1" fontWeight="medium" className="text-info">
                Admission Process:
              </DoctTypography>
              {admissionProcess ? (
                <DoctTypography variant="body2" className="text-grey-800">
                  <div dangerouslySetInnerHTML={{ __html: admissionProcess }} />
                </DoctTypography>
              ) : (
                '-'
              )}
            </div>
          </div>
        </div>
      </DoctContainer>
    </div>
  );
};
