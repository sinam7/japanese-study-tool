import React, { useEffect, useRef } from 'react';
import InputQuiz from './InputQuiz';
import ChoiceQuiz from './ChoiceQuiz';
import useQuiz from '../../hooks/useQuiz';
import '../../styles/components/Quiz.css';

const QuizContainer = ({ selectedCharacters, quizSettings, onBackToSelector }) => {
  const { 
    currentQuestionIndex,
    userAnswer,
    setUserAnswer,
    score,
    answered,
    setAnswered,
    isCorrect,
    setIsCorrect,
    quizComplete,
    setQuizComplete,
    shuffledCharacters,
    choices,
    selectedChoice,
    setSelectedChoice,
    autoSubmit,
    setAutoSubmit,
    currentCharacter,
    handleSubmit,
    handleNext,
    handleRestart,
    getScorePercentage,
    getScoreEmoji,
  } = useQuiz(selectedCharacters, quizSettings);

  const nextButtonRef = useRef(null);
  const restartButtonRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (answered && nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  }, [answered]);

  useEffect(() => {
    if (quizComplete && restartButtonRef.current) {
      restartButtonRef.current.focus();
    }
  }, [quizComplete]);

  useEffect(() => {
    if (!answered && !quizComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestionIndex, answered, quizComplete]);

  // Global keydown for Enter to handle next/restart
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Enter' && !e.target.matches('input')) {
        e.preventDefault();
        if (quizComplete) {
          handleRestart();
        } else if (answered) {
          handleNext();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [answered, quizComplete, handleNext, handleRestart]);

  if (quizComplete) {
    return (
      <div className="quiz-complete">
        <div className="result-card">
          <h2>퀴즈 완료! {getScoreEmoji()}</h2>
          <div className="final-score">
            <div className="score-number">{score}/{shuffledCharacters.length}</div>
            <div className="score-percentage">({getScorePercentage()}%)</div>
          </div>
          <div className="result-message">
            {getScorePercentage() >= 90 ? '완벽해요! 🌟' :
             getScorePercentage() >= 80 ? '잘했어요! 👏' :
             getScorePercentage() >= 70 ? '좋은 결과예요! 💪' :
             getScorePercentage() >= 60 ? '더 연습해봐요! 📚' :
             '다시 도전해보세요! 🔥'}
          </div>
          <div className="quiz-actions">
            <button 
              ref={restartButtonRef}
              className="restart-btn" 
              onClick={handleRestart}
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
  }

  if (!currentCharacter) {
    return (
      <div className="quiz-loading">
        <p>퀴즈를 준비하고 있습니다...</p>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-header">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestionIndex + 1) / shuffledCharacters.length) * 100}%` }}
          ></div>
        </div>
        <div className="quiz-info">
          <span className="question-number">
            {currentQuestionIndex + 1} / {shuffledCharacters.length}
          </span>
          <span className="current-score">
            점수: {score}/{currentQuestionIndex + (answered ? 1 : 0)}
          </span>
        </div>
      </div>

      <div className="question-card">
        {quizSettings.type === 'input' ? (
          <InputQuiz
            currentCharacter={currentCharacter}
            answered={answered}
            isCorrect={isCorrect}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            handleSubmit={handleSubmit}
            handleNext={handleNext}
            inputRef={inputRef}
          />
        ) : (
          <ChoiceQuiz
            currentCharacter={currentCharacter}
            answered={answered}
            isCorrect={isCorrect}
            choices={choices}
            selectedChoice={selectedChoice}
            setSelectedChoice={setSelectedChoice}
            handleSubmit={handleSubmit}
            handleNext={handleNext}
            autoSubmit={autoSubmit}
            setAutoSubmit={setAutoSubmit}
          />
        )}
      </div>

      <div className="quiz-controls">
        <button className="back-btn" onClick={onBackToSelector}>
          선택 화면으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default QuizContainer;
