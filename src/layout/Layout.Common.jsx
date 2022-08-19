import { DoctContainer } from '@doct-react/core';
import { CommonLayoutFooter } from './components';

function Header() {
  return (
    <div className="header_container d-flex align-items-center">
      <DoctContainer>
        <a href={process.env.REACT_APP_DOCTHUB_WEB_APP_LINK}>
          <img src="/media/images/Logo.png" />
        </a>
      </DoctContainer>
    </div>
  );
}

export default function LayoutCommon({ children, hideFooter = false }) {
  return (
    <>
      <Header />
      {children}
      {!hideFooter && <CommonLayoutFooter />}
    </>
  );
}
