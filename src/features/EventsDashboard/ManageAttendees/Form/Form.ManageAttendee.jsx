import { DoctRadioGroup, DoctTextField } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import { memo } from 'react';
import { LocationField, MobileWhatsAppForm } from '../../../../shared';
import { filedManageAttendee } from './field.ManageAttendee';

function FormManageAttendees({
  control,
  errors,
  touched,
  setValue,
  watch,
  clearErrors,
  defaultValue,
}) {
  const formProps = { control, isErrors: errors, touched, watch, setValue, clearErrors };

  return (
    <form>
      <div className="boxed-radio mx-n1 form_el">
        <DoctTypography variant="subtitle2" className="mt-0 mb-12px">
          Gender
        </DoctTypography>
        <DoctRadioGroup {...filedManageAttendee.gender} {...formProps} />
      </div>
      <span className="form_el d-inline-block">
        <DoctTextField {...filedManageAttendee.name} {...formProps} />
        <DoctTypography variant="caption1" className="text-grey-600">
          This name will be shown in Event Certificate.
        </DoctTypography>
      </span>
      <div className="form_el ">
        <LocationField
          inputProps={{
            country: {
              disabled: true,
            },
          }}
          {...formProps}
          columnLayout={{ country: 12, city: 6, state: 6 }}
          errors={errors}
          savedValue={defaultValue}
          valueAccessBy={'name'}
          className={'form_el form_el_gap_bottom'}
        />
      </div>

      <DoctTypography variant="subtitle2" className="mt-0">
        Contact Details
      </DoctTypography>
      <MobileWhatsAppForm
        {...formProps}
        errors={errors}
        columnLayout={{ mobile: 12, whatsapp: 12 }}
        className="form_el"
      />
      <DoctTextField
        {...filedManageAttendee.email}
        {...formProps}
        className="form_el form_el_gap_bottom"
      />

      <DoctTypography variant="subtitle2" className="mt-0">
        Other Details (Optional)
      </DoctTypography>
      <DoctTextField {...filedManageAttendee.licenseNo} {...formProps} className="form_el" />
      <DoctTextField {...filedManageAttendee.memberId} {...formProps} className="form_el" />
    </form>
  );
}

export default memo(FormManageAttendees);
