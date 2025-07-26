import React from 'react';
import '../../../styles/components/Quiz.css';

const QuizResult = ({ 
  score, 
  totalQuestions, 
  onRestart, 
  onBackToSelector,
  restartButtonRef 
}) => {
  const getScorePercentage = () => {
    return Math.round((score / totalQuestions) * 100);
  };

  const getScoreEmoji = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return '🌟';
    if (percentage >= 80) return '👏';
    if (percentage >= 70) return '💪';
    if (percentage >= 60) return '📚';
    return '🔥';
  };

  const getResultMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return '완벽해요! 🌟';
    if (percentage >= 80) return '잘했어요! 👏';
    if (percentage >= 70) return '좋은 결과예요! 💪';
    if (percentage >= 60) return '더 연습해봐요! 📚';
    return '다시 도전해보세요! 🔥';
  };

  return (
    <div className="quiz-complete">
      <div className="result-card">
        <h2>퀴즈 완료! {getScoreEmoji()}</h2>
        <div className="final-score">
          <div className="score-number">{score}/{totalQuestions}</div>
          <div className="score-percentage">({getScorePercentage()}%)</div>
        </div>
        <div className="result-message">
          {getResultMessage()}
        </div>
        <div className="quiz-actions">
          <button 
            ref={restartButtonRef}
            className="restart-btn" 
            onClick={onRestart}
          >
            다시 도전하기
          </button>
          <button className="back-btn" onClick={onBackToSelector}>
            히라가나 선택으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult; 