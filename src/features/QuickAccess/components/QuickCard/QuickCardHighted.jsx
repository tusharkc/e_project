import DefaultQuickCard from './DefaultQuickCard';
import EmptyStateCard from './EmptyStateCard';

export default function QuickCardHighted({
  title,
  emptyStateImage,
  emptyStateTitle,
  btnText,
  emptyStateBgClass,
  onButtonPressFunction,
}) {
  return (
    <DefaultQuickCard
      title={title}
      bgClass={emptyStateBgClass}
      content={
        <EmptyStateCard
          icon={emptyStateImage}
          title={emptyStateTitle}
          btnText={btnText}
          onPressFunction={onButtonPressFunction}
        />
      }
    ></DefaultQuickCard>
  );
}
