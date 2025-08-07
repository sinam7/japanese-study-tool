import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import QuizContainer from './components/quiz/QuizContainer';
import LearningPage from './components/learning/LearningPage';
import SentenceQuiz from './components/quiz/sentence/SentenceQuiz';
import Settings from './components/settings/Settings';
import Sidebar from './components/common/Sidebar';

import styles from './App.module.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <div className={styles.app}>
      {/* 사이드바 컴포넌트 */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} onReset={handleReset} />

      <header className={styles.appHeader}>
        {/* 햄버거 메뉴 버튼 */}
        <button className={styles.hamburgerMenu} onClick={toggleSidebar}>
          <Menu size={24} className={styles.hamburgerIcon} />
        </button>
        
        <h1>히라가나 학습 퀴즈</h1>
      </header>
      
      <main className={styles.appMain}>
        <Routes key={location.pathname + resetKey}>
          <Route path="/" element={<QuizContainer />} />
          <Route path="/quiz" element={<QuizContainer />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/sentence" element={<SentenceQuiz />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      
      <footer className={styles.appFooter}>
        <div className={styles.footerContent}>
          <p>Copyright 2025. sinam7. All rights reserved.</p>
          <p>
            <a href="https://github.com/sinam7" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <span> | </span>
            <a href="https://sinam7.com" target="_blank" rel="noopener noreferrer">Home</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App; 