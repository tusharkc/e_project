import React, { useState, ReactElement } from 'react';
import { DoctTypography, DoctIcon } from '@doct-react/core';

export default function Accordion({ children, title, className }) {
  const [isOpen, setIsOpen] = useState(false);

  const onChangeHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`footer-widget${className ? ` ${className}` : ''} ${isOpen ? 'open' : ''}`}
      onClick={onChangeHandler}
    >
      <DoctTypography variant="subtitle2" className="text-grey-800 m-0 footer-link-title">
        <>
          <span className="font-weight-bold">{title}</span>
          <DoctIcon
            className="d-block d-sm-none footer-widget-icon"
            width="24"
            height="24"
            name="down"
          />
        </>
      </DoctTypography>
      <div className={`footer-collapsible`}>{children}</div>
    </div>
  );
}
