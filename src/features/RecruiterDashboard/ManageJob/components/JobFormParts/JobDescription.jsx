import { DoctChip, DoctFreeSoloSearchInput, DoctTextField } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import React, { useEffect } from 'react';
import { TextEditor } from '../../../../../shared';

const JobDescription = ({ setKeySkillArray, keySkillArray, control, errors }) => {
  return (
    <>
      <DoctTypography variant="subtitle2">Overview</DoctTypography>
      <TextEditor
        control={control}
        errors={errors}
        name="description"
        placeholder="Describe here.."
      />
      <DoctTypography variant="subtitle2">Benefits (optional)</DoctTypography>
      <TextEditor control={control} errors={errors} name="benefits" placeholder="Describe here.." />
      <DoctTypography variant="subtitle2">Key Skills (optional)</DoctTypography>
      <DoctTypography variant="body2" className="text-grey-600">
        You can add multiple key skills related to this job post.
      </DoctTypography>

      <DoctFreeSoloSearchInput
        name="keySkills"
        id="keySkills"
        hideSearchIcon
        placeholder="Type and Enter"
        onChangeHandler={(val) => {
          !keySkillArray?.includes(val) && setKeySkillArray((prevState) => [...prevState, val]);
        }}
      />

      {keySkillArray?.length > 0 && (
        <>
          <div className="d-flex flex-sm-wrap">
            {keySkillArray?.map((skill, i) => (
              <div key={i} className="m-1">
                <DoctChip
                  title={skill}
                  onCloseHandler={() => {
                    setKeySkillArray(
                      keySkillArray?.filter((existingSkills) => existingSkills != skill),
                    );
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default JobDescription;
