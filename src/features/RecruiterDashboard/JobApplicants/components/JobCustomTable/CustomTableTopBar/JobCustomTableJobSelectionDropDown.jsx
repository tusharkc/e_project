import { DoctDropdownSelect } from '@doct-react/app';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DropDownMenuItem from './DropdownMenuItem';

const JobCustomTableJobSelectionDropDown = ({ jobsData, jobIdVal, setJobIdVal }) => {
  const [jobDataMenu, setJobDataMenu] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (jobsData) {
      jobsData?.map((jobData) => {
        setJobDataMenu((prevState) => [
          ...prevState,
          {
            title: <DropDownMenuItem {...jobData} />,
            value: jobData?.id,
          },
        ]);
      });
    }
  }, [jobsData]);

  return (
    <div className="dropdown-select dropdown-select-dashed">
      {jobsData?.length > 0 && (
        <>
          <DoctDropdownSelect
            value={jobIdVal || jobsData[0]?.id}
            handleChange={(e) => {
              setJobIdVal(e.target?.value);
              navigate({ search: `?jobId=${jobIdVal}` });
            }}
            menuItems={jobDataMenu}
          />
        </>
      )}
    </div>
  );
};

export default JobCustomTableJobSelectionDropDown;
