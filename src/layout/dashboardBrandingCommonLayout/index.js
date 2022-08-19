import React from 'react';
import { CommonLayoutFooter } from '../components';
import LandingPageHeader from './LandingPageHeader/LandingPageHeader';

const DashboardBrandingCommonLayout = ({ children }) => {
  return (
    <>
      <LandingPageHeader />
      {children}
      <CommonLayoutFooter />
    </>
  );
};

export default DashboardBrandingCommonLayout;
