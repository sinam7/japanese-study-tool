import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import HiraganaSelector from './components/quiz/HiraganaSelector';
import QuizContainer from './components/quiz/QuizContainer';
import LearningPage from './components/learning/LearningPage';
import Settings from './components/settings/Settings';
import Sidebar from './components/common/Sidebar';

import { DEFAULT_VALUES } from './utils/constants';
import './styles/global.css';

function App() {
  // 세션 상태로만 관리 (저장하지 않음)
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [quizSettings, setQuizSettings] = useState(DEFAULT_VALUES.QUIZ_SETTINGS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      </header>
      
      <main className="app-main">
        <Routes>
          <Route path="/" element={
            <HiraganaSelector 
              onStartQuiz={handleStartQuiz}
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