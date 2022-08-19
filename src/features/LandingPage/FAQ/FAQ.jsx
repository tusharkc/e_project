import { DoctContainer } from '@doct-react/core';
import React from 'react';
import SectionHeader from './SectionHeader';
import './Faq.scss';
import QuestionsAndAnswers from './QuestionsAndAnswers';

const FAQ = () => {
  return (
    <DoctContainer>
      <SectionHeader />
      <QuestionsAndAnswers />
    </DoctContainer>
  );
};

export default FAQ;
