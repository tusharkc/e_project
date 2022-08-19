import { DoctAutoComplete, DoctChip, DoctFileUpload } from '@doct-react/app';
import { DoctCol, DoctIconButton, DoctRow, DoctTypography } from '@doct-react/core';
import useFieldOptions from '../../../../../../hooks/useFieldOptions/useFieldOptions';
import TextEditor from '../../../../../../shared/form/TextEditor/TextEditor';

const AdditionalInfo = ({
  control,
  error,
  watch,
  minimumEducationArr,
  setMinimumEducationArr,
  setMinimumEducationIdArr,
  minimumEducationIdArr,
  uploadedBrochure,
  setUploadedBrochure,
}) => {
  const { optionsArray: minimumEducationOptions } = useFieldOptions({
    apiRoute: '/qualifications/names',
  });

  const watchMinmumEducation = watch('selectMinimumEducation');

  const addMinimumEducationToArr = () => {
    if (watchMinmumEducation && !minimumEducationArr?.includes(watchMinmumEducation)) {
      setMinimumEducationArr((prevState) => [...prevState, watchMinmumEducation]);
      setMinimumEducationIdArr((prevState) => [...prevState, watchMinmumEducation?.id]);
    }
  };

  const removeEducationFromArr = (educationToRemove) => {
    setMinimumEducationArr(
      minimumEducationArr?.filter((existingEducation) => existingEducation != educationToRemove),
    );
    setMinimumEducationIdArr(
      minimumEducationIdArr?.filter(
        (existingEducationId) => existingEducationId != educationToRemove?.id,
      ),
    );
  };

  return (
    <>
      <div className="input-column">
        <DoctTypography variant="subtitle2">Minimum Education (optional)</DoctTypography>

        <DoctRow>
          <DoctCol sm={11}>
            <DoctAutoComplete
              control={control}
              isErrors={error}
              id={'selectMinimumEducation'}
              name={'selectMinimumEducation'}
              label={'Select'}
              options={minimumEducationOptions}
            />
          </DoctCol>

          <DoctCol sm={1}>
            <DoctIconButton
              onButtonClickHandler={(e) => {
                e.preventDefault();
                addMinimumEducationToArr();
              }}
              icon="check"
              size="medium"
            />
          </DoctCol>

          {minimumEducationArr?.length > 0 &&
            minimumEducationArr?.map((education, i) => {
              return (
                <div key={i} className={`m-2`}>
                  <DoctChip
                    title={education?.label}
                    onCloseHandler={() => {
                      removeEducationFromArr(education);
                    }}
                  />
                </div>
              );
            })}
        </DoctRow>
      </div>

      <div className="input-column">
        <DoctTypography variant="subtitle2">Eligibility Criteria (optional)</DoctTypography>
        <TextEditor name="eligibility" placeholder="Define Criteria" control={control} />
      </div>

      <div className="input-column">
        <DoctTypography variant="subtitle2">Overview (optional)</DoctTypography>
        <TextEditor name="overview" placeholder="Course Overview" control={control} />
      </div>

      <div className="input-column">
        <DoctTypography variant="subtitle2">Admission Process (optional)</DoctTypography>
        <TextEditor name="admissionProcess" placeholder="Define Process" control={control} />
      </div>

      <div className="input-column">
        <DoctTypography variant="subtitle2">Upload Brochure (optional)</DoctTypography>
        <DoctFileUpload
          uploadTitle="You can upload course details brochure for download."
          uploadMaxFilesMessage="Upload document in PDF, JPEG, PNG formats up to 5 MB size."
          maxFiles={1}
          uploadedFiles={uploadedBrochure}
          setUploadedFiles={setUploadedBrochure}
          accept=".pdf, .jpg, .png"
        />
      </div>
    </>
  );
};

export default AdditionalInfo;
