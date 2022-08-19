import PropyTypes from 'prop-types';

import { DoctTypography } from '@doct-react/core';

export default function RegistrationCollapsible({ column, tableCollapsibleData }) {
  const {
    billingInformation,
    grossAmount,
    discountAmount,
    taxAmount,
    totalAmount,
    paymentStatus,
    attendees,
    curreny = 'INR',
    remarks,
  } = tableCollapsibleData || {};
  const { city, state, country, contactNumber, email } = billingInformation || {};
  const attendeesArray = attendees || [{}];

  const { registrationType } = column || {};
  const { registrationType: userRegistrationType } = tableCollapsibleData;

  return (
    <>
      {registrationType != 'Complementary' && userRegistrationType != 'Free' ? (
        <>
          <div className="d-flex">
            <p className="my-0 container-3xx">
              <DoctTypography variant="subtitle2" className="text-grey-800 mt-0 mb-2">
                Location Info
              </DoctTypography>
              <DoctTypography variant="textLabel2" className="text-grey-800 my-1">
                City: {city}
              </DoctTypography>
              <DoctTypography variant="textLabel2" className="text-grey-800 my-1">
                State: {state}
              </DoctTypography>
              <DoctTypography variant="textLabel2" className="text-grey-800 mt-1 mb-0">
                Country: {country}
              </DoctTypography>
            </p>
            <p className="my-0 ml-auto container-3xx">
              <DoctTypography variant="subtitle2" className="text-grey-800 mt-0 mb-2">
                Contact Info
              </DoctTypography>
              <DoctTypography variant="textLabel2" className="text-grey-800 my-1">
                Phone: {contactNumber}
              </DoctTypography>
              <DoctTypography variant="textLabel2" className="text-grey-800 my-0 mb-0">
                Email: {email}
              </DoctTypography>
            </p>
          </div>
          <div className="line-divider bg-low-opacity-black my-3"></div>
        </>
      ) : null}

      <div className="d-flex">
        <p className="my-0 container-3xx">
          <DoctTypography variant="subtitle2" className="text-grey-800 mt-0 mb-2">
            Attendees
          </DoctTypography>
          {attendeesArray.map((item, index) => {
            return (
              <DoctTypography
                key={item?.name}
                variant="textLabel2"
                className="text-grey-800 my-1 d-flex justify-content-between"
              >
                {item?.ticket?.name} {index > 1 ? index : null} — {item?.title} {item?.name}
                <span>
                  {curreny} {item?.ticket?.price}
                </span>
              </DoctTypography>
            );
          })}
          {remarks && (
            <>
              <DoctTypography variant="subtitle2" className="text-grey-800 mt-3 mb-2">
                Remarks
              </DoctTypography>
              <DoctTypography
                variant="textLabel2"
                className="text-grey-800 my-1 d-flex justify-content-between"
              >
                {remarks}
              </DoctTypography>
            </>
          )}
        </p>

        {registrationType != 'Complementary' && userRegistrationType != 'Free' ? (
          <p className="my-0 ml-auto container-3xx">
            <DoctTypography variant="subtitle2" className="text-grey-800 mt-0 mb-2">
              Payment Info
            </DoctTypography>
            <DoctTypography
              variant="textLabel2"
              className="text-grey-600 my-2 d-flex justify-content-between"
            >
              GROSS AMOUNT
              <span>
                {curreny} {grossAmount}
              </span>
            </DoctTypography>
            <DoctTypography
              variant="textLabel2"
              className="text-grey-600 my-2 d-flex justify-content-between"
            >
              DISCOUNT:
              <span>
                {curreny} {discountAmount}
              </span>
            </DoctTypography>
            {/* <DoctTypography variant="textLabel2" className="text-grey-800">
           CONVENIENCE FEE
         </DoctTypography> */}
            <DoctTypography
              variant="textLabel2"
              className="text-grey-600 my-2 d-flex justify-content-between"
            >
              TAXATION: GST(18%)
              <span>
                {curreny} {taxAmount}
              </span>
            </DoctTypography>
            <div className="line-divider bg-low-opacity-black"></div>
            <DoctTypography
              variant="subtitle2"
              className="text-grey-800 my-2 d-flex justify-content-between"
            >
              Total Amount:
              <span>
                {curreny} {totalAmount}
              </span>
            </DoctTypography>
            <div className="line-divider bg-low-opacity-black"></div>
            {paymentStatus && (
              <DoctTypography
                variant="textLabel2"
                className="text-grey-600 d-flex justify-content-between"
              >
                PAYMENT STATUS <span>{paymentStatus}</span>
              </DoctTypography>
            )}
          </p>
        ) : null}
      </div>
    </>
  );
}
RegistrationCollapsible.propTypes = {
  column: PropyTypes.object,
};
