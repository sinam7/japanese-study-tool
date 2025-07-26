// 각 경로별 설정 관리
export const routeConfig = {
  '/': {
    name: '퀴즈 시작',
    showInSidebar: true,
    icon: '🏠',
    component: 'HiraganaSelector',
    description: '히라가나를 선택하고 퀴즈를 시작하는 페이지'
  },
  '/quiz': {
    name: '퀴즈',
    showInSidebar: false,
    icon: '❓',
    component: 'QuizContainer',
    description: '히라가나 퀴즈를 진행하는 페이지'
  },
  '/learning': {
    name: '학습',
    showInSidebar: true,
    icon: '📚',
    component: 'LearningPage',
    description: '히라가나 연상 학습을 위한 페이지'
  },
  '/settings': {
    name: '설정',
    showInSidebar: false,
    icon: '⚙️',
    component: 'Settings',
    description: '앱 설정 및 환경설정 페이지'
  }
};

// 현재 경로의 설정 가져오기
export const getCurrentRouteConfig = (pathname) => {
  return routeConfig[pathname] || {};
};

// 가로모드 토글 기능이 제거되었습니다

// 현재 페이지를 제외한 다른 페이지들 가져오기
export const getOtherRoutes = (currentPath) => {
  return Object.entries(routeConfig)
    .filter(([path]) => path !== currentPath)
    .map(([path, config]) => ({ path, ...config }));
};

// 사이드바에 표시할 메뉴 아이템들 가져오기
export const getSidebarMenuItems = () => {
  return Object.entries(routeConfig)
    .filter(([, config]) => config.showInSidebar)
    .map(([path, { name, icon }]) => ({ path, name, icon }));
};

// 새 라우트 추가 헬퍼 (개발용)
export const addRoute = (path, config) => {
  routeConfig[path] = config;
}; 