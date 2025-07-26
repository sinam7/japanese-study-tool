import React from 'react';
import '../../styles/components/Quiz.css';

const ChoiceQuiz = ({ currentCharacter, answered, isCorrect, choices, selectedChoice, setSelectedChoice, handleSubmit, handleNext, autoSubmit, setAutoSubmit }) => {
  return (
    <>
      <div className="question">
        <h2>이 로마자의 히라가나는?</h2>
        <div className="romaji-display">{currentCharacter.romaji}</div>
      </div>

      <form onSubmit={handleSubmit} className="answer-form">
        <div className="choices-container">
          {choices.map((choice, index) => (
            <button
              key={index}
              type="button"
              className={`choice-btn ${
                selectedChoice === choice ? 'selected' : ''
              } ${
                answered 
                  ? choice.hiragana === currentCharacter.hiragana 
                    ? 'correct' 
                    : selectedChoice === choice 
                      ? 'incorrect' 
                      : 'disabled'
                  : ''
              }`}
              onClick={() => setSelectedChoice(choice)}
              disabled={answered}
            >
              {choice.hiragana}
            </button>
          ))}
        </div>
        
        {!answered && !autoSubmit && (
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={selectedChoice === null}
          >
            답안 제출
          </button>
        )}
        
        {answered && (
          <div className="result">
            <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? (
                <>
                  <span className="result-icon">✅</span>
                  <span>정답입니다!</span>
                </>
              ) : (
                <>
                  <span className="result-icon">❌</span>
                  <span>
                    틀렸습니다. 정답: {currentCharacter.hiragana}
                  </span>
                </>
              )}
            </div>
            <button 
              className="next-btn" 
              onClick={handleNext}
            >
              다음 문제
            </button>
          </div>
        )}
      </form>

      <div className="quiz-toggle-container">
        <label className="quiz-toggle-label">
          <input
            type="checkbox"
            checked={autoSubmit}
            onChange={(e) => setAutoSubmit(e.target.checked)}
            className="quiz-toggle-checkbox"
          />
          <span className="quiz-toggle-switch"></span>
          <span className="quiz-toggle-text">즉시 제출</span>
        </label>
      </div>
    </>
  );
};

export default ChoiceQuiz;
