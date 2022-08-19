import { DoctRadioGroup } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';

const BillingTypeSelection = ({
  control,
  errors,
  className,
  defaultValue,
  classNameRadioGroup,
}) => {
  return (
    <div className={className}>
      <DoctTypography variant="subtitle3" className="mr-3">
        BILLING TYPE:
      </DoctTypography>
      <DoctRadioGroup
        className={classNameRadioGroup}
        defaultValue={defaultValue}
        name="type"
        id="type"
        control={control}
        options={[
          { value: 'Individual', label: 'Individual', disabled: defaultValue == 'Business' },
          { value: 'Business', label: 'Business', disabled: defaultValue == 'Individual' },
        ]}
        errors={{}}
        isErrors={errors}
      />
    </div>
  );
};

export default BillingTypeSelection;
