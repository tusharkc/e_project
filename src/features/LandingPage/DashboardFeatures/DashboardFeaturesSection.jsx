import { DoctCol, DoctContainer, DoctRow } from '@doct-react/core';
import React from 'react';
import DashboardFeaturesCard from './Components/DashboardFeaturesCard';
import { featuresData } from './Components/featuresStaticData';
import './DashboardFeatures.scss';

const DashboardFeaturesSection = () => {
  return (
    <DoctContainer>
      <div className="here_you_can_section_container">
        <h2 className="section-features-title text-center mb-5">Here you can</h2>
        <DoctRow>
          {featuresData.map((item, index) => {
            return (
              <DoctCol sm={4} className="mx-auto" key={index}>
                <DashboardFeaturesCard
                  title={item.title}
                  subtitle={item.subtitle}
                  image={item.image}
                  id={index}
                />
              </DoctCol>
            );
          })}
        </DoctRow>
      </div>
    </DoctContainer>
  );
};

export default DashboardFeaturesSection;
