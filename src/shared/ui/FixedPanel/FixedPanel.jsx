import { DoctContainer } from '@doct-react/core';

export default function FixedPanel({ children, container, className = '', contentClassName }) {
  if (container) {
    return (
      <div className={`bg-white fixed-bottom ${className}`}>
        <DoctContainer>
          <div className={`${contentClassName ? contentClassName : ''}`}>{children}</div>
        </DoctContainer>
      </div>
    );
  }
  return <div className="bg-white fixed-bottom">{children}</div>;
}
