import React, { useState } from 'react';
import QuestionsAndAnswersModal from './components/QuestionsAndAnswersModal';
import { questionAndAnswerData } from './components/questionAndAnswerData';

const QuestionsAndAnswers = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <p className="text-center events_landingpage_questions_section_text">
        {' '}
        Frequently Asked Questions
      </p>
      <div className="for_top_line"></div>
      {questionAndAnswerData.map((item, index) => {
        return (
          <QuestionsAndAnswersModal
            key={index}
            questions={item.question}
            answers={item.answer}
            id={item.id}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        );
      })}
    </>
  );
};

export default QuestionsAndAnswers;
