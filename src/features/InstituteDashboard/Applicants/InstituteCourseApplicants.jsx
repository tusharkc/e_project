import { DoctActionMenu } from '@doct-react/app';
import React, { useEffect, useState } from 'react';
import CustomTable from '../../../shared/ui/CustomTable/CustomTable';
import { courseApplicantTableColumn } from './components/data/tableColumn.courseApplicants';
import ApplicantCollpsable from './components/ApplicantCollpsable';
import useQueryHooks from '../../../hooks/useQueryHooks';
import { useGetCoursesQuery } from '../Courses/services/course.service';
import { useGetApplicantDataQuery } from './services/courseApplicant.services';
import OnNoCourseAdded from '../Courses/components/OnNoCourseAdded/OnNoCourseAdded';
import NoApplicantStage from './components/noApplicantsState/NoApplicantState';

const InstituteCourseApplicants = () => {
  const { data: allCourseData, isFetching: tenetCoursesFething } = useGetCoursesQuery({});
  const [dropdownMenuDefaultSelectedItem, setDropdownMenuDefaultSelectedItem] = useState();
  const { id, ...query } = useQueryHooks(); // reading id from query

  const {
    data: allApplicantData,
    isLoading,
    isFetching,
  } = useGetApplicantDataQuery({
    id: id || dropdownMenuDefaultSelectedItem?.id,
    searchText: query?.searchText,
  });
  const [selectedItemId, setSelectedItemId] = useState(0);
  const { tenantCourse } = allCourseData || {};
  const [dropDownMenuItemsArray, setDropDownMenuItemsArray] = useState([]);
  const [applicantTableRowData, setApplicantTableRowData] = useState();

  useEffect(() => {
    if (id) {
      setDropdownMenuDefaultSelectedItem(dropDownMenuItemsArray.find((course) => course?.id == id));
    } else {
      setDropdownMenuDefaultSelectedItem(dropDownMenuItemsArray[0] || {});
    }
  }, [id, dropDownMenuItemsArray]);

  useEffect(() => {
    const dropDownMenuItemsArrayFromApi = [];

    tenantCourse?.map((course) => {
      dropDownMenuItemsArrayFromApi?.push({
        title: course.courseTitle.name,
        id: course.id,
        value: course.id,
      });
    });

    setDropDownMenuItemsArray(dropDownMenuItemsArrayFromApi);
  }, [tenantCourse]);

  useEffect(() => {
    setApplicantTableRowData(allApplicantData?.courseApplicant);
  }, [allApplicantData]);

  const ActionMenu = ({ column, index, setTargetedRowIndex }) => {
    return (
      <DoctActionMenu
        btnType="inverse"
        options={[
          {
            title: 'View Applicant Detail',
          },
        ]}
        onClick={(item) => {
          if (item.title == 'View Applicant Detail') {
            setSelectedItemId(column?.id);
            setTargetedRowIndex(index);
          }
        }}
        className="custom-tabel-row-action-menu"
      />
    );
  };

  return (
    <>
      {!isFetching ? (
        <CustomTable
          column={courseApplicantTableColumn}
          tableRowData={applicantTableRowData || {}}
          tableCollapsible={ApplicantCollpsable}
          dropdownMenuItems={dropDownMenuItemsArray}
          dropdownMenuDefaultSelected={dropdownMenuDefaultSelectedItem?.value || {}}
          searchPlaceholder={'Applicant name, Location, Education'}
          resultCount={allApplicantData?.totalRecords}
          actionMenu={ActionMenu}
          contentLoading={isLoading}
          searchOptions={[]}
          onSearchChangeHandler={() => {}}
          onSearchInputChangeHandler={() => {}}
          setSelectedItemId={setSelectedItemId}
          countHeading="APPLICANTS"
          onNoDataFound={<NoApplicantStage />}
          showFilterIcon={false}
        />
      ) : !tenetCoursesFething && !allCourseData.totalRecords > 0 ? (
        <div className="my-5">
          <OnNoCourseAdded />
        </div>
      ) : null}
    </>
  );
};

export default InstituteCourseApplicants;
