import React from 'react';
import '../../../styles/components/Quiz.css';

const QuizProgress = ({ 
  currentQuestionIndex, 
  totalQuestions, 
  score 
}) => {
  return (
    <div className="quiz-header">
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
        ></div>
      </div>
      <div className="quiz-info">
        <span className="question-number">
          {currentQuestionIndex + 1} / {totalQuestions}
        </span>
        <span className="current-score">
          점수: {score}/{currentQuestionIndex + 1}
        </span>
      </div>
    </div>
  );
};

export default QuizProgress; 