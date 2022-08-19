import React, { useState } from 'react';
import questionModalIcon from '../../../../assets/icons/question_modal_icon.svg';

const QuestionsAndAnswersModal = ({ questions, answers, id, selectedId, setSelectedId }) => {
  return (
    <>
      <div
        onClick={() => {
          setSelectedId(id);
          if (selectedId == id) {
            setSelectedId(null);
          }
        }}
        className="cursor-pointer questions_modal_container mx-auto"
      >
        <div className="d-flex align-content-center justify-content-between">
          <p className="modal_questions px-3">{questions}</p>
          <img
            alt="dropdown_icon"
            src={questionModalIcon}
            className={`${id == selectedId ? 'modal_open' : 'modal_close'} px-3`}
          />
        </div>
        {id == selectedId && (
          <p
            className="modal_answers text-grey-600 px-3"
            dangerouslySetInnerHTML={{ __html: answers }}
          ></p>
        )}
      </div>
    </>
  );
};

export default QuestionsAndAnswersModal;
