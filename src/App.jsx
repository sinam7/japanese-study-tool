import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import HiraganaSelector from './components/quiz/HiraganaSelector';
import QuizContainer from './components/quiz/QuizContainer';
import LearningPage from './components/learning/LearningPage';
import Settings from './components/settings/Settings';
import Sidebar from './components/common/Sidebar';
import { shouldShowLayoutToggle } from './components/settings/routeConfig';
import './styles/global.css';

function App() {
  // localStorage에서 저장된 상태들을 불러오기
  const [selectedCharacters, setSelectedCharacters] = useState(() => {
    const saved = localStorage.getItem('hiragana-quiz-selected-characters');
    return saved ? JSON.parse(saved) : [];
  });
  const [layoutMode, setLayoutMode] = useState(() => {
    const saved = localStorage.getItem('hiragana-quiz-layout-mode');
    return saved || 'horizontal';
  });
  const [quizSettings, setQuizSettings] = useState(() => {
    const saved = localStorage.getItem('hiragana-quiz-settings');
    return saved ? JSON.parse(saved) : {
      type: 'input',
      choiceCount: 3
    };
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // localStorage에 상태들을 저장
  useEffect(() => {
    localStorage.setItem('hiragana-quiz-layout-mode', layoutMode);
  }, [layoutMode]);

  useEffect(() => {
    localStorage.setItem('hiragana-quiz-selected-characters', JSON.stringify(selectedCharacters));
  }, [selectedCharacters]);

  useEffect(() => {
    localStorage.setItem('hiragana-quiz-settings', JSON.stringify(quizSettings));
  }, [quizSettings]);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // 현재 경로의 설정 가져오기
  const showLayoutToggle = shouldShowLayoutToggle(location.pathname);

  return (
    <div className="app">
      {/* 사이드바 컴포넌트 */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <header className="app-header">
        {/* 햄버거 메뉴 버튼 */}
        <button className="hamburger-menu" onClick={toggleSidebar}>
          <Menu size={24} className="hamburger-icon" />
        </button>
        
        <h1>히라가나 학습 퀴즈</h1>
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