import { DoctAutoComplete, DoctDropdownSelect, DoctTextField } from '@doct-react/app';
import { DoctCol, DoctRow, DoctTypography, DoctIcon } from '@doct-react/core';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import '../../newMembership.scss';
const NewMembershipform = ({ control, errors }) => {
  const {
    fields: criteriaFields,
    append: criteriaAppend,
    remove: criteriaRemove,
  } = useFieldArray({ control, name: 'criterias' });

  const {
    fields: benifitsFields,
    append: benifitsAppend,
    remove: benifitsRemove,
  } = useFieldArray({ control, name: 'benefits' });

  const renewalPaymentTermsOption = [
    { label: 'Nil (No Renewal)' },
    { label: 'Once in a Year' },
    { label: 'Once in 2 Years' },
    { label: 'Once in 3 Years' },
    { label: 'Once in 18 Months' },
    { label: 'Once in 6 Months' },
    { label: 'Once in 3 Months' },
    { label: 'Monthly' },
  ];
  return (
    <div className=" bg-grey-200 border-radius py-5 px-5">
      <DoctTypography
        variant="h6"
        className="membership-info-border p-3 text-grey-600 bg-white font-weight-regular"
      >
        Membership Information
      </DoctTypography>
      <div className="membership_info_form_section d-flex justify-content-center align-item-center bg-grey-100">
        <div className="form-body-container my-5">
          <DoctTypography variant="subtitle2">Membership Title *</DoctTypography>
          <DoctTextField
            name="membershipTitle"
            label="Membership Title"
            showStar={false}
            control={control}
            isErrors={errors}
            validationRules={{
              required: "It's required",
            }}
          />

          {/* <DoctTypography className="mt-4" variant="subtitle2">
            Taxation *
          </DoctTypography>

          <DoctRadioGroup
            name="taxation"
            className="w-100"
            id="taxation"
            control={control}
            options={[
              { value: '0', label: 'Including all Taxes' },
              { value: '1', label: 'Excluding all Taxes' },
            ]}
            validationRules={{
              required: "It's Required Field",
            }}
            isErrors={errors}
          /> */}

          <DoctRow>
            <DoctCol sm={6}>
              <DoctTypography variant="subtitle2" className="mt-4">
                Fees *
              </DoctTypography>
              <div className="d-flex">
                <DoctTextField
                  className="w-25"
                  name="currency"
                  label="Currency"
                  defaultValue="INR"
                  showStar={false}
                  disabled
                  control={control}
                  isErrors={errors}
                  validationRules={{}}
                />
                <DoctTextField
                  name="fees"
                  className="mx-2 w-75"
                  label="Amount"
                  showStar={false}
                  control={control}
                  isErrors={errors}
                  validationRules={{
                    required: "It's required",
                  }}
                />
              </div>
            </DoctCol>
            <DoctCol sm={6}>
              <DoctTypography variant="subtitle2" className="mt-4">
                Renewal Payment Terms *
              </DoctTypography>

              <DoctAutoComplete
                name="renewalPaymentTerms"
                label="Select"
                showStar={false}
                control={control}
                isErrors={errors}
                validationRules={{
                  required: "It's required",
                }}
                options={renewalPaymentTermsOption}
              />

              {/* <DoctTextField
                name="renewalPaymentTerms"
                label="Renewal Payment Terms"
                showStar={false}
                control={control}
                isErrors={errors}
                validationRules={{
                  required: "It's required",
                }}
              /> */}
            </DoctCol>
          </DoctRow>

          {/* Criteria Section Starts here */}
          <div className="mt-4">
            <DoctTypography variant="subtitle2">Criteria</DoctTypography>

            <span className="cursor-pointer" onClick={() => criteriaAppend({ name: '' })}>
              <DoctTypography
                variant="subtitle2"
                className="text-primary d-flex align-items-center"
              >
                <DoctIcon width="20" fill="#00A0C0" name="plus" />
                Add
              </DoctTypography>
            </span>

            <DoctTypography variant="subtitle3" className="text-grey-600 mt-sm-n2 mb-0">
              Add multiple points by clicking &lsquo;Add&lsquo; button
            </DoctTypography>

            {criteriaFields.map((item, index) => {
              return (
                <li key={item.id} className="mt-12px">
                  <DoctRow key={index} className="py-1">
                    <DoctCol sm={11}>
                      <DoctTextField
                        name={`criterias[${index}].name`}
                        label="Criteria"
                        showStar={false}
                        control={control}
                        isErrors={errors}
                        validationRules={{}}
                        defaultValue={item.name}
                      />
                    </DoctCol>

                    <div
                      onClick={() => criteriaRemove(index)}
                      className="col-sm-1 d-flex align-items-center justify-content-center del-btn cursor-pointer"
                    />
                  </DoctRow>
                </li>
              );
            })}
          </div>
          {/* Criteria Section Ends here */}

          {/* Benefits Section Starts here */}
          <div className="mt-4">
            <DoctTypography variant="subtitle2">Benefits</DoctTypography>

            <span className="cursor-pointer" onClick={() => benifitsAppend({ name: '' })}>
              <DoctTypography
                variant="subtitle2"
                className="text-primary d-flex align-items-center"
              >
                <DoctIcon width="20" fill="#00A0C0" name="plus" />
                Add
              </DoctTypography>
            </span>

            <DoctTypography variant="subtitle3" className="text-grey-600 mt-sm-n2 mb-0">
              Add multiple points by clicking &lsquo;Add&lsquo; button
            </DoctTypography>

            {benifitsFields.map((item, index) => (
              <li key={item.id} className="mt-12px">
                <DoctRow key={index} className="py-1">
                  <DoctCol sm={11}>
                    <DoctTextField
                      name={`benefits[${index}].name`}
                      label="Benefits"
                      showStar={false}
                      control={control}
                      isErrors={errors}
                      validationRules={{}}
                      defaultValue={item.name}
                    />
                  </DoctCol>

                  <div
                    onClick={() => benifitsRemove(index)}
                    className="col-sm-1 d-flex align-items-center justify-content-center del-btn cursor-pointer"
                  />
                </DoctRow>
              </li>
            ))}
          </div>
          {/* Benefits Section Ends here */}
        </div>
      </div>
    </div>
  );
};

export default NewMembershipform;
