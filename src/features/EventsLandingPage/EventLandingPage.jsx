import React from 'react';
import { EventBanner } from './EventBannersection';
// import EventLandingPageHeader from './EventLandingPageHeader/EventLandingPageHeader';
import { EventFeatures } from './EventLandingpageFeatures';
// import { ExplainationVideo } from './EventsVideosection';
import { PartneredEvents } from './PartneredEvents';
import { KeyPointIndicator } from './SectionKeyPointIndicator';
import { Clientele } from './ClienteleSection';
import { Testimonials } from './Testimonials';
import { CreateAccountSection } from './CreateBussinessAccount';
import { EventsBlog } from './EventsBlog';
import { FAQ } from './FAQ/index';
import DashboardBrandingCommonLayout from '../../layout/dashboardBrandingCommonLayout';
import Helmet from 'react-helmet';

const meta = {
  title: 'Create a Medical Event or Conference | Docthub.com',
  description:
    'Organize and manage your all registration from event dashboadrd by creating it on Docthub.com',
};

const EventLandingPage = () => {
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta property="og:title" content={meta.title}></meta>
        <meta property="og:description" content={meta.description}></meta>
        <meta name="description" content={meta.description} />
      </Helmet>
      <div className="landingpage_body">
        <DashboardBrandingCommonLayout>
          {/* <EventLandingPageHeader /> */}
          <EventBanner />
          <EventFeatures />
          {/* <ExplainationVideo /> */}
          <PartneredEvents />
          <KeyPointIndicator />
          <Clientele />
          <Testimonials />
          <CreateAccountSection />
          <EventsBlog />
          <FAQ />
        </DashboardBrandingCommonLayout>
      </div>
    </>
  );
};

export default EventLandingPage;
