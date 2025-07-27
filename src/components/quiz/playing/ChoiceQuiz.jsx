import React from 'react';
import styles from './ChoiceQuiz.module.css';
import sharedStyles from './shared.module.css';

const ChoiceQuiz = ({ currentCharacter, answered, isCorrect, choices, selectedChoice, setSelectedChoice, handleSubmit, handleNext, autoSubmit, setAutoSubmit }) => {
  return (
    <>
      <div className={sharedStyles.question}>
        <h2>이 로마자의 히라가나는?</h2>
        <div className={styles.romajiDisplay}>{currentCharacter.romaji}</div>
      </div>

      <form onSubmit={handleSubmit} className={sharedStyles.answerForm}>
        <div className={styles.choicesContainer}>
          {choices.map((choice, index) => (
            <button
              key={choice.hiragana}
              type="button"
              className={`${styles.choiceBtn} ${
                selectedChoice === choice ? styles.selected : ''
              } ${
                answered 
                  ? choice.hiragana === currentCharacter.hiragana 
                    ? styles.correct 
                    : selectedChoice === choice 
                      ? styles.incorrect 
                      : styles.disabled
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
            className={sharedStyles.submitBtn}
            disabled={selectedChoice === null}
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
                    틀렸습니다. 정답: {currentCharacter.hiragana}
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

      <div className={styles.quizToggleContainer}>
        <label className={styles.quizToggleLabel}>
          <input
            type="checkbox"
            checked={autoSubmit}
            onChange={(e) => setAutoSubmit(e.target.checked)}
            className={styles.quizToggleCheckbox}
          />
          <span className={styles.quizToggleSwitch}></span>
          <span className={styles.quizToggleText}>즉시 제출</span>
        </label>
      </div>
    </>
  );
};

export default ChoiceQuiz;
