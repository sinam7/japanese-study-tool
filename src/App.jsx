import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import QuizContainer from './components/quiz/QuizContainer';
import LearningPage from './components/learning/LearningPage';
import Settings from './components/settings/Settings';
import Sidebar from './components/common/Sidebar';

import './styles/global.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <Route path="/" element={<QuizContainer />} />
          <Route path="/quiz" element={<QuizContainer />} />
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