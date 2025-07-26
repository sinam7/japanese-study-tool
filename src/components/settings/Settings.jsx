import React from 'react';
import { routeConfig } from './routeConfig';
import './Settings.css';

const Settings = () => {
  return (
    <div className="settings-container">
      <h2 className="settings-title">
        앱 설정
      </h2>
      
      <div className="settings-section">
        <h3 className="settings-section-title">
          페이지 관리
        </h3>
        
        <div className="route-grid">
          {Object.entries(routeConfig).map(([path, config]) => (
            <div key={path} className="route-item">
              <div className="route-header">
                <span className="route-name">
                  {config.name}
                </span>
                <span className="route-status responsive">
                  반응형 레이아웃
                </span>
              </div>
              
              <div className="route-path">
                경로: <code className="code-snippet">{path}</code>
              </div>
              
              <div className="route-description">
                {config.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="settings-section">
        <h3 className="settings-section-title">
          개발자 정보
        </h3>
        <p className="developer-info">
          새로운 페이지를 추가하려면 <code className="code-snippet">src/components/settings/routeConfig.js</code>에서 라우트 설정을 관리할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Settings;
