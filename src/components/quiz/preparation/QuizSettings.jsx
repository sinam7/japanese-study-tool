import React from 'react';
import '../../../styles/components/HiraganaSelector.css';

const QuizSettings = ({ 
  quizType, 
  setQuizType, 
  choiceCount, 
  setChoiceCount 
}) => {
  return (
    <div className="quiz-settings">
      <h3>퀴즈 설정</h3>
      <div className="setting-group">
        <label>퀴즈 타입:</label>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              value="input"
              checked={quizType === 'input'}
              onChange={(e) => setQuizType(e.target.value)}
            />
            <span>입력형 (히라가나 → 로마자 입력)</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              value="choice"
              checked={quizType === 'choice'}
              onChange={(e) => setQuizType(e.target.value)}
            />
            <span>선택형 (로마자 → 히라가나 선택)</span>
          </label>
        </div>
      </div>
      
      {quizType === 'choice' && (
        <div className="setting-group">
          <label>선택지 개수:</label>
          <div className="choice-count-buttons">
            {[3, 4, 5].map(count => (
              <button
                key={count}
                className={`choice-count-btn ${choiceCount === count ? 'active' : ''}`}
                onClick={() => setChoiceCount(count)}
              >
                {count}개
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizSettings; 