import { DoctTextField } from '@doct-react/app';
import React, { useEffect } from 'react';

function ManageExhibitors({
  control,
  errors,
  touched,
  handleModal,
  exhibitors,
  selectedRecord,
  reset,
}) {
  useEffect(() => {
    if (selectedRecord != null) {
      reset({ ...exhibitors[selectedRecord] });
    } else {
      reset({});
    }
  }, [exhibitors, selectedRecord]);

  return (
    <div>
      <form onSubmit={handleModal}>
        <DoctTextField
          showStar={false}
          className="mt-2 mb-2"
          name="companyName"
          label="Company/Exhibitor name"
          id="companyName"
          control={control}
          isErrors={errors}
          defaultValue=""
          validationRules={{
            required: "It's Required Field",
          }}
          touched={touched}
        />
        <DoctTextField
          showStar={false}
          className="mt-2 mb-2"
          name="boothNumber"
          label="Booth Number"
          id="boothNumber"
          control={control}
          isErrors={errors}
          defaultValue=""
          validationRules={{
            required: "It's Required Field",
          }}
          touched={touched}
        />
        <DoctTextField
          showStar={false}
          className="mt-2 mb-2"
          name="city"
          label="City"
          id="city"
          control={control}
          isErrors={errors}
          defaultValue=""
          validationRules={{
            required: "It's Required Field",
          }}
          touched={touched}
        />
      </form>
    </div>
  );
}

export default ManageExhibitors;
