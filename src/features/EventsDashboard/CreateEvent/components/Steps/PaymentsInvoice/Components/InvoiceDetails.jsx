import { DoctTypography } from '@doct-react/core';
import React, { useEffect, useState } from 'react';
import { DoctFileUpload, DoctTextField } from '@doct-react/app';
import FormGroup from '../../../../../../../shared/FormGroup';
import { selectCreateEventResponse, selectTicketsDetails } from '../../../../createEvent.slice';
import { useSelector } from 'react-redux';
import UserLocation from '../../../../../../../shared/ui/UserLocation';

function InvoiceDetails({
  formName,
  touched,
  uploadRegistration,
  setUploadRegistration,
  uploadSignature,
  setUploadSignature,
  control,
  errors,
  watch,
  setValue,
  defaultStateValue,
}) {
  const apiResponseData = useSelector(selectCreateEventResponse);
  const gstRegistrationFromTicket = useSelector(selectTicketsDetails);

  const [gstRegistration, setGSTRegistration] = useState('');
  useEffect(() => {
    if (apiResponseData?.invoiceDetail?.isGSTRegistration == false) {
      setGSTRegistration('No');
    } else {
      setGSTRegistration('Yes');
    }
  }, [apiResponseData]);
  return (
    <div>
      <DoctTypography variant="h6" className="text-grey-800">
        Invoice Details
      </DoctTypography>
      <DoctTypography variant="subtitle2" className="text-grey-600 mt-4">
        Fill all below fields for GST registration details.
      </DoctTypography>
      <DoctTextField
        {...formName.gstIn}
        showStar={false}
        className="mb-3"
        defaultValue=""
        validationRules={{
          required:
            apiResponseData?.invoiceDetail?.isGSTRegistration == true ||
            gstRegistrationFromTicket?.InvoiceDetail?.IsGSTRegistration == true
              ? "It's Required Field"
              : false,
        }}
        touched={touched}
        disabled={
          apiResponseData?.invoiceDetail?.isGSTRegistration == false ||
          gstRegistrationFromTicket?.InvoiceDetail?.IsGSTRegistration == false
            ? true
            : false
        }
      />
      <DoctTextField
        {...formName.registeredCompanyName}
        showStar={false}
        className="mb-3"
        defaultValue=""
        validationRules={{
          required: "It's Required Field",
        }}
        touched={touched}
      />
      <DoctTextField
        {...formName.registeredCompanyAddress}
        showStar={false}
        className="mb-3"
        defaultValue=""
        validationRules={{
          required: "It's Required Field",
        }}
        touched={touched}
      />
      <UserLocation
        control={control}
        errors={errors}
        watch={watch}
        setValue={setValue}
        touched={touched}
        countryName="Country"
        stateName="State"
        cityName="City"
        paymentStep={true}
        defaultStateVal={defaultStateValue}
      />
      <DoctTextField
        {...formName.contactNumber}
        showStar={false}
        className="mb-3"
        validationRules={{
          required: "It's required",
          maxLength: {
            value: 10,
            message: 'Number is not valid',
          },

          minLength: {
            value: 10,
            message: 'Number is not valid',
          },
          pattern: {
            value: /^(0|[1-9]\d*)(\.\d+)?$/,
            message: 'Mobile No is not valid',
          },
        }}
        defaultValue=""
        touched={touched}
      />
      <DoctTextField
        {...formName.emailAddress}
        showStar={false}
        className="mb-3"
        validationRules={{
          required: "It's Required Field",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email is not valid',
          },
        }}
        defaultValue=""
        touched={touched}
      />
      <DoctTextField
        {...formName.panCardNumber}
        showStar={false}
        className="mb-2"
        defaultValue=""
        validationRules={{
          required: "It's Required Field",
        }}
        touched={touched}
      />
      <div className="mb-5 py-2">
        {apiResponseData?.invoiceDetail?.isGSTRegistration == true ||
          (gstRegistrationFromTicket?.InvoiceDetail?.IsGSTRegistration == 'true' && (
            <>
              <DoctTypography variant="subtitle2" className="text-grey-800">
                Upload GST Registration Certificate
              </DoctTypography>
              <DoctFileUpload
                uploadMaxFilesMessage="Upload document in PDF, JPEG, PNG formats up to 5 MB size."
                maxFiles={1}
                uploadedFiles={uploadRegistration || []}
                setUploadedFiles={setUploadRegistration}
                accept=".pdf, .doc, .docx"
                maxFileSizeInMb={5}
              />
            </>
          ))}
        <FormGroup>
          <DoctTypography variant="subtitle2" className="text-grey-800">
            Upload Signature (optional)
          </DoctTypography>
          <DoctFileUpload
            uploadTitle="You can upload signature here."
            uploadMaxFilesMessage="Upload document in PDF, JPEG, PNG formats up to 5 MB size."
            maxFiles={1}
            uploadedFiles={uploadSignature || []}
            setUploadedFiles={setUploadSignature}
            accept=".jpg, .png, .svg"
            maxFileSizeInMb={5}
          />
        </FormGroup>
      </div>
    </div>
  );
}

export default InvoiceDetails;
