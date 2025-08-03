import React from 'react';
import styles from './QuizSettings.module.css';

const QuizSettings = ({ 
  quizType, 
  setQuizType, 
  choiceCount, 
  setChoiceCount 
}) => {
  return (
    <div className={styles.quizSettings}>
      <h3>퀴즈 설정</h3>
      <div className={styles.settingGroup}>
        <label>퀴즈 타입:</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioOption}>
            <input
              type="radio"
              value="input"
              checked={quizType === 'input'}
              onChange={(e) => setQuizType(e.target.value)}
            />
            <span>입력형 (히라가나 → 로마자 입력)</span>
          </label>
          <label className={styles.radioOption}>
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
        <div className={styles.settingGroup}>
          <label>선택지 개수:</label>
          <div className={styles.choiceCountButtons}>
            {[3, 4, 5].map(count => (
              <button
                key={count}
                className={`${styles.choiceCountBtn} ${choiceCount === count ? styles.active : ''}`}
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