import React, { useMemo } from 'react';
import styles from './QuizResult.module.css';
import sharedStyles from './shared.module.css';

const QuizResult = ({ 
  score, 
  totalQuestions, 
  onRestart, 
  onBackToSelector,
  restartButtonRef 
}) => {
  const scorePercentage = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return Math.round((score / totalQuestions) * 100);
  }, [score, totalQuestions]);

  const scoreEmoji = useMemo(() => {
    if (scorePercentage >= 90) return '🌟';
    if (scorePercentage >= 80) return '👏';
    if (scorePercentage >= 70) return '💪';
    if (scorePercentage >= 60) return '📚';
    return '🔥';
  }, [scorePercentage]);

  const resultMessage = useMemo(() => {
    if (scorePercentage >= 90) return '완벽해요! 🌟';
    if (scorePercentage >= 80) return '잘했어요! 👏';
    if (scorePercentage >= 70) return '좋은 결과예요! 💪';
    if (scorePercentage >= 60) return '더 연습해봐요! 📚';
    return '다시 도전해보세요! 🔥';
  }, [scorePercentage]);

  return (
    <div className={styles.quizComplete}>
      <div className={styles.resultCard}>
        <h2>퀴즈 완료! {scoreEmoji}</h2>
        <div className={styles.finalScore}>
          <div className={styles.scoreNumber}>{score}/{totalQuestions}</div>
          <div className={styles.scorePercentage}>({scorePercentage}%)</div>
        </div>
        <div className={styles.resultMessage}>
          {resultMessage}
        </div>
        <div className={styles.quizActions}>
          <button 
            ref={restartButtonRef}
            className={styles.restartBtn}
            onClick={onRestart}
          >
            다시 도전하기
          </button>
          <button className={sharedStyles.backBtn} onClick={onBackToSelector}>
            히라가나 선택으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult; 