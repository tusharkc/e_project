import {
  DoctFreeSoloSearchInput,
  DoctPageLoading,
  DoctTabContent,
  DoctTabWrapper,
} from '@doct-react/app';
import { DoctIcon, DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import NoDataFound from '../../../shared/ui/NoDataFound';
import usePrepareRecruiterTabList from '../hooks/usePrepareRecruiterTabList';
import JobListingCard from './components/JobListingCard';
import OnNoJobAdded from './components/OnNoJobAdded';
import { useGetJobsQuery } from './services/jobs.services';
import './recruiterJobListing.styles.scss';

const RecruiterJobListing = () => {
  const tabOptionsArray = usePrepareRecruiterTabList();
  const [searchText, setSearchText] = useState();

  const { data: allJobsDataFromApi, isFetching: allJobsDataFromApiFetching } = useGetJobsQuery({
    searchText: searchText,
  });

  const { data: activeJobsDataFromApi, isFetching: activeJobsDataFromApiFetching } =
    useGetJobsQuery({
      status: 'Active',
    });

  const { data: underReviewJobsDataFromApi, isFetching: underReviewJobsDataFromApiFetching } =
    useGetJobsQuery({
      status: 'ActivationRequested',
    });

  const { data: closedJobsDataFromApi, isFetching: closedJobsDataFromApiFetching } =
    useGetJobsQuery({
      status: 'Closed',
    });

  const { data: draftJobsDataFromApi, isFetching: draftJobsDataFromApiFetching } = useGetJobsQuery({
    status: 'Draft',
  });

  const { data: rejectedJobsDataFromApi, isFetching: rejectedJobsDataFromApiFetching } =
    useGetJobsQuery({
      status: 'Rejected',
    });

  const [value, setValue] = useState(0);
  const [allJobsData, setAllJobsData] = useState();
  const [activeJobsData, setActiveJobsData] = useState();
  const [underReviewJobsData, setUnderReviewJobsData] = useState();
  const [closedJobsData, setClosedJobsData] = useState();
  const [draftJobsData, setDraftJobsData] = useState();
  const [rejectedJobsData, setRejectedJobsData] = useState();

  useEffect(() => {
    return setAllJobsData(allJobsDataFromApi?.tenantJobs);
  }, [allJobsDataFromApi]);

  useEffect(() => {
    return setActiveJobsData(activeJobsDataFromApi?.tenantJobs);
  }, [activeJobsDataFromApi]);

  useEffect(() => {
    return setUnderReviewJobsData(underReviewJobsDataFromApi?.tenantJobs);
  }, [underReviewJobsDataFromApi]);

  useEffect(() => {
    return setClosedJobsData(closedJobsDataFromApi?.tenantJobs);
  }, [closedJobsDataFromApi]);

  useEffect(() => {
    return setDraftJobsData(draftJobsDataFromApi?.tenantJobs);
  }, [draftJobsDataFromApi]);

  useEffect(() => {
    return setRejectedJobsData(rejectedJobsDataFromApi?.tenantJobs);
  }, [rejectedJobsDataFromApi]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <DoctFreeSoloSearchInput
        name="searchJobs"
        onInputChangeHandler={(val) => {
          setValue(0);
          setSearchText(val);
        }}
        placeholder="Job Title, City, State"
      />

      <DoctTabWrapper value={value} handleChange={handleChange} tabOptions={tabOptionsArray} />
      {!allJobsDataFromApiFetching ? (
        <DoctTabContent value={value} index={0}>
          <DoctTypography variant="textLabel2" className="text-grey-500">
            {allJobsDataFromApi?.totalRecords > 0 && `${allJobsDataFromApi?.totalRecords} COURSES`}
          </DoctTypography>
          {allJobsData?.length ? (
            allJobsData?.map((jobDetail, index) => {
              return <JobListingCard key={index} jobDetail={jobDetail} />;
            })
          ) : searchText && !allJobsData.length ? (
            <div className="text-grey-600 text-center my-5">
              <DoctTypography variant="body1" fontWeight="bold" className="my-2">
                No data found!
              </DoctTypography>
              <DoctTypography variant="body2" className="my-0 p-0">
                No courses found to show here.
              </DoctTypography>
            </div>
          ) : (
            <OnNoJobAdded />
          )}
        </DoctTabContent>
      ) : (
        <DoctPageLoading />
      )}

      {!activeJobsDataFromApiFetching ? (
        <DoctTabContent value={value} index={1}>
          <DoctTypography variant="textLabel2" className="text-grey-500">
            {activeJobsData?.totalRecords > 0 && `${activeJobsData?.totalRecords} COURSES`}
          </DoctTypography>

          {activeJobsData?.length ? (
            activeJobsData?.map((jobDetail, index) => {
              return <JobListingCard key={index} jobDetail={jobDetail} />;
            })
          ) : !activeJobsData?.length && allJobsDataFromApi?.totalRecords <= 0 ? (
            <OnNoJobAdded />
          ) : (
            <NoDataFound />
          )}
        </DoctTabContent>
      ) : (
        <DoctPageLoading />
      )}

      {!underReviewJobsDataFromApiFetching ? (
        <DoctTabContent value={value} index={2}>
          <DoctTypography variant="textLabel2" className="text-grey-500">
            {underReviewJobsData?.totalRecords > 0 &&
              `${underReviewJobsData?.totalRecords} COURSES`}
          </DoctTypography>

          {underReviewJobsData?.length ? (
            underReviewJobsData?.map((jobDetail, index) => {
              return <JobListingCard key={index} jobDetail={jobDetail} />;
            })
          ) : !underReviewJobsData?.length && allJobsDataFromApi?.totalRecords <= 0 ? (
            <OnNoJobAdded />
          ) : (
            <NoDataFound />
          )}
        </DoctTabContent>
      ) : (
        <DoctPageLoading />
      )}

      {!closedJobsDataFromApiFetching ? (
        <DoctTabContent value={value} index={3}>
          <DoctTypography
            variant="textLabel2"
            className="bg-grey-300 py-2 border-radius d-flex align-items-center"
            fontWeight="regular"
          >
            <DoctIcon name="infoOutline" width="15" className="mx-2 p-0" /> Closed job posts will
            stay here for 6 months, then deleted automatically.
          </DoctTypography>

          <DoctTypography variant="textLabel2" className="text-grey-500">
            {closedJobsData?.totalRecords > 0 && `${closedJobsData?.totalRecords} COURSES`}
          </DoctTypography>

          {closedJobsData?.length ? (
            closedJobsData?.map((jobDetail, index) => {
              return <JobListingCard key={index} jobDetail={jobDetail} />;
            })
          ) : !closedJobsData?.length && allJobsDataFromApi?.totalRecords <= 0 ? (
            <OnNoJobAdded />
          ) : (
            <NoDataFound />
          )}
        </DoctTabContent>
      ) : (
        <DoctPageLoading />
      )}

      {!draftJobsDataFromApiFetching ? (
        <DoctTabContent value={value} index={4}>
          <DoctTypography variant="textLabel2" className="text-grey-500">
            {draftJobsData?.totalRecords > 0 && `${draftJobsData?.totalRecords} COURSES`}
          </DoctTypography>

          {draftJobsData?.length ? (
            draftJobsData?.map((jobDetail, index) => {
              return <JobListingCard key={index} jobDetail={jobDetail} />;
            })
          ) : !draftJobsData?.length && allJobsDataFromApi?.totalRecords <= 0 ? (
            <OnNoJobAdded />
          ) : (
            <NoDataFound />
          )}
        </DoctTabContent>
      ) : (
        <DoctPageLoading />
      )}

      {!rejectedJobsDataFromApiFetching ? (
        <DoctTabContent value={value} index={5}>
          <DoctTypography
            variant="textLabel2"
            className="bg-grey-300 py-2 border-radius d-flex align-items-center"
            fontWeight="regular"
          >
            <DoctIcon name="infoOutline" width="15" className="mx-2 p-0" /> Rejected job posts will
            stay here for 1 month, then deleted automatically.
          </DoctTypography>

          <DoctTypography variant="textLabel2" className="text-grey-500">
            {rejectedJobsData?.totalRecords > 0 && `${rejectedJobsData?.totalRecords} COURSES`}
          </DoctTypography>

          {rejectedJobsData?.length ? (
            rejectedJobsData?.map((jobDetail, index) => {
              return <JobListingCard key={index} jobDetail={jobDetail} />;
            })
          ) : !rejectedJobsData?.length && allJobsDataFromApi?.totalRecords <= 0 ? (
            <OnNoJobAdded />
          ) : (
            <NoDataFound />
          )}
        </DoctTabContent>
      ) : (
        <DoctPageLoading />
      )}
    </>
  );
};

export default RecruiterJobListing;
