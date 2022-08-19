import { DoctTabContent, DoctTabWrapper } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React, { useState } from 'react';
import usePrepareRecruiterApplicantTabList from '../../../../hooks/usePrepareApplicantStatus';
import JobApplicantListingRow from './JobApplicantListingRow';
import { useGetApplicantsQuery } from '../../../service/recruiterApplicants.service';

const JobCustomTableMain = ({
  selectedJobId,
  jobApplicantData,
  reviewedApplicantData,
  unreadApplicantData,
  shortlistedApplicantData,
  rejectedApplicantData,
  savedApplicantData,
  setValue,
  value = 0,
}) => {
  const tabOptionsArray = usePrepareRecruiterApplicantTabList();
  const [selectedId, setSelectedId] = useState();

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <DoctTabWrapper value={value} handleChange={handleChange} tabOptions={tabOptionsArray} />
      <DoctTabContent value={value} index={0}>
        <DoctTypography variant="textLabel2" className="text-grey-600">
          {jobApplicantData?.totalRecords} APPLICANTS
        </DoctTypography>
        {jobApplicantData?.jobApplicants?.map((applicantData, i) => (
          <>
            <JobApplicantListingRow
              jobId={selectedJobId}
              id={i}
              tableRowData={applicantData}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
              key={i}
            />
          </>
        ))}
      </DoctTabContent>

      <DoctTabContent value={value} index={1}>
        <DoctTypography variant="textLabel2" className="text-grey-600">
          {reviewedApplicantData?.totalRecords} APPLICANTS
        </DoctTypography>
        {reviewedApplicantData?.jobApplicants?.map((applicantData, i) => (
          <>
            <JobApplicantListingRow
              jobId={selectedJobId}
              id={i}
              tableRowData={applicantData}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
              key={i}
            />
          </>
        ))}
      </DoctTabContent>

      <DoctTabContent value={value} index={2}>
        <DoctTypography variant="textLabel2" className="text-grey-600">
          {unreadApplicantData?.totalRecords} APPLICANTS
        </DoctTypography>
        {unreadApplicantData?.jobApplicants?.map((applicantData, i) => (
          <>
            <JobApplicantListingRow
              jobId={selectedJobId}
              id={i}
              tableRowData={applicantData}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
              key={i}
            />
          </>
        ))}
      </DoctTabContent>

      <DoctTabContent value={value} index={3}>
        <DoctTypography variant="textLabel2" className="text-grey-600">
          {shortlistedApplicantData?.totalRecords} APPLICANTS
        </DoctTypography>
        {shortlistedApplicantData?.jobApplicants?.map((applicantData, i) => (
          <>
            <JobApplicantListingRow
              jobId={selectedJobId}
              id={i}
              tableRowData={applicantData}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
              key={i}
            />
          </>
        ))}
      </DoctTabContent>

      <DoctTabContent value={value} index={4}>
        <DoctTypography variant="textLabel2" className="text-grey-600">
          {rejectedApplicantData?.totalRecords} APPLICANTS
        </DoctTypography>
        {rejectedApplicantData?.jobApplicants?.map((applicantData, i) => (
          <>
            <JobApplicantListingRow
              jobId={selectedJobId}
              id={i}
              tableRowData={applicantData}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
              key={i}
            />
          </>
        ))}
      </DoctTabContent>

      <DoctTabContent value={value} index={5}>
        <DoctTypography variant="textLabel2" className="text-grey-600">
          {savedApplicantData?.totalRecords} APPLICANTS
        </DoctTypography>
        {savedApplicantData?.jobApplicants?.map((applicantData, i) => (
          <>
            <JobApplicantListingRow
              jobId={selectedJobId}
              id={i}
              tableRowData={applicantData}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
              key={i}
            />
          </>
        ))}
      </DoctTabContent>
    </div>
  );
};

export default JobCustomTableMain;
