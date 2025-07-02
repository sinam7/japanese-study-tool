import React, { useState, useEffect, useCallback, useRef } from 'react';
import { hiraganaData } from '../data/hiragana';
import './Quiz.css';

const Quiz = ({ selectedCharacters, quizSettings, onBackToSelector }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [shuffledCharacters, setShuffledCharacters] = useState([]);
  const [choices, setChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [autoSubmit, setAutoSubmit] = useState(quizSettings.autoSubmit || true);
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

  // 모든 히라가나 데이터를 평면화
  const getAllCharacters = useCallback(() => {
    return hiraganaData
      .flatMap(row => row.characters)
      .filter(char => char !== null);
  }, []);

  // 선택지 생성 함수
  const generateChoices = useCallback((correctAnswer, choiceCount) => {
    const allCharacters = getAllCharacters();
    const otherCharacters = allCharacters.filter(
      char => char.hiragana !== correctAnswer.hiragana
    );
    
    // 필요한 오답 개수 계산
    const wrongAnswersNeeded = choiceCount - 1;
    const shuffledOthers = shuffleArray(otherCharacters);
    const wrongAnswers = shuffledOthers.slice(0, wrongAnswersNeeded);
    
    // 정답과 오답을 합쳐서 섞기
    const allChoices = [correctAnswer, ...wrongAnswers];
    return shuffleArray(allChoices);
  }, [getAllCharacters, shuffleArray]);

  // 퀴즈 초기화
  useEffect(() => {
    if (selectedCharacters.length > 0) {
      const shuffled = shuffleArray(selectedCharacters);
      setShuffledCharacters(shuffled);
      setCurrentQuestionIndex(0);
      setScore(0);
      setAnswered(false);
      setQuizComplete(false);
      setUserAnswer('');
      setSelectedChoice(null);
      setAutoSubmit(quizSettings.autoSubmit || true);
      
      // 선택형 퀴즈인 경우 첫 번째 문제의 선택지 생성
      if (quizSettings.type === 'choice' && shuffled.length > 0) {
        setChoices(generateChoices(shuffled[0], quizSettings.choiceCount));
      }
    }
  }, [selectedCharacters, quizSettings, shuffleArray, generateChoices]);

  const currentCharacter = shuffledCharacters[currentQuestionIndex];

  // 문제가 바뀔 때마다 선택지 생성 (선택형 퀴즈인 경우)
  useEffect(() => {
    if (quizSettings.type === 'choice' && currentCharacter) {
      setChoices(generateChoices(currentCharacter, quizSettings.choiceCount));
      setSelectedChoice(null);
    }
  }, [currentQuestionIndex, currentCharacter, quizSettings, generateChoices]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (answered) return;

    let correct = false;
    
    if (quizSettings.type === 'input') {
      if (!userAnswer.trim()) return;
      correct = userAnswer.trim().toLowerCase() === currentCharacter.romaji.toLowerCase();
    } else if (quizSettings.type === 'choice') {
      if (selectedChoice === null) return;
      correct = selectedChoice.hiragana === currentCharacter.hiragana;
    }
    
    setIsCorrect(correct);
    setAnswered(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
  }, [answered, userAnswer, selectedChoice, currentCharacter, quizSettings.type]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex + 1 >= shuffledCharacters.length) {
      setQuizComplete(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setSelectedChoice(null);
      setAnswered(false);
      setIsCorrect(false);
    }
  }, [currentQuestionIndex, shuffledCharacters.length]);

  const handleRestart = useCallback(() => {
    const shuffled = shuffleArray(selectedCharacters);
    setShuffledCharacters(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswered(false);
    setQuizComplete(false);
    setUserAnswer('');
    setSelectedChoice(null);
    setIsCorrect(false);
    setAutoSubmit(quizSettings.autoSubmit || true);
    
    // 선택형 퀴즈인 경우 첫 번째 문제의 선택지 생성
    if (quizSettings.type === 'choice' && shuffled.length > 0) {
      setChoices(generateChoices(shuffled[0], quizSettings.choiceCount));
    }
  }, [selectedCharacters, quizSettings, shuffleArray, generateChoices]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!answered) {
        if (quizSettings.type === 'input' && userAnswer.trim()) {
          handleSubmit(e);
        } else if (quizSettings.type === 'choice' && selectedChoice !== null) {
          handleSubmit(e);
        }
      } else if (answered) {
        handleNext();
      }
    }
  }, [answered, userAnswer, selectedChoice, quizSettings.type, handleSubmit, handleNext]);

  // 전체 화면에서 키보드 이벤트 감지
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Enter' && !e.target.matches('input')) {
        e.preventDefault();
        if (quizComplete) {
          handleRestart();
        } else if (!answered) {
          if (quizSettings.type === 'input' && userAnswer.trim()) {
            handleSubmit(e);
          } else if (quizSettings.type === 'choice' && selectedChoice !== null) {
            handleSubmit(e);
          }
        } else if (answered) {
          handleNext();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [answered, userAnswer, selectedChoice, quizComplete, quizSettings.type, handleSubmit, handleNext, handleRestart]);

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

  // 선택지 클릭 핸들러
  const handleChoiceClick = useCallback((choice) => {
    if (answered) return;
    setSelectedChoice(choice);
  }, [answered]);

  // 선택형 퀴즈에서 자동 제출 처리
  useEffect(() => {
    if (quizSettings.type === 'choice' && 
        autoSubmit && 
        selectedChoice !== null && 
        !answered) {
      setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} };
        handleSubmit(fakeEvent);
      }, 150); // 선택 애니메이션을 볼 수 있게 딜레이
    }
  }, [selectedChoice, quizSettings.type, autoSubmit, answered, handleSubmit]);

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
        
        {quizSettings.type === 'choice' && (
          <div className="quiz-toggle-container">
            <label className="quiz-toggle-label">
              <input
                type="checkbox"
                checked={autoSubmit}
                onChange={(e) => setAutoSubmit(e.target.checked)}
                className="quiz-toggle-checkbox"
              />
              <span className="quiz-toggle-switch"></span>
              <span className="quiz-toggle-text">즉시 제출</span>
            </label>
          </div>
        )}
      </div>

      <div className="question-card">
        <div className="question">
          {quizSettings.type === 'input' ? (
            <>
              <h2>이 히라가나의 로마자는?</h2>
              <div className="hiragana-display">{currentCharacter.hiragana}</div>
            </>
          ) : (
            <>
              <h2>이 로마자의 히라가나는?</h2>
              <div className="romaji-display">{currentCharacter.romaji}</div>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="answer-form">
          {quizSettings.type === 'input' ? (
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
          ) : (
            <div className="choices-container">
              {choices.map((choice, index) => (
                <button
                  key={index}
                  type="button"
                  className={`choice-btn ${
                    selectedChoice === choice ? 'selected' : ''
                  } ${
                    answered 
                      ? choice.hiragana === currentCharacter.hiragana 
                        ? 'correct' 
                        : selectedChoice === choice 
                          ? 'incorrect' 
                          : 'disabled'
                      : ''
                  }`}
                  onClick={() => handleChoiceClick(choice)}
                  disabled={answered}
                >
                  {choice.hiragana}
                </button>
              ))}
            </div>
          )}
          
          {!answered && !(quizSettings.type === 'choice' && autoSubmit) && (
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={
                quizSettings.type === 'input' 
                  ? !userAnswer.trim() 
                  : selectedChoice === null
              }
            >
              답안 제출
            </button>
          )}
          
          {answered && (
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
                    <span>
                      틀렸습니다. 정답: {
                        quizSettings.type === 'input' 
                          ? currentCharacter.romaji 
                          : currentCharacter.hiragana
                      }
                    </span>
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