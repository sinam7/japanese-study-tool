import React, { createContext, useContext } from 'react';

// 히라가나 선택 Context 생성
const HiraganaContext = createContext();

// Context Provider 컴포넌트
export const HiraganaProvider = ({ children, value }) => {
  return (
    <HiraganaContext.Provider value={value}>
      {children}
    </HiraganaContext.Provider>
  );
};

// Context를 사용하는 커스텀 훅
export const useHiraganaContext = () => {
  const context = useContext(HiraganaContext);
  if (!context) {
    throw new Error('useHiraganaContext는 HiraganaProvider 내에서 사용되어야 합니다.');
  }
  return context;
};

export default HiraganaContext; 