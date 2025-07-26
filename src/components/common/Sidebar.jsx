import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose(); // 네비게이션 후 사이드바 닫기
  };

  // 사이드바 메뉴 아이템들
  const menuItems = [
    { path: '/', name: '퀴즈 시작', icon: '🏠' },
    { path: '/learning', name: '학습', icon: '📚' }
  ];

  return (
    <>
      {/* 사이드바 오버레이 */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      
      {/* 사이드바 */}
      <nav className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h3>메뉴</h3>
          <button className="sidebar-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <ul className="sidebar-menu">
          {menuItems.map(({ path, name, icon }) => (
            <li key={path} className={location.pathname === path ? 'active' : ''}>
              <button onClick={() => handleNavigate(path)}>
                <span className="menu-icon">{icon}</span>
                <span className="menu-text">{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar; 