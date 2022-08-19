import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnterpriseFormLayout } from '../../../../layout';
import CloseFormModal from '../../../../shared/ui/CloseFormModal';
import EnterpriseFormCard from '../../../../shared/ui/EnterpriseSectionCard/EnterpriseForm.card';
import { PreviewCourse } from '../PreviewCourse';
import { useTenantCourses } from './hook/useTenantCourses';
import './manageCourse.styles.scss';

const ManageCourseForm = () => {
  const {
    courseFormParts,
    handleCourseFormSubmit,
    isPreview,
    courseDetails: courseDetailFromState,
    handleOnPreviewApproved,
    setIsPreview,
    setIsDraftMode,
    isDraftMode,
  } = useTenantCourses();
  const [openExitModal, setOpenExitModal] = useState(false);

  const navigate = useNavigate();

  return (
    <EnterpriseFormLayout
      formHeaderSecondaryButtonClickHandler={() => {
        setIsDraftMode(true);
      }}
      closeHandler={() => {
        setOpenExitModal(true);
      }}
      handleSubmit={!isPreview ? handleCourseFormSubmit : handleOnPreviewApproved}
      formSecondaryBtnText={'Save Draft'}
      formTitle="List a Course"
      formDisclaimer={"By submitting course, you are agree to Docthub's Policy and Terms of use."}
      formPrimaryBtnText={
        !isPreview ? 'Preview & Post' : isDraftMode ? 'Save Draft' : 'Submit Post'
      }
      primaryButtonType={isPreview ? 'semantic-success' : 'primary'}
      showFormFooterSecondaryBtn={isPreview ? true : false}
      formFooterSecondaryBtnText="Back to Edit"
      formFooterSecondaryBtnType={'secondary'}
      formFooterSecondaryBtnClickHandler={() => {
        setIsPreview(false);
      }}
    >
      {!isPreview ? (
        <>
          {courseFormParts.map((formPart, i) => {
            return <EnterpriseFormCard key={i} {...formPart} />;
          })}
        </>
      ) : (
        <>
          <PreviewCourse courseDetails={courseDetailFromState} addBgGrey={false} />
        </>
      )}
      <CloseModal />
    </EnterpriseFormLayout>
  );

  function CloseModal() {
    return (
      <CloseFormModal
        open={openExitModal}
        handleClose={() => {
          setOpenExitModal(false);
        }}
        onConfirmExit={() => {
          navigate(-1);
        }}
      />
    );
  }
};

export default ManageCourseForm;
