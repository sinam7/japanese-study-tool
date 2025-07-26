import React, { useState } from 'react';
import QuizPreparation from './preparation/QuizPreparation';
import QuizPlaying from './playing/QuizPlaying';
import '../../styles/components/Quiz.css';

const QuizContainer = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [quizSettings, setQuizSettings] = useState({});

  const handleStartQuiz = (characters, settings) => {
    setSelectedCharacters(characters);
    setQuizSettings(settings);
    setIsQuizStarted(true);
  };

  const handleBackToSelector = () => {
    setIsQuizStarted(false);
    setSelectedCharacters([]);
    setQuizSettings({});
  };

  if (isQuizStarted) {
    return (
      <QuizPlaying 
        selectedCharacters={selectedCharacters}
        quizSettings={quizSettings}
        onBackToSelector={handleBackToSelector}
      />
    );
  }

  return (
    <QuizPreparation onStartQuiz={handleStartQuiz} />
  );
};

export default QuizContainer;
