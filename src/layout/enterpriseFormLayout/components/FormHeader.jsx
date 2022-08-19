import { DoctButton, DoctContainer, DoctIconButton, DoctTypography } from '@doct-react/core';
import React from 'react';

const FormHeader = ({
  formTitle,
  formSecondaryBtnText,
  closeHandler = () => {},
  formHeaderSecondaryButtonClickHandler = () => {},
}) => {
  return (
    <div className="bg-grey-100 enterprise_form_header_container">
      <DoctContainer>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-start">
            <DoctIconButton
              onButtonClickHandler={(e) => {
                e.preventDefault();
                closeHandler();
              }}
              icon="close"
              size="medium"
              type="secondary"
            />
            <DoctTypography variant="textLabel1" className="font-weight-bold mx-3">
              {formTitle}
            </DoctTypography>
          </div>

          <DoctButton
            onButtonClickHandler={() => {
              formHeaderSecondaryButtonClickHandler();
            }}
            variant="invert"
            size="small"
            text={formSecondaryBtnText}
          />
        </div>
      </DoctContainer>
    </div>
  );
};

export default FormHeader;
