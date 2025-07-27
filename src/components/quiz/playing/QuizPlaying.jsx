import React, { useEffect, useRef } from 'react';
import QuizProgress from './QuizProgress';
import InputQuiz from './InputQuiz';
import ChoiceQuiz from './ChoiceQuiz';
import QuizResult from './QuizResult';
import useQuiz from '../../../hooks/useQuiz';
import styles from './QuizPlaying.module.css';
import sharedStyles from './shared.module.css';

const QuizPlaying = ({ selectedCharacters, quizSettings, onBackToSelector }) => {
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
      <QuizResult
        score={score}
        totalQuestions={shuffledCharacters.length}
        onRestart={handleRestart}
        onBackToSelector={onBackToSelector}
        restartButtonRef={restartButtonRef}
      />
    );
  }

  if (!currentCharacter) {
    return (
      <div className={styles.quizLoading}>
        <p>퀴즈를 준비하고 있습니다...</p>
      </div>
    );
  }

  return (
    <div className={styles.quiz}>
      <QuizProgress
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={shuffledCharacters.length}
        score={score}
      />

      <div className={styles.questionCard}>
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

      <div className={styles.quizControls}>
        <button className={sharedStyles.backBtn} onClick={onBackToSelector}>
          선택 화면으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default QuizPlaying; 