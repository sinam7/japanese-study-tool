import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HiraganaSelector from './components/quiz/HiraganaSelector';
import QuizContainer from './components/quiz/QuizContainer';
import LearningPage from './components/learning/LearningPage';
import Settings from './components/settings/Settings';
import { getCurrentRouteConfig, shouldShowLayoutToggle, getOtherRoutes } from './components/settings/routeConfig';
import './styles/global.css';

function App() {
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [layoutMode, setLayoutMode] = useState(() => {
    const saved = localStorage.getItem('hiragana-quiz-layout-mode');
    return saved || 'horizontal';
  });
  const [quizSettings, setQuizSettings] = useState({
    type: 'input',
    choiceCount: 3
  });

  useEffect(() => {
    localStorage.setItem('hiragana-quiz-layout-mode', layoutMode);
  }, [layoutMode]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleStartQuiz = (characters, settings) => {
    if (characters.length === 0) {
      alert('최소 하나의 히라가나를 선택해주세요!');
      return;
    }
    setSelectedCharacters(characters);
    setQuizSettings(settings);
    navigate('/quiz');
  };

  const handleBackToSelector = () => {
    navigate('/');
  };

  // 현재 경로의 설정 가져오기
  const showLayoutToggle = shouldShowLayoutToggle(location.pathname);

  // 헤더 버튼들 동적 생성
  const getHeaderButtons = () => {
    return getOtherRoutes(location.pathname).map(({ path, name }) => (
      <button 
        key={path}
        onClick={() => navigate(path)} 
        className="header-button"
      >
        {name}
      </button>
    ));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌸 히라가나 학습 퀴즈 🌸</h1>
        <div className="header-controls">
          {showLayoutToggle && (
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
          )}
          {getHeaderButtons()}
        </div>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={
            <HiraganaSelector 
              onStartQuiz={handleStartQuiz}
              layoutMode={layoutMode}
            />
          } />
          <Route path="/quiz" element={
            <QuizContainer 
              selectedCharacters={selectedCharacters}
              quizSettings={quizSettings}
              onBackToSelector={handleBackToSelector}
            />
          } />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
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