import React from 'react';
import DashboardBrandingCommonLayout from '../../layout/dashboardBrandingCommonLayout/';
import { Banner } from './BannerSection';
import CallToAction from './CallToAction/CallToAction';
import Clientele from './ClienteleSection/Clientele';
import DashboardExplainationVideo from './DashboardExplainationVideo/DashboardExplainationVideo';
import DashboardFeaturesSection from './DashboardFeatures/DashboardFeaturesSection';
import FAQ from './FAQ';
import './Global.LandingPage.scss';
import ServingSegments from './ServingSegments/ServingSegments';
import TestimonialSection from './TestimonialSection/TestimonialSection';
import NumbersSection from './TotalNumbers/NumbersSection';

const LandingPage = () => {
  return (
    <div className="landingpage_body">
      <DashboardBrandingCommonLayout>
        <Banner />
        <DashboardFeaturesSection />
        {/* <DashboardExplainationVideo /> */}
        <CallToAction />
        <ServingSegments />
        <NumbersSection />
        <Clientele />
        <TestimonialSection />
        <FAQ />
      </DashboardBrandingCommonLayout>
    </div>
  );
};

export default LandingPage;
