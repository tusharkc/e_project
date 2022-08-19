import { DoctCol, DoctContainer, DoctRow } from '@doct-react/core';
import React from 'react';
import NumberCards from './components/NumberCards';
import { numberStaticData } from './components/numberStaticData';
import './NumberSection.scss';
import bgIllustration from '../../../assets/images/landing_page/landing_page_illustrations/numbers_illustrations.svg';
import { useEffect } from 'react';
import { CONTENT_CENTER, STATISTICS_DATA } from '../../../api/apiEndpoints';
import { useState } from 'react';

const useStatisticData = () => {
  const DEFAULT_STATISTIC = {
    associationsCount: '200+',
    blogsCount: '150+',
    coursesCount: '18000+',
    eventsCount: '150+',
    hospitalsCount: '8000+',
    instituesCount: '3500+',
    jobsCount: '20000+',
    resume: '35000+',
    recruiters: '6000+',
  };

  const [statisticData, setStatisticData] = useState(DEFAULT_STATISTIC);

  useEffect(() => {
    async function fetchStatisticData() {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_API_URL}${CONTENT_CENTER}/${STATISTICS_DATA}`,
      );
      response = await response.json();
      setStatisticData({ ...DEFAULT_STATISTIC, ...response }); // Some value is not returning from BE so keep default value for that
    }

    fetchStatisticData();
  }, []);

  return { statisticData };
};

const NumbersSection = () => {
  const { statisticData } = useStatisticData();

  return (
    <div className="position-relative">
      <DoctContainer>
        <p className="text-center text-grey-600 number_section_info_heading">
          The power of digital healthcare platform..
        </p>
        <img
          alt="bg_illustration"
          src={bgIllustration}
          className="position-absolute bg_illustration_numbers"
        />
        <DoctRow>
          {numberStaticData.map((cardElement, index) => {
            return (
              <DoctCol key={index} sm={4}>
                <NumberCards
                  numbersTextColor={cardElement.numbersTextColor}
                  platformNameColor={cardElement.platformNameColor}
                  platformName={cardElement.platformName}
                  cardBgColor={cardElement.cardBgColor}
                  cardCount={statisticData[cardElement?.dataAccessKey]}
                  hasBorderColor={cardElement.hasBorderColor}
                  cardBorderColor={cardElement.cardBorderColor}
                />
              </DoctCol>
            );
          })}

          <DoctCol sm={6}>
            <div className="traffic_every_month_card p-4 m-3">
              <h2 className="font-weight-bold number_section_count text-primary">2,00,000+</h2>
              <h3 className="font-weight-bold">Traffic every month</h3>
            </div>
          </DoctCol>

          <DoctCol sm={6}>
            <div className="users_every_month_card p-4 m-3">
              <h2 className="font-weight-bold number_section_count text-primary">75,000+</h2>
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="font-weight-bold">Users</h3>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={process.env.REACT_APP_ACCOUNT_APP_BUSINESS_LINK}
                >
                  <button className="join_docthub_btn text-primary cursor-pointer">
                    Join Docthub&gt;
                  </button>
                </a>
              </div>
            </div>
          </DoctCol>
        </DoctRow>
      </DoctContainer>
    </div>
  );
};

export default NumbersSection;
