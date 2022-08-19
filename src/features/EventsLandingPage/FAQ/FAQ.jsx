import { DoctContainer } from '@doct-react/core';
import React from 'react';
// import SectionHeader from './SectionHeader';
import './Faq.scss';
import QuestionAndAnswers from './QuestionAndAnswers';

const FAQ = () => {
  return (
    <DoctContainer>
      {/* <SectionHeader /> */}
      <QuestionAndAnswers />
    </DoctContainer>
  );
};

export default FAQ;
