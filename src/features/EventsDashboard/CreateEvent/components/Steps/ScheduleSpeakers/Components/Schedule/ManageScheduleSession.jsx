import { DoctTextField, DoctTimePicker } from '@doct-react/app';
import { DoctTypography } from '@doct-react/core';
import { TextEditor } from '../../../../../../../../shared';

function ManageScheduleSession({
  handleFormSubmit,
  control,
  touched,
  errors,
  defaultTimeValue,
  selectedTimeValue,
}) {
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <DoctTypography variant="subtitle2" className="text-grey-800">
          Session Duration
        </DoctTypography>
        <div className="d-flex">
          <DoctTimePicker
            name="From"
            label="Start Time"
            id="From"
            className="mr-2"
            control={control}
            touched={touched}
            isErrors={errors}
            defaultValue={selectedTimeValue == true ? defaultTimeValue.From : ''}
            validationRules={{
              required: "It's Required Field",
            }}
          />
          <DoctTimePicker
            name="To"
            label="End Time"
            id="To"
            control={control}
            touched={touched}
            isErrors={errors}
            defaultValue={selectedTimeValue == true ? defaultTimeValue.To : ''}
            validationRules={{
              required: "It's Required Field",
            }}
          />
        </div>
        <DoctTypography variant="subtitle2" className="text-grey-800">
          Title & Description
        </DoctTypography>
        <DoctTextField
          showStar
          className="mb-2"
          name="Title"
          label="Session title"
          id="Title"
          control={control}
          isErrors={errors}
          defaultValue=""
          validationRules={{
            required: "It's Required Field",
          }}
          touched={touched}
        />
        <span className="text_overview_description">
          <TextEditor
            name="description"
            control={control}
            placeholder="Add short description about session (optional)"
          />
        </span>
        <DoctTypography variant="subtitle2" className="text-grey-800">
          Speaker/ Presenter (optional)
        </DoctTypography>
        <DoctTextField
          showStar
          className="mb-2"
          name="speakers"
          label="Add names here"
          id="speakers"
          control={control}
          isErrors={errors}
          defaultValue=""
          validationRules={{}}
          touched={touched}
        />
      </form>
    </>
  );
}

export default ManageScheduleSession;
