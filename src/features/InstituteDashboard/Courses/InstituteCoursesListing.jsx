import React, { useEffect, useState } from 'react';
import InstituteCoursesListingCard from './components/InstituteCoursesListingCard';
import usePrepareInstituteTabList from './hooks/usePrepareTabs';
import {
  DoctFreeSoloSearchInput,
  DoctPageLoading,
  DoctTabContent,
  DoctTabWrapper,
} from '@doct-react/app';
import { DoctIcon, DoctTypography } from '@doct-react/core';
import { useGetCoursesQuery } from './services/course.service';
import OnNoCourseAdded from './components/OnNoCourseAdded/OnNoCourseAdded';
import NoDataFound from '../../../shared/ui/NoDataFound';

const InstituteCoursesListing = () => {
  const tabOptionsArray = usePrepareInstituteTabList();

  const [searchText, setSearchText] = useState();

  const { data: allCourseDataFromApi, isFetching: allCourseDataFromApiFetching } =
    useGetCoursesQuery({ searchText: searchText });

  const { data: publishedCourseDataFromApi, isFetching: publishedCourseDataFromApiFetching } =
    useGetCoursesQuery({ status: 'Published' });
  const {
    data: pendingApprovalCourseDataFromApi,
    isFetching: pendingApprovalCourseDataFromApiFetching,
  } = useGetCoursesQuery({
    status: 'ActivationRequested',
  });
  const { data: draftCourseDataFromApi, isFetching: draftCourseDataFromApiFetching } =
    useGetCoursesQuery({
      status: 'Draft',
    });
  const { data: unPublishedCourseDataFromApi, isFetching: unPublishedCourseDataFromApiFetching } =
    useGetCoursesQuery({ status: 'UnPublished' });
  const { data: rejectedCourseDataFromApi, isFetching: rejectedCourseDataFromApiFetching } =
    useGetCoursesQuery({ status: 'Rejected' });

  const [value, setValue] = useState(0);
  const [allCoursesData, setAllCoursesData] = useState();
  const [draftCourseData, setDraftCourseData] = useState();
  const [publishedCourseData, setPublishedCourseData] = useState();
  const [unPublishedCourseData, setUnPublishedCourseData] = useState();
  const [pendingApprovalCourseData, setPendingApprovalCourseData] = useState();
  const [rejectedCourseData, setRejectedCourseData] = useState();

  useEffect(() => {
    setAllCoursesData(allCourseDataFromApi?.tenantCourse);
  }, [allCourseDataFromApi]);

  useEffect(() => {
    setDraftCourseData(draftCourseDataFromApi?.tenantCourse);
  }, [draftCourseDataFromApi]);

  useEffect(() => {
    setPublishedCourseData(publishedCourseDataFromApi?.tenantCourse);
  }, [publishedCourseDataFromApi]);

  useEffect(() => {
    setUnPublishedCourseData(unPublishedCourseDataFromApi?.tenantCourse);
  }, [unPublishedCourseDataFromApi]);

  useEffect(() => {
    setPendingApprovalCourseData(pendingApprovalCourseDataFromApi?.tenantCourse);
  }, [pendingApprovalCourseDataFromApi]);

  useEffect(() => {
    setRejectedCourseData(rejectedCourseDataFromApi?.tenantCourse);
  }, [rejectedCourseDataFromApi]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <DoctFreeSoloSearchInput
        name="searchCourses"
        onInputChangeHandler={(val) => {
          setValue(0);
          setSearchText(val);
        }}
        placeholder="Course Title, Course Type, Specialty"
      />

      <DoctTabWrapper value={value} handleChange={handleChange} tabOptions={tabOptionsArray} />

      {!allCourseDataFromApiFetching ? (
        <DoctTabContent value={value} index={0}>
          <DoctTypography variant="textLabel2" className="text-grey-500">
            {allCourseDataFromApi?.totalRecords > 0 &&
              `${allCourseDataFromApi?.totalRecords} COURSES`}
          </DoctTypography>
          {allCoursesData?.length ? (
            allCoursesData?.map((courseDetail, index) => {
              return <InstituteCoursesListingCard key={index} courseDetails={courseDetail} />;
            })
          ) : searchText && !allCoursesData.length ? (
            <div className="text-grey-600 text-center my-5">
              <DoctTypography variant="body1" fontWeight="bold" className="my-2">
                No data found!
              </DoctTypography>
              <DoctTypography variant="body2" className="my-0 p-0">
                No courses found to show here.
              </DoctTypography>
            </div>
          ) : (
            <OnNoCourseAdded />
          )}
        </DoctTabContent>
      ) : (
        <DoctPageLoading />
      )}

      {!publishedCourseDataFromApiFetching ? (
        <DoctTabContent value={value} index={1}>
          <DoctTypography variant="textLabel2" className="text-grey-500">
            {publishedCourseDataFromApi?.totalRecords > 0 &&
              `${publishedCourseDataFromApi?.totalRecords} COURSES`}
          </DoctTypography>

          {publishedCourseData?.length ? (
            publishedCourseData?.map((courseDetail, index) => {
              return <InstituteCoursesListingCard key={index} courseDetails={courseDetail} />;
            })
          ) : !allCoursesData?.length ? (
            <OnNoCourseAdded />
          ) : (
            <NoDataFound />
          )}
        </DoctTabContent>
      ) : (
        <DoctPageLoading />
      )}

      {!pendingApprovalCourseDataFromApiFetching ? (
        <DoctTabContent value={value} index={2}>
          <DoctTypography variant="textLabel2" className="text-grey-500">
            {pendingApprovalCourseDataFromApi?.totalRecords > 0 &&
              `${pendingApprovalCourseDataFromApi?.totalRecords} COURSES`}
          </DoctTypography>

          {pendingApprovalCourseData?.length ? (
            pendingApprovalCourseData?.map((courseDetail, index) => {
              return <InstituteCoursesListingCard key={index} courseDetails={courseDetail} />;
            })
          ) : !allCoursesData?.length ? (
            <OnNoCourseAdded />
          ) : (
            <NoDataFound />
          )}
        </DoctTabContent>
      ) : (
        <DoctPageLoading />
      )}

      {!draftCourseDataFromApiFetching ? (
        <DoctTabContent value={value} index={3}>
          <DoctTypography variant="textLabel2" className="text-grey-500">
            {draftCourseDataFromApi?.totalRecords > 0 &&
              `${draftCourseDataFromApi?.totalRecords} COURSES`}
          </DoctTypography>

          {draftCourseData?.length ? (
            draftCourseData?.map((courseDetail, index) => {
              return <InstituteCoursesListingCard key={index} courseDetails={courseDetail} />;
            })
          ) : !allCoursesData?.length ? (
            <OnNoCourseAdded />
          ) : (
            <NoDataFound />
          )}
        </DoctTabContent>
      ) : (
        <DoctPageLoading />
      )}

      {!unPublishedCourseDataFromApiFetching ? (
        <DoctTabContent value={value} index={4}>
          <DoctTypography variant="textLabel2" className="text-grey-500">
            {unPublishedCourseDataFromApi?.totalRecords > 0 &&
              `${unPublishedCourseDataFromApi?.totalRecords} COURSES`}
          </DoctTypography>

          {unPublishedCourseData?.length ? (
            unPublishedCourseData?.map((courseDetail, index) => {
              return <InstituteCoursesListingCard key={index} courseDetails={courseDetail} />;
            })
          ) : !allCoursesData?.length ? (
            <OnNoCourseAdded />
          ) : (
            <NoDataFound />
          )}
        </DoctTabContent>
      ) : (
        <DoctPageLoading />
      )}

      {!rejectedCourseDataFromApiFetching ? (
        <DoctTabContent value={value} index={5}>
          {rejectedCourseDataFromApi?.totalRecords > 0 && (
            <DoctTypography
              variant="textLabel2"
              className="bg-grey-300 py-2 border-radius d-flex align-items-center"
              fontWeight="regular"
            >
              <DoctIcon name="infoOutline" width="15" className="mx-2 p-0" /> Rejected courses will
              stay here for 30 days, then deleted automatically.
            </DoctTypography>
          )}
          <DoctTypography variant="textLabel2" className="text-grey-500">
            {rejectedCourseDataFromApi?.totalRecords > 0 &&
              `${rejectedCourseDataFromApi?.totalRecords} COURSES`}
          </DoctTypography>

          {rejectedCourseData?.length ? (
            rejectedCourseData?.map((courseDetail, index) => {
              return <InstituteCoursesListingCard key={index} courseDetails={courseDetail} />;
            })
          ) : !allCoursesData?.length ? (
            <OnNoCourseAdded />
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

export default InstituteCoursesListing;
