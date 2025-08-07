import { useState, useCallback, useEffect, useMemo } from 'react';
import { hiraganaCategories, columns } from '../data/extendedHiraganaData';

const useExtendedHiraganaSelector = (selectedCharacters) => {
  // sessionStorage에서 퀴즈 타입 불러오기
  const [quizType, setQuizType] = useState(() => {
    return sessionStorage.getItem('quiz-type') || 'input';
  });
  const [choiceCount, setChoiceCount] = useState(3);
  const [isWideScreen, setIsWideScreen] = useState(false);

  // 카테고리별 가로 모드용 전치 데이터 생성
  const getTransposedDataForCategory = useCallback((categoryData) => {
    const transposed = [];
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const newRow = {
        row: columns[colIndex],
        characters: categoryData.map(rowData => rowData.characters[colIndex])
      };
      transposed.push(newRow);
    }
    return transposed;
  }, []);

  // 화면 크기에 따른 반응형 카테고리 데이터
  const getResponsiveData = useCallback((categoryKey) => {
    const originalData = hiraganaCategories[categoryKey].data;
    return isWideScreen ? getTransposedDataForCategory(originalData) : originalData;
  }, [isWideScreen, getTransposedDataForCategory]);

  // 화면 크기에 따른 반응형 컬럼
  const getResponsiveColumns = useCallback((categoryKey) => {
    const originalData = hiraganaCategories[categoryKey].data;
    return isWideScreen ? originalData.map(row => row.row) : columns;
  }, [isWideScreen]);

  // 모든 카테고리의 데이터를 합친 전체 데이터
  const allCharactersList = useMemo(() => {
    const allChars = [];
    Object.values(hiraganaCategories).forEach(category => {
      category.data.forEach(row => {
        row.characters.forEach(char => {
          if (char) {
            allChars.push(char);
          }
        });
      });
    });
    return allChars;
  }, []);

  // quizType을 sessionStorage에 저장
  useEffect(() => {
    sessionStorage.setItem('quiz-type', quizType);
  }, [quizType]);

  // 미디어 쿼리 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 912px)');
    setIsWideScreen(mediaQuery.matches);

    const handleChange = (e) => {
      setIsWideScreen(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 선택된 문자들을 실제 문자 객체로 변환
  const selectedCharactersList = useMemo(() => {
    return allCharactersList.filter(char => 
      selectedCharacters.has(`${char.hiragana}-${char.romaji}`)
    );
  }, [allCharactersList, selectedCharacters]);

  // 선택된 문자 수
  const selectedCount = selectedCharacters.size;

  return {
    selectedCharactersList,
    selectedCount,
    quizType,
    setQuizType,
    choiceCount,
    setChoiceCount,
    isWideScreen,
    allCharactersList,
    getResponsiveData,
    getResponsiveColumns
  };
};

export default useExtendedHiraganaSelector; 