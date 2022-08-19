import { DoctPageLoading } from '@doct-react/app';
import { DoctContainer, DoctIconButton, DoctTypography } from '@doct-react/core';
import { Link } from 'react-router-dom';
import qs from 'qs';

import { MANAGE_EVENTS_REGISTRATION } from '../../routes/constant';
import CustomStepper from '../../shared/ui/Stepper/Stepper';

import dayjs from 'dayjs';
import EventIcon from '@mui/icons-material/Event';
import './EventRegistrationLayout.scss';
import useQueryHooks from '../../hooks/useQueryHooks';

export function EventRegistrationLayoutFooter({ children, className = '' }) {
  return (
    <div
      className={`fixed-bottom pt-12px pb-12px bg-white-opacity-06 backdrop-filter ${className}`}
    >
      <DoctContainer>
        <div className="d-flex align-items-center">{children}</div>
      </DoctContainer>
    </div>
  );
}

export default function EventRegistrationLayout({
  loading,
  children,
  activeStep,
  title,
  eventDetails,
  eventDetails: {
    startDate,
    endDate,
    type,
    name,
    venueAddress,
    venue: { name: venueName, city, state, country } = {},
  } = {},
  steps,
  steperMaxWidth = 'initial',
  showEventDetails = true,
}) {
  const query = useQueryHooks();

  return (
    <>
      <div className="registration-bg-primary registration-top-panel">
        <nav className="panel-height-5x d-flex align-items-center registration-title-panel">
          <DoctContainer>
            <DoctTypography
              variant="subtitle1"
              className="text-white d-flex align-items-center my-0"
              fontWeight="normal"
            >
              <Link
                to={`${MANAGE_EVENTS_REGISTRATION}?${qs.stringify(query)}`}
                className="ml-n2 mr-2 d-inline-flex"
              >
                <DoctIconButton variant="text" type="secondary" icon="close" size="medium" />
              </Link>
              {title}
            </DoctTypography>
          </DoctContainer>
        </nav>
        <CustomStepper steps={steps} style={{ maxWidth: steperMaxWidth }} activeStep={activeStep} />
      </div>
      {loading ? (
        <DoctPageLoading />
      ) : (
        <main className="bg-grey-200 registration-main-area">
          {showEventDetails && (
            <DoctContainer>
              <div className="py-3">
                <p className="my-0 d-flex justify-content-between">
                  <DoctTypography variant="overline" className="text-primary align-self-center">
                    {type}
                  </DoctTypography>
                  <DoctTypography
                    variant="textLabel2"
                    className="d-flex align-items-center text-grey-600 mt-1 mb-0 text-uppercase"
                  >
                    <EventIcon
                      fontSize={'small'}
                      className="mr-2"
                      classes={{ root: 'icon-14px' }}
                    />
                    {dayjs(startDate).format('DD MMM YYYY')} TO{' '}
                    {dayjs(endDate).format('DD MMM YYYY')}
                  </DoctTypography>
                </p>
                <DoctTypography variant="subtitle2" className="my-0">
                  {name}
                </DoctTypography>
                <DoctTypography variant="textLabel2" className="my-0 text-grey-600">
                  {venueName}
                  {city && `, ${city}`}
                  {state && `, ${state}`}
                  {country && `, ${country}`}
                </DoctTypography>
              </div>
              <div className="line-divider bg-grey-100 border-radius"></div>
            </DoctContainer>
          )}
          <DoctContainer>{children}</DoctContainer>
        </main>
      )}
    </>
  );
}
