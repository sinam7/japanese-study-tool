import React from 'react';
import styles from './QuizProgress.module.css';

const QuizProgress = ({ 
  currentQuestionIndex, 
  totalQuestions, 
  score 
}) => {
  return (
    <div className={styles.quizHeader}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>
      <div className={styles.quizInfo}>
        <span className={styles.questionNumber}>
          {currentQuestionIndex + 1} / {totalQuestions}
        </span>
        <span className={styles.currentScore}>
          점수: {score}/{currentQuestionIndex + 1}
        </span>
      </div>
    </div>
  );
};

export default QuizProgress; 