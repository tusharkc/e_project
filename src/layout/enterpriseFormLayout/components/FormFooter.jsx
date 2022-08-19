import { DoctButton, DoctContainer, DoctTypography } from '@doct-react/core';
import React from 'react';

const FormFooter = ({
  formDisclaimer,
  formPrimaryBtnText,
  btnType = 'primary',
  formFooterSecondaryBtnText,
  showFormFooterSecondaryBtn = false,
  formFooterSecondaryBtnType = 'primary',
  formFooterSecondaryBtnClickHandler = () => {},
}) => {
  return (
    <div className="pt-3 bg-white">
      <DoctContainer>
        <div className="d-flex align-items-center justify-content-between">
          <DoctTypography variant="textLabel2">{formDisclaimer}</DoctTypography>
          <div className="d-flex">
            {showFormFooterSecondaryBtn && (
              <DoctButton
                onButtonClickHandler={formFooterSecondaryBtnClickHandler}
                className="mx-2"
                type={formFooterSecondaryBtnType}
                size="medium"
                text={formFooterSecondaryBtnText}
              />
            )}
            <DoctButton type={btnType} size="medium" text={formPrimaryBtnText} />
          </div>
        </div>
      </DoctContainer>
    </div>
  );
};

export default FormFooter;
