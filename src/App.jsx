import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import HiraganaSelector from './components/quiz/HiraganaSelector';
import QuizContainer from './components/quiz/QuizContainer';
import LearningPage from './components/learning/LearningPage';
import Settings from './components/settings/Settings';
import Sidebar from './components/common/Sidebar';

import { LOCAL_STORAGE_KEYS, DEFAULT_VALUES } from './utils/constants';
import './styles/global.css';

// localStorage 안전하게 읽기
const safeGetFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.warn(`localStorage에서 ${key} 읽기 실패:`, error);
    return defaultValue;
  }
};

// localStorage 안전하게 쓰기
const safeSetToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch (error) {
    console.warn(`localStorage에 ${key} 저장 실패:`, error);
  }
};

function App() {
  // localStorage에서 저장된 상태들을 불러오기
  const [selectedCharacters, setSelectedCharacters] = useState(() => {
    return safeGetFromLocalStorage(LOCAL_STORAGE_KEYS.SELECTED_CHARACTERS, []);
  });
  const [quizSettings, setQuizSettings] = useState(() => {
    return safeGetFromLocalStorage(LOCAL_STORAGE_KEYS.QUIZ_SETTINGS, DEFAULT_VALUES.QUIZ_SETTINGS);
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // localStorage에 상태들을 저장
  useEffect(() => {
    safeSetToLocalStorage(LOCAL_STORAGE_KEYS.SELECTED_CHARACTERS, selectedCharacters);
  }, [selectedCharacters]);

  useEffect(() => {
    safeSetToLocalStorage(LOCAL_STORAGE_KEYS.QUIZ_SETTINGS, quizSettings);
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