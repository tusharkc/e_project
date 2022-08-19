import { DoctChip } from '@doct-react/app';
import { DoctContainer, DoctTypography } from '@doct-react/core';
import React from 'react';
import useFindQualificationNames from '../utils/findQualificationNames';

const JobDetail = ({ jobPreviewDetail = {} }) => {
  const {
    description,
    industry,
    qualificationIds,
    keySkills,
    benefits,
    organizationContactAndAddressDetails,
    aboutOrganization,
  } = jobPreviewDetail;
  const { findQualificationNames } = useFindQualificationNames();

  return (
    <>
      <div className="my-3">
        <DoctContainer>
          <div className="bg-white border-radius">
            <div className="p-3">
              {description && (
                <>
                  <DoctTypography variant="subtitle1">Description</DoctTypography>
                  <DoctTypography variant="body2">
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  </DoctTypography>
                </>
              )}

              {industry && (
                <div className="d-flex align-items-center">
                  <DoctTypography variant="textLabel1" className="text-grey-600">
                    Industry
                  </DoctTypography>
                  <DoctTypography variant="textLabel1" className="mx-3">
                    {industry?.replace(/([A-Z])/g, ' $1').trim()}
                  </DoctTypography>
                </div>
              )}

              {qualificationIds?.length > 0 && (
                <div className="my-5">
                  <DoctTypography variant="subtitle1">Preferred Education</DoctTypography>
                  <DoctTypography variant="textLabel1">
                    <>
                      {qualificationIds?.map((qualificationId, i) => (
                        <span key={i}>
                          &nbsp; {findQualificationNames(qualificationId)}
                          {qualificationIds?.length - 1 != i && ','}
                        </span>
                      ))}
                    </>
                  </DoctTypography>
                </div>
              )}

              {keySkills?.length > 0 && (
                <div className="my-5">
                  <DoctTypography variant="subtitle1">Key Skills</DoctTypography>
                  {keySkills?.map((skill, i) => (
                    <span key={i} className="mx-1">
                      <DoctChip title={skill} showCloseIcon={false} />
                    </span>
                  ))}
                </div>
              )}
              {benefits && (
                <>
                  <DoctTypography variant="subtitle1">Benefits</DoctTypography>
                  <DoctTypography variant="body2">
                    <div dangerouslySetInnerHTML={{ __html: benefits }} />
                  </DoctTypography>
                </>
              )}
            </div>
          </div>
        </DoctContainer>
      </div>

      {aboutOrganization || organizationContactAndAddressDetails ? (
        <div className="my-3">
          <DoctContainer>
            <div className="bg-white border-radius">
              <div className="p-3">
                {aboutOrganization && (
                  <>
                    <DoctTypography variant="subtitle1">About Organisation</DoctTypography>
                    <DoctTypography variant="body2" className="text-grey-600">
                      <div dangerouslySetInnerHTML={{ __html: aboutOrganization }} />
                    </DoctTypography>
                  </>
                )}

                {organizationContactAndAddressDetails && (
                  <>
                    <DoctTypography variant="subtitle1">Contact Info</DoctTypography>
                    <DoctTypography variant="body2" className="text-grey-600">
                      <div
                        dangerouslySetInnerHTML={{ __html: organizationContactAndAddressDetails }}
                      />
                    </DoctTypography>
                  </>
                )}
              </div>
            </div>
          </DoctContainer>
        </div>
      ) : null}
    </>
  );
};

export default JobDetail;
