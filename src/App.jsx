import React, { useState } from 'react';
import HiraganaSelector from './components/HiraganaSelector';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [currentView, setCurrentView] = useState('selector'); // 'selector' or 'quiz'
  const [quizSettings, setQuizSettings] = useState({
    type: 'input', // 'input' or 'choice'
    choiceCount: 3 // 3, 4, 5
  });

  const handleStartQuiz = (characters, settings) => {
    if (characters.length === 0) {
      alert('최소 하나의 히라가나를 선택해주세요!');
      return;
    }
    setSelectedCharacters(characters);
    setQuizSettings(settings);
    setCurrentView('quiz');
  };

  const handleBackToSelector = () => {
    setCurrentView('selector');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌸 히라가나 학습 퀴즈 🌸</h1>
      </header>
      
      <main className="app-main">
        {currentView === 'selector' ? (
          <HiraganaSelector onStartQuiz={handleStartQuiz} />
        ) : (
          <Quiz 
            selectedCharacters={selectedCharacters}
            quizSettings={quizSettings}
            onBackToSelector={handleBackToSelector}
          />
        )}
      </main>
    </div>
  );
}

export default App; 