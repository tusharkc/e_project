import { DoctCol, DoctContainer, DoctTypography } from '@doct-react/core';
import React from 'react';
import './enterpriseFormCard.scss';

const EnterpriseFormCard = ({ formSectionHeading, childElement }) => {
  return (
    <div className="my-3">
      <DoctContainer>
        <div className="bg-grey-100 border-radius">
          <div className="section_heading_container d-flex align-items-center bg-white">
            <DoctTypography
              variant="h6"
              className="mx-2 form_card_section_heading"
              fontWeight="light"
            >
              {formSectionHeading}
            </DoctTypography>
          </div>
          <div className="form_card_child_element">
            <DoctCol sm={6} className={'offset-sm-3'}>
              {childElement}
            </DoctCol>
          </div>
        </div>
      </DoctContainer>
    </div>
  );
};

export default EnterpriseFormCard;
