import { DoctTypography } from '@doct-react/core';

export function InfoList({ title, info, classes = {} }) {
  return (
    <li>
      <DoctTypography
        variant="textLabel2"
        className={`text-grey-600 d-flex justify-content-between mt-0 ${classes.root}`}
      >
        <span className={classes.title}>{title}</span> <span className={classes.info}>{info}</span>
      </DoctTypography>
    </li>
  );
}

export function InfoListContainer({ attendees }) {
  return attendees.map(({ title, name, ticket: { attendeeType, currency }, ticketPrice }) => {
    return (
      <>
        <InfoList
          title={`${attendeeType} — ${title} ${name}`}
          info={`${currency} ${ticketPrice}`}
        />
      </>
    );
  });
}

export function BillingInfo({ billingInfo }) {
  const { name, city, state, country, contactNo, emailId, organization } = billingInfo || {};

  return (
    <>
      <InfoList title={`Billing name:  ${name || organization}`} classes={{ root: 'my-1' }} />
      <InfoList title={`City:  ${city}`} classes={{ root: 'my-1' }} />
      <InfoList title={`State: ${state}`} classes={{ root: 'my-1' }} />
      <InfoList title={`Country: ${country}`} classes={{ root: 'my-1' }} />
      <InfoList title={`Phone: ${contactNo}`} classes={{ root: 'my-1' }} />
      <InfoList title={`Email: ${emailId}`} classes={{ root: 'my-1' }} />
    </>
  );
}

export function Heading({ title, className = '' }) {
  return (
    <DoctTypography variant="subtitle2" className={`text-grey-800 mb-12px mt-0 ${className}`}>
      {title}
    </DoctTypography>
  );
}
