import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { getSidebarMenuItems } from '../../config/routes';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, onClose, onReset }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    // 현재 경로와 같은 경로로 이동하는 경우, 컴포넌트를 리셋
    if (location.pathname === path) {
      onReset(); // App.jsx의 resetKey를 업데이트하여 컴포넌트 리셋
    } else {
      navigate(path);
    }
    onClose(); // 네비게이션 후 사이드바 닫기
  };

  // 사이드바 메뉴 아이템들 (routeConfig에서 동적으로 생성)
  const menuItems = getSidebarMenuItems();

  return (
    <>
      {/* 사이드바 오버레이 */}
      {isOpen && (
        <div className={styles.sidebarOverlay} onClick={onClose} />
      )}
      
      {/* 사이드바 */}
      <nav className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h3>메뉴</h3>
          <button className={styles.sidebarClose} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <ul className={styles.sidebarMenu}>
          {menuItems.map(({ path, name, icon }) => (
            <li key={path} className={location.pathname === path ? styles.menuItemActive : ''}>
              <button onClick={() => handleNavigate(path)}>
                <span className={styles.menuIcon}>{icon}</span>
                <span className={styles.menuText}>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar; 