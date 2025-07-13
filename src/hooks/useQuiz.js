import { useState, useEffect, useCallback } from 'react';
import { shuffleArray, generateChoices } from '../utils/quizHelpers';

const useQuiz = (selectedCharacters, quizSettings) => {
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

  // 선택 애니메이션 딜레이(ms)
  const CHOICE_ANIMATION_DELAY = 100;

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
      
      if (quizSettings.type === 'choice' && shuffled.length > 0) {
        setChoices(generateChoices(shuffled[0], quizSettings.choiceCount));
      }
    }
  }, [selectedCharacters, quizSettings, shuffleArray, generateChoices]);

  const currentCharacter = shuffledCharacters[currentQuestionIndex];

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

  // 선택형 퀴즈에서 자동 제출 처리
  useEffect(() => {
    if (quizSettings.type === 'choice' && 
        autoSubmit && 
        selectedChoice !== null && 
        !answered) {
      setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} };
        handleSubmit(fakeEvent);
      }, CHOICE_ANIMATION_DELAY); // 선택 애니메이션을 볼 수 있게 딜레이
    }
  }, [selectedChoice, quizSettings.type, autoSubmit, answered, handleSubmit]);

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
    
    if (quizSettings.type === 'choice' && shuffled.length > 0) {
      setChoices(generateChoices(shuffled[0], quizSettings.choiceCount));
    }
  }, [selectedCharacters, quizSettings, shuffleArray, generateChoices]);

  const getScorePercentage = useCallback(() => {
    return Math.round((score / shuffledCharacters.length) * 100);
  }, [score, shuffledCharacters.length]);

  const getScoreEmoji = useCallback(() => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return '🎉';
    if (percentage >= 80) return '😊';
    if (percentage >= 70) return '👍';
    if (percentage >= 60) return '😐';
    return '😅';
  }, [getScorePercentage]);

  return {
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
  };
};

export default useQuiz;
