import React from 'react';
import { FormFooter, FormHeader } from './components';
import './enterpriseForm.scss';

const EnterpriseFormLayout = ({
  children,
  formSecondaryBtnText,
  formTitle,
  formDisclaimer,
  formPrimaryBtnText,
  handleSubmit,
  primaryButtonType,
  closeHandler,
  formFooterSecondaryBtnText,
  showFormFooterSecondaryBtn,
  formFooterSecondaryBtnType,
  formFooterSecondaryBtnClickHandler,
  formHeaderSecondaryButtonClickHandler,
}) => {
  return (
    <form
      className="bg-grey-200"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <FormHeader
        formHeaderSecondaryButtonClickHandler={formHeaderSecondaryButtonClickHandler}
        closeHandler={closeHandler}
        formSecondaryBtnText={formSecondaryBtnText}
        formTitle={formTitle}
      />
      {children}
      <FormFooter
        formFooterSecondaryBtnClickHandler={formFooterSecondaryBtnClickHandler}
        formFooterSecondaryBtnText={formFooterSecondaryBtnText}
        showFormFooterSecondaryBtn={showFormFooterSecondaryBtn}
        formFooterSecondaryBtnType={formFooterSecondaryBtnType}
        btnType={primaryButtonType}
        formDisclaimer={formDisclaimer}
        formPrimaryBtnText={formPrimaryBtnText}
      />
    </form>
  );
};

export default EnterpriseFormLayout;
