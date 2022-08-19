import React from 'react';
import JobCustomTableJobSelectionDropDown from './CustomTableTopBar/JobCustomTableJobSelectionDropDown';
import SearchBar from './SearchBar';

const JobCustomTableTop = ({ jobsData, jobIdVal, setJobIdVal, setValue }) => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <JobCustomTableJobSelectionDropDown
          jobIdVal={jobIdVal}
          setJobIdVal={setJobIdVal}
          jobsData={jobsData}
        />
        <SearchBar setValue={setValue} />
      </div>
    </div>
  );
};

export default JobCustomTableTop;
