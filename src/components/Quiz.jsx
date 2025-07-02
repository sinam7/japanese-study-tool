import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Quiz.css';

const Quiz = ({ selectedCharacters, onBackToSelector }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [shuffledCharacters, setShuffledCharacters] = useState([]);
  const nextButtonRef = useRef(null);
  const restartButtonRef = useRef(null);
  const inputRef = useRef(null);

  // 배열을 섞는 함수
  const shuffleArray = useCallback((array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }, []);

  // 퀴즈 초기화
  useEffect(() => {
    if (selectedCharacters.length > 0) {
      setShuffledCharacters(shuffleArray(selectedCharacters));
      setCurrentQuestionIndex(0);
      setScore(0);
      setAnswered(false);
      setQuizComplete(false);
      setUserAnswer('');
    }
  }, [selectedCharacters, shuffleArray]);

  const currentCharacter = shuffledCharacters[currentQuestionIndex];

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (answered || !userAnswer.trim()) return;

    const correct = userAnswer.trim().toLowerCase() === currentCharacter.romaji.toLowerCase();
    setIsCorrect(correct);
    setAnswered(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
  }, [answered, userAnswer, currentCharacter]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex + 1 >= shuffledCharacters.length) {
      setQuizComplete(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setAnswered(false);
      setIsCorrect(false);
    }
  }, [currentQuestionIndex, shuffledCharacters.length]);

  const handleRestart = useCallback(() => {
    setShuffledCharacters(shuffleArray(selectedCharacters));
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswered(false);
    setQuizComplete(false);
    setUserAnswer('');
    setIsCorrect(false);
  }, [selectedCharacters, shuffleArray]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!answered && userAnswer.trim()) {
        handleSubmit(e);
      } else if (answered) {
        handleNext();
      }
    }
  }, [answered, userAnswer, handleSubmit, handleNext]);

  // 전체 화면에서 키보드 이벤트 감지
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Enter' && !e.target.matches('input')) {
        e.preventDefault();
        if (quizComplete) {
          handleRestart();
        } else if (!answered && userAnswer.trim()) {
          handleSubmit(e);
        } else if (answered) {
          handleNext();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [answered, userAnswer, quizComplete, handleSubmit, handleNext, handleRestart]);

  // 답변 완료 후 다음 버튼에 포커스
  useEffect(() => {
    if (answered && nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  }, [answered]);

  // 퀴즈 완료 후 다시 도전하기 버튼에 포커스
  useEffect(() => {
    if (quizComplete && restartButtonRef.current) {
      restartButtonRef.current.focus();
    }
  }, [quizComplete]);

  // 새 문제 시작 시 입력 필드에 포커스
  useEffect(() => {
    if (!answered && !quizComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestionIndex, answered, quizComplete]);

  const getScorePercentage = () => {
    return Math.round((score / shuffledCharacters.length) * 100);
  };

  const getScoreEmoji = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return '🎉';
    if (percentage >= 80) return '😊';
    if (percentage >= 70) return '👍';
    if (percentage >= 60) return '😐';
    return '😅';
  };

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
            onKeyDown={handleKeyDown}
            placeholder="로마자를 입력하세요"
            className={`answer-input ${answered ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
            disabled={answered}
            autoFocus
          />
          
          {!answered ? (
            <button type="submit" className="submit-btn" disabled={!userAnswer.trim()}>
              답안 제출
            </button>
          ) : (
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
                    <span>틀렸습니다. 정답: {currentCharacter.romaji}</span>
                  </>
                )}
              </div>
              <button 
                ref={nextButtonRef}
                className="next-btn" 
                onClick={handleNext}
              >
                {currentQuestionIndex + 1 >= shuffledCharacters.length ? '결과 보기' : '다음 문제'}
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="quiz-controls">
        <button className="back-btn" onClick={onBackToSelector}>
          선택 화면으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default Quiz; 