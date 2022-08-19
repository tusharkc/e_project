import { DoctForm, DoctTextField } from '@doct-react/app';
import { DoctButton } from '@doct-react/core';
// import { useRouter } from 'next/router';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ROUTE from '../../../../routes/constant';

function FormInput() {
  const navigate = useNavigate();

  const { handleSubmit, reset, control, errors, formState } = DoctForm({
    mode: 'onChange',
  });

  // const router = useRouter();

  const [message, setMessage] = useState(null);

  const onSubmit = handleSubmit((data) => {
    if (data) {
      fetch(`${process.env.REACT_APP_BASE_API_URL}/jobcenter/job-inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.Extensions?.code == '010') {
            setMessage(data.Title);
          } else {
            navigate(
              `/${ROUTE.TALENT_ACQUISITION_SERVICES}/${ROUTE.TALENT_ACQUISITION_INQUIRY_APPLICATION_SENT_SUCCESSFULLY}`,
            );
            // router.push('/talent-acquisition-services/Inquiry-application-sent-successfully');
          }
        })
        .catch((error) => {
          navigate(
            `/${ROUTE.TALENT_ACQUISITION_SERVICES}/${ROUTE.TALENT_ACQUISITION_ERROR_IN_INQUIRY}`,
          );
          // router.push('/talent-acquisition-services/error-in-inquiry');
        });
    }
  });

  return (
    <div className="form_element p-4 my-5">
      <form onSubmit={onSubmit} noValidate>
        <h3 className="my-2 inquire_text">Inquire for free</h3>
        <DoctTextField
          className="text_field"
          name="name"
          label="Full Name"
          id="fullName"
          control={control}
          isErrors={errors}
          validationRules={{
            required: "It's required",
          }}
        />

        <div className="my-3"></div>

        <DoctTextField
          className="text_field"
          name="organizationName"
          label="Organization"
          id="organizationName"
          control={control}
          isErrors={errors}
          validationRules={{
            required: "It's required",
          }}
        />

        <div className="my-3"></div>

        <DoctTextField
          className="text_field"
          name="mobileNo"
          label="Mobile Number"
          id="mobileNumber"
          control={control}
          isErrors={errors}
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
          }}
        />

        <div className="my-3"></div>

        <DoctTextField
          className="text_field"
          name="email"
          label="Email ID"
          id="email"
          control={control}
          isErrors={errors}
          validationRules={{
            required: "It's required",

            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email is not valid',
            },
          }}
        />
        <div
          className={`pb-sm-0 pb-5 d-flex flex-sm-row-reverse flex-column align-items-baseline justify-content-center btn_inquire_now ${
            message != null ? 'px-4' : 'p-0'
          }`}
        >
          <div className={`${message != null ? 'p-2' : 'p-0'}`}>
            <DoctButton onSubmit={onSubmit} text="Inquire Now" />
          </div>
          <p className="text-grey-500" style={{ fontSize: '12px' }}>
            {message != null ? message : null}
          </p>
        </div>
      </form>
    </div>
  );
}

export default FormInput;
