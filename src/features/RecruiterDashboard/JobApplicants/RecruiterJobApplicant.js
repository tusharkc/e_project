import React, { useEffect, useState } from 'react';
import useQueryHooks from '../../../hooks/useQueryHooks';
import OnNoJobAdded from '../JobListing/components/OnNoJobAdded';
import { useGetJobsQuery } from '../JobListing/services/jobs.services';
import JobCustomTableMain from './components/JobCustomTable/JobCustomTableMainSection/JobCustomTableMain';
import JobCustomTableTop from './components/JobCustomTable/JobCustomTableTop';
import './components/JobCustomTableStyles.scss';
import OnNoApplicant from './components/OnNoApplicant';
import { useGetApplicantsQuery } from './service/recruiterApplicants.service';

const RecruiterJobApplicant = () => {
  const { data } = useGetJobsQuery({});
  const { id, ...query } = useQueryHooks(); // reading code from query

  const [jobIdVal, setJobIdVal] = useState();
  const [value, setValue] = useState(0);

  const { data: jobApplicantData } = useGetApplicantsQuery({
    jobId: jobIdVal || data?.tenantJobs[0]?.id,
    searchText: query?.searchText,
  });

  const { data: reviewedJobApplicantData } = useGetApplicantsQuery({
    jobId: jobIdVal || data?.tenantJobs[0]?.id,
    status: 'Reviewed',
  });

  const { data: unreadJobApplicantData } = useGetApplicantsQuery({
    jobId: jobIdVal || data?.tenantJobs[0]?.id,
    status: 'UnRead',
  });

  const { data: shortlistedJobApplicantData } = useGetApplicantsQuery({
    jobId: jobIdVal || data?.tenantJobs[0]?.id,
    status: 'Shortlisted',
  });

  const { data: rejectedJobApplicantData } = useGetApplicantsQuery({
    jobId: jobIdVal || data?.tenantJobs[0]?.id,
    status: 'Rejected',
  });

  const { data: savedJobApplicantData } = useGetApplicantsQuery({
    jobId: jobIdVal || data?.tenantJobs[0]?.id,
    status: 'SavedForLater',
  });

  const [tenantJobs, setTenantJobs] = useState();

  useEffect(() => {
    setTenantJobs(data?.tenantJobs);
  }, [data]);

  return (
    <div>
      {data?.totalRecords > 0 ? (
        <>
          <JobCustomTableTop
            setValue={setValue}
            jobIdVal={jobIdVal}
            setJobIdVal={setJobIdVal}
            jobsData={tenantJobs}
          />
          {jobApplicantData && jobApplicantData?.totalRecords > 0 ? (
            <JobCustomTableMain
              value={value}
              setValue={setValue}
              selectedJobId={jobIdVal || data?.tenantJobs[0]?.id || query?.jobId}
              jobApplicantData={jobApplicantData}
              rejectedApplicantData={rejectedJobApplicantData}
              unreadApplicantData={unreadJobApplicantData}
              shortlistedApplicantData={shortlistedJobApplicantData}
              reviewedApplicantData={reviewedJobApplicantData}
              savedApplicantData={savedJobApplicantData}
            />
          ) : (
            <OnNoApplicant />
          )}
        </>
      ) : (
        <OnNoJobAdded />
      )}
    </div>
  );
};

export default RecruiterJobApplicant;
