import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { EnterpriseFormLayout } from '../../../layout';
import CloseFormModal from '../../../shared/ui/CloseFormModal';
import EnterpriseFormCard from '../../../shared/ui/EnterpriseSectionCard/EnterpriseForm.card';
import { PreviewJob } from '../PreviewJob';
import useTenantJobs from './hooks/useTenantJobs';

const RecruiterPostAJob = () => {
  const {
    formParts,
    handleOnPreviewApproved,
    handleJobFormSubmit,
    isPreview,
    setIsPreview,
    modifiedJobFormValues,
    setApplicationStatus,
  } = useTenantJobs();
  const [openExitModal, setOpenExitModal] = useState(false);
  const navigate = useNavigate();

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

  return (
    <EnterpriseFormLayout
      formHeaderSecondaryButtonClickHandler={() => {
        setApplicationStatus('Draft');
      }}
      closeHandler={() => {
        setOpenExitModal(true);
      }}
      formFooterSecondaryBtnClickHandler={() => setIsPreview(false)}
      showFormFooterSecondaryBtn={isPreview && true}
      handleSubmit={!isPreview ? handleJobFormSubmit : handleOnPreviewApproved}
      formFooterSecondaryBtnText="Back to Edit"
      formSecondaryBtnText={'Save Draft'}
      formTitle="Post a Job"
      formDisclaimer={"By posting Job, you are agree to Docthub's Policy and Terms of use."}
      formPrimaryBtnText={!isPreview ? 'Preview & Post' : 'Submit'}
      primaryButtonType={'primary'}
      formFooterSecondaryBtnType={'secondary'}
    >
      {!isPreview ? (
        formParts.map((formPart, i) => {
          return <EnterpriseFormCard key={i} {...formPart} />;
        })
      ) : (
        <PreviewJob jobDetails={modifiedJobFormValues} />
      )}
      <CloseModal />
    </EnterpriseFormLayout>
  );
};

export default RecruiterPostAJob;
