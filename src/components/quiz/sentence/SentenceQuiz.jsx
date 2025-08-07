import React, { useState, useEffect, useRef } from 'react';
import { extractHiraganaFromSentence, checkAnswer } from '../../../utils/hiraganaUtils';
import styles from './SentenceQuiz.module.css';

const SentenceQuiz = () => {
  const [inputSentence, setInputSentence] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizCharacters, setQuizCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [wasCorrect, setWasCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // 입력란 자동 포커스를 위한 ref
  const answerInputRef = useRef(null);

  // 문장에서 히라가나 문자들을 추출하고 퀴즈 생성
  const generateQuizFromSentence = () => {
    setErrorMessage(''); // 에러 메시지 초기화
    
    if (!inputSentence.trim()) {
      setErrorMessage('히라가나 문장을 입력해주세요!');
      return;
    }

    const characters = extractHiraganaFromSentence(inputSentence);

    if (characters.length === 0) {
      setErrorMessage('유효한 히라가나 문자가 없습니다!');
      return;
    }

    // 문자 순서 섞기
    const shuffledCharacters = [...characters].sort(() => Math.random() - 0.5);
    
    setQuizCharacters(shuffledCharacters);
    setCurrentIndex(0);
    setScore(0);
    setIsQuizActive(true);
    setShowResult(false);
    setFeedback('');
    setWasCorrect(false);
    setUserAnswer('');
    setErrorMessage('');
    
    // 퀴즈 시작 후 잠깐 뒤에 포커스
    setTimeout(() => {
      if (answerInputRef.current) {
        answerInputRef.current.focus();
      }
    }, 200);
  };

  // 현재 퀴즈 문제 설정
  useEffect(() => {
    if (isQuizActive && quizCharacters.length > 0 && currentIndex < quizCharacters.length) {
      setCurrentQuiz(quizCharacters[currentIndex]);
      setUserAnswer('');
      setFeedback('');
      setWasCorrect(false);
    }
  }, [isQuizActive, quizCharacters, currentIndex]);

  // 새 문제가 시작될 때 입력란에 자동 포커스
  useEffect(() => {
    if (currentQuiz && !feedback && answerInputRef.current) {
      // 짧은 지연 후 포커스 (애니메이션 완료 후)
      const timer = setTimeout(() => {
        answerInputRef.current.focus();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [currentQuiz, feedback]);

  // 답안 제출
  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      setFeedback('답을 입력해주세요!');
      setWasCorrect(false);
      return;
    }

    const isCorrect = checkAnswer(userAnswer, currentQuiz.romaji);
    setWasCorrect(isCorrect);
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('정답입니다! 🎉');
    } else {
      setFeedback(`틀렸습니다. 정답: ${currentQuiz.romaji}`);
    }

    // 1.5초 후 다음 문제로 이동
    setTimeout(() => {
      if (currentIndex + 1 < quizCharacters.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // 퀴즈 완료
        setIsQuizActive(false);
        setShowResult(true);
      }
    }, 1500);
  };

  // 퀴즈 재시작
  const restartQuiz = () => {
    setIsQuizActive(false);
    setShowResult(false);
    setCurrentIndex(0);
    setScore(0);
    setUserAnswer('');
    setFeedback('');
    setWasCorrect(false);
    setQuizCharacters([]);
    setCurrentQuiz(null);
    setErrorMessage('');
  };

  // Enter 키로 답안 제출
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !showResult && currentQuiz) {
      handleSubmitAnswer();
    }
  };

  return (
    <div className={styles.sentenceQuiz}>
      <div className={styles.header}>
        <h2 className={styles.title}>히라가나 문장 테스트</h2>
        <p className={styles.description}>
          히라가나로 이루어진 문장을 입력하고, 각 문자의 로마자를 맞춰보세요!
        </p>
      </div>

      {!isQuizActive && !showResult && (
        <div className={styles.inputSection}>
          <div className={styles.inputGroup}>
            <label htmlFor="sentence" className={styles.label}>
              히라가나 문장을 입력하세요:
            </label>
            <input
              type="text"
              id="sentence"
              value={inputSentence}
              onChange={(e) => setInputSentence(e.target.value)}
              placeholder="예: おはよう、きょうはいいてんきですね"
              className={styles.sentenceInput}
            />
            <button 
              onClick={generateQuizFromSentence}
              className={styles.startButton}
              disabled={!inputSentence.trim()}
            >
              테스트 시작하기
            </button>
            {errorMessage && (
              <div className={styles.errorMessage}>
                {errorMessage}
              </div>
            )}
          </div>
          
          <div className={styles.exampleSection}>
            <h3 className={styles.exampleTitle}>예시 문장:</h3>
            <div className={styles.examples}>
              <button 
                onClick={() => setInputSentence('おはよう')}
                className={styles.exampleButton}
              >
                おはよう
              </button>
              <button 
                onClick={() => setInputSentence('きょうはいいてんきですね')}
                className={styles.exampleButton}
              >
                きょうはいいてんきですね
              </button>
              <button 
                onClick={() => setInputSentence('しゅくだいをしました')}
                className={styles.exampleButton}
              >
                しゅくだいをしました
              </button>
            </div>
          </div>
        </div>
      )}

      {isQuizActive && currentQuiz && (
        <div className={styles.quizSection}>
          <div className={styles.progress}>
            <span className={styles.progressText}>
              {currentIndex + 1} / {quizCharacters.length}
            </span>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${((currentIndex + 1) / quizCharacters.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.questionCard}>
            <h3 className={styles.questionTitle}>이 문자의 로마자는?</h3>
            <div className={styles.hiraganaDisplay}>
              {currentQuiz.hiragana}
            </div>
            
            <div className={styles.answerSection}>
              <input
                ref={answerInputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="로마자를 입력하세요"
                className={styles.answerInput}
                disabled={feedback !== ''}
              />
              <button 
                onClick={handleSubmitAnswer}
                className={styles.submitButton}
                disabled={feedback !== '' || !userAnswer.trim()}
              >
                제출
              </button>
            </div>

            {feedback && (
              <div className={`${styles.feedback} ${wasCorrect ? styles.correct : styles.incorrect}`}>
                {feedback}
              </div>
            )}
          </div>

          <div className={styles.scoreDisplay}>
            현재 점수: {score} / {currentIndex + (feedback ? 1 : 0)}
          </div>
        </div>
      )}

      {showResult && (
        <div className={styles.resultSection}>
          <div className={styles.resultCard}>
            <h3 className={styles.resultTitle}>테스트 완료!</h3>
            <div className={styles.finalScore}>
              최종 점수: {score} / {quizCharacters.length}
              <span className={styles.percentage}>
                ({Math.round((score / quizCharacters.length) * 100)}%)
              </span>
            </div>
            
            <div className={styles.resultMessage}>
              {score === quizCharacters.length ? '완벽합니다! 🎉' :
               score >= quizCharacters.length * 0.8 ? '잘했어요! 👏' :
               score >= quizCharacters.length * 0.6 ? '조금 더 연습해보세요! 📚' :
               '더 많은 연습이 필요해요! 💪'}
            </div>

            <div className={styles.resultButtons}>
              <button 
                onClick={restartQuiz}
                className={styles.restartButton}
              >
                새 문장으로 다시 하기
              </button>
              <button 
                onClick={generateQuizFromSentence}
                className={styles.retryButton}
              >
                같은 문장으로 다시 하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SentenceQuiz; 