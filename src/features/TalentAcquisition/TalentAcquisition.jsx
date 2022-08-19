import { Helmet } from 'react-helmet';

import { LayoutCommon } from '../../layout';

import {
  Banner,
  HowDocthubIsDifferentSection,
  HowWeGonnaDoItSection,
  OurPartnersSection,
  PricingModel,
  ReasonToTrust,
  WhatWeProvide,
  SectionTestimonials,
  Form,
  SectionCTA,
} from './components';

import './TalentAcquisition.scss';

const meta = {
  title:
    'Hospital Recruitment Services | Healthcare Recruitment Consultancy | Docthub Talent Acquisition Services',
  description:
    'We are one of the best Hospital Recruitment agencies. Our Healthcare Staffing companies recruiters are from medical background to hire the best Healthcare staff for your organization. Find Qualified Doctors, Nurses, Pharmacist, and other Healthcare Professionals for various position on time!',
  keywords:
    'Talent Acquisition Consultancy, Talent Acquisition Specialist, Talent Acquisition companies in India, Talent Acquisition Consultancy Docthub, perfect recruitment solutions, talent acquisition consulting contact details, talent acquisition contact number, Hospital staffing, Healthcare Staffing agency, hospital staffing agency, hospital recruitment agency, medical recruitment services',
};

export default function TalentAcquisition() {
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta property="og:title" content={meta.title}></meta>
        <meta property="og:description" content={meta.description}></meta>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Helmet>
      <LayoutCommon>
        <main className="page_talent_acquisition">
          <Banner />
          <WhatWeProvide />
          <HowWeGonnaDoItSection />
          <HowDocthubIsDifferentSection />
          <ReasonToTrust />
          <OurPartnersSection />
          <PricingModel />
          <SectionTestimonials />
          <Form />
          <SectionCTA />
        </main>
      </LayoutCommon>
    </>
  );
}
