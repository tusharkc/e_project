import { DoctButton, DoctTypography } from '@doct-react/core';

export default function EmptyStateCard({ icon, title, btnText, onPressFunction, disabled = true }) {
  return (
    <div className="d-flex align-items-center flex-column h-100">
      {icon}
      <DoctTypography variant="textLabel1" className="text-white mt-0 mb-3">
        {title}
      </DoctTypography>
      <DoctButton
        variant="outline"
        type="inverse"
        size="medium"
        text={btnText}
        disabled={disabled}
        icon="plus"
        onButtonClickHandler={onPressFunction}
      />
    </div>
  );
}
