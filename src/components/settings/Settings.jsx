import React from 'react';
import { routeConfig } from '../../config/routes';
import styles from './Settings.module.css';

const Settings = () => {
  return (
    <div className={styles.settingsContainer}>
      <h2 className={styles.settingsTitle}>
        앱 설정
      </h2>
      
      <div className={styles.settingsSection}>
        <h3 className={styles.settingsSectionTitle}>
          페이지 관리
        </h3>
        
        <div className={styles.routeGrid}>
          {Object.entries(routeConfig).map(([path, config]) => (
            <div key={path} className={styles.routeItem}>
              <div className={styles.routeHeader}>
                <span className={styles.routeName}>
                  {config.name}
                </span>
                <span className={`${styles.routeStatus} ${styles.routeStatusResponsive}`}>
                  반응형 레이아웃
                </span>
              </div>
              
              <div className={styles.routePath}>
                경로: <code className={styles.codeSnippet}>{path}</code>
              </div>
              
              <div className={styles.routeDescription}>
                {config.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.settingsSection}>
        <h3 className={styles.settingsSectionTitle}>
          개발자 정보
        </h3>
        <p className={styles.developerInfo}>
          새로운 페이지를 추가하려면 <code className={styles.codeSnippet}>src/config/routes.js</code>에서 라우트 설정을 관리할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Settings;
