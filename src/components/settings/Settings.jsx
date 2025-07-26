import React from 'react';
import { routeConfig } from './routeConfig';

const Settings = () => {
  return (
    <div className="settings-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '2rem', textAlign: 'center' }}>
        앱 설정
      </h2>
      
      <div style={{ 
        background: 'var(--color-surface-1)', 
        borderRadius: '16px', 
        padding: '1.5rem',
        border: '1px solid var(--color-surface-2)'
      }}>
        <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          페이지 관리
        </h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          {Object.entries(routeConfig).map(([path, config]) => (
            <div 
              key={path}
              style={{
                background: 'var(--color-surface-2)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--color-primary-light)'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <strong style={{ color: 'var(--color-text-primary)' }}>
                  {config.name}
                </strong>
                <span style={{ 
                  color: config.showLayoutToggle ? 'var(--color-success)' : 'var(--color-text-sub)',
                  fontSize: '0.9rem'
                }}>
                  {config.showLayoutToggle ? '가로모드 지원' : '가로모드 미지원'}
                </span>
              </div>
              
              <div style={{ color: 'var(--color-text-sub)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                경로: <code style={{ background: 'var(--color-black-20)', padding: '2px 6px', borderRadius: '4px' }}>
                  {path}
                </code>
              </div>
              
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                {config.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ 
        background: 'var(--color-surface-1)', 
        borderRadius: '16px', 
        padding: '1.5rem',
        border: '1px solid var(--color-surface-2)',
        marginTop: '2rem'
      }}>
        <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          개발자 정보
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
          새로운 페이지를 추가하려면 <code style={{ 
            background: 'var(--color-black-20)', 
            padding: '2px 6px', 
            borderRadius: '4px' 
          }}>src/components/settings/routeConfig.js</code>에서 라우트 설정을 관리할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Settings;
