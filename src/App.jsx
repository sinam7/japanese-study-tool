import React, { useState, useEffect } from 'react';
import HiraganaSelector from './components/HiraganaSelector';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [currentView, setCurrentView] = useState('selector'); // 'selector' or 'quiz'
  
  // localStorage에서 저장된 레이아웃 모드를 불러오기
  const [layoutMode, setLayoutMode] = useState(() => {
    const saved = localStorage.getItem('hiragana-quiz-layout-mode');
    return saved || 'horizontal'; // 기본값은 'horizontal'
  });
  
  const [quizSettings, setQuizSettings] = useState({
    type: 'input', // 'input' or 'choice'
    choiceCount: 3 // 3, 4, 5
  });

  // layoutMode가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('hiragana-quiz-layout-mode', layoutMode);
  }, [layoutMode]);

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
        <div className="header-controls">
          <label className="layout-toggle-label">
            <input
              type="checkbox"
              checked={layoutMode === 'horizontal'}
              onChange={(e) => setLayoutMode(e.target.checked ? 'horizontal' : 'vertical')}
              className="layout-toggle-checkbox"
            />
            <span className="layout-toggle-switch"></span>
            <span className="layout-toggle-text">가로 모드</span>
          </label>
        </div>
      </header>
      
      <main className="app-main">
        {currentView === 'selector' ? (
          <HiraganaSelector 
            onStartQuiz={handleStartQuiz}
            layoutMode={layoutMode}
          />
        ) : (
          <Quiz 
            selectedCharacters={selectedCharacters}
            quizSettings={quizSettings}
            onBackToSelector={handleBackToSelector}
          />
        )}
      </main>
      
      <footer className="app-footer">
        <div className="footer-content">
          <p>Copyright 2025. sinam7. All rights reserved.</p>
          <p>
            <a href="https://github.com/sinam7" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App; 