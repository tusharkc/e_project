import { DoctTypography } from '@doct-react/core';

export default function DefaultQuickCard({ bgClass, title, content, isEmpty = true }) {
  return (
    <div
      className={`quick_card_height d-flex flex-column border-radius p-1 ${
        isEmpty ? `${bgClass}` : 'bg-grey-100'
      }`}
    >
      <span className="d-inline-flex panel-height-4x px-3">
        <DoctTypography variant="subtitle1" className={isEmpty ? 'text-white' : null}>
          {title}
        </DoctTypography>
      </span>
      {content}
    </div>
  );
}
