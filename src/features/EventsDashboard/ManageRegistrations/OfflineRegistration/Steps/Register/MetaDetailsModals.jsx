import { DoctModal } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import { useEffect, useState } from 'react';

export default function MetaModals({ metaData }) {
  const { termsAndCondition, cancellationPolicy, remarks } = metaData || {};

  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [cancellationModalOpen, setCancellationModalOpen] = useState(false);
  const [remarksModalOpen, setRemarksModalOpen] = useState(false);

  const [title, setTitle] = useState('');

  const [content, setContent] = useState(null);

  useEffect(() => {
    if (termsModalOpen) {
      setTitle('Terms & Conditions');
    }
    if (cancellationModalOpen) {
      setTitle('Cancellation Policy');
    }
    if (remarksModalOpen) {
      setTitle('Remarks');
    }
    setContent(null);
  }, [termsModalOpen, cancellationModalOpen, remarksModalOpen]);

  return (
    <>
      <span
        className="cursor-pointer meta-info-item text-primary mr-3 d-inline-flex align-items-center"
        onClick={() => setTermsModalOpen(true)}
      >
        <DoctTypography variant="link2" className="text-primary">
          Terms & Conditions
        </DoctTypography>
      </span>
      <span
        className="cursor-pointer meta-info-item text-primary mr-3 d-inline-flex align-items-center"
        onClick={() => setCancellationModalOpen(true)}
      >
        <DoctTypography variant="link2" className="text-primary">
          Cancellation Policy
        </DoctTypography>
      </span>
      <span
        className="cursor-pointer meta-info-item text-primary d-inline-flex align-items-center"
        onClick={() => setRemarksModalOpen(true)}
      >
        <DoctTypography variant="link2" className="text-primary">
          Remarks
        </DoctTypography>
      </span>

      <DoctModal
        iconName={''}
        primaryBtnText="Yes"
        secondaryBtnText="Go Back"
        open={termsModalOpen || cancellationModalOpen || remarksModalOpen}
        handleClose={() => {
          setTermsModalOpen(false);
          setCancellationModalOpen(false);
          setRemarksModalOpen(false);
        }}
        title={title}
        width={572}
        className="white-body-modal"
        showFooter={false}
      >
        {termsModalOpen && <div dangerouslySetInnerHTML={{ __html: termsAndCondition }} />}
        {cancellationModalOpen && <div dangerouslySetInnerHTML={{ __html: cancellationPolicy }} />}
        {remarksModalOpen && <div dangerouslySetInnerHTML={{ __html: remarks }} />}
      </DoctModal>
    </>
  );
}
