import React, { useRef } from 'react';
import '../../styles/components/Quiz.css';

const InputQuiz = ({ currentCharacter, answered, isCorrect, userAnswer, setUserAnswer, handleSubmit, handleNext, inputRef }) => {
  

  

  return (
    <>
      <div className="question">
        <h2>이 히라가나의 로마자는?</h2>
        <div className="hiragana-display">{currentCharacter.hiragana}</div>
      </div>

      <form onSubmit={handleSubmit} className="answer-form">
        <input
          ref={inputRef}
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="로마자를 입력하세요"
          className={`answer-input ${answered ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
          disabled={answered}
          autoFocus
        />
        
        {!answered && (
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={!userAnswer.trim()}
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
                    틀렸습니다. 정답: {currentCharacter.romaji}
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
    </>
  );
};

export default InputQuiz;
