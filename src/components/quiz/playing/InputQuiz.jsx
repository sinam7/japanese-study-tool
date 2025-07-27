import React, { useRef } from 'react';
import styles from './InputQuiz.module.css';
import sharedStyles from './shared.module.css';

const InputQuiz = ({ currentCharacter, answered, isCorrect, userAnswer, setUserAnswer, handleSubmit, handleNext, inputRef }) => {
  return (
    <>
      <div className={sharedStyles.question}>
        <h2>이 히라가나의 로마자는?</h2>
        <div className={styles.hiraganaDisplay}>{currentCharacter.hiragana}</div>
      </div>

      <form onSubmit={handleSubmit} className={sharedStyles.answerForm}>
        <input
          ref={inputRef}
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="로마자를 입력하세요"
          className={`${styles.answerInput} ${answered ? (isCorrect ? styles.correct : styles.incorrect) : ''}`}
          disabled={answered}
          autoFocus
        />
        
        {!answered && (
          <button 
            type="submit" 
            className={sharedStyles.submitBtn}
            disabled={!userAnswer.trim()}
          >
            답안 제출
          </button>
        )}
        
        {answered && (
          <div className={sharedStyles.result}>
            <div className={`${sharedStyles.resultMessage} ${isCorrect ? sharedStyles.correct : sharedStyles.incorrect}`}>
              {isCorrect ? (
                <>
                  <span className={sharedStyles.resultIcon}>✅</span>
                  <span>정답입니다!</span>
                </>
              ) : (
                <>
                  <span className={sharedStyles.resultIcon}>❌</span>
                  <span>
                    틀렸습니다. 정답: {currentCharacter.romaji}
                  </span>
                </>
              )}
            </div>
            <button 
              className={sharedStyles.nextBtn}
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
